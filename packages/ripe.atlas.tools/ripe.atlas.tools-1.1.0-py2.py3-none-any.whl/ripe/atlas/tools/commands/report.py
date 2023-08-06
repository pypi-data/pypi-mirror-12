from __future__ import print_function

from ripe.atlas.cousteau import (
    AtlasLatestRequest, AtlasResultsRequest, Measurement, APIResponseError)

from ..aggregators import RangeKeyAggregator, ValueKeyAggregator, aggregate
from ..exceptions import RipeAtlasToolsException
from ..helpers.rendering import SaganSet, Rendering
from ..helpers.validators import ArgumentType
from ..renderers import Renderer
from .base import Command as BaseCommand
from ..filters import FilterFactory, filter_results


class Command(BaseCommand):

    NAME = "report"

    DESCRIPTION = "Report the results of a measurement.\n\nExample:\n" \
                  "  ripe-atlas report 1001 --probes 157,10006\n"

    AGGREGATORS = {
        "country": ["probe.country_code", ValueKeyAggregator],
        "rtt-median": [
            "rtt_median",
            RangeKeyAggregator,
            [10, 20, 30, 40, 50, 100, 200, 300]
        ],
        "status": ["probe.status", ValueKeyAggregator],
        "asn_v4": ["probe.asn_v4", ValueKeyAggregator],
        "asn_v6": ["probe.asn_v6", ValueKeyAggregator],
        "prefix_v4": ["probe.prefix_v4", ValueKeyAggregator],
        "prefix_v6": ["probe.prefix_v6", ValueKeyAggregator],
    }

    def add_arguments(self):
        self.parser.add_argument(
            "measurement_id",
            type=int,
            help="The measurement id you want reported."
        )
        self.parser.add_argument(
            "--probes",
            type=ArgumentType.comma_separated_integers_or_file,
            help="Either a comma-separated list of probe ids you want to see "
                 "exclusively, a path to a file containing probe ids (one on "
                 "each line), or \"-\" for standard input in the same format."
        )
        self.parser.add_argument(
            "--renderer",
            choices=Renderer.get_available(),
            help="The renderer you want to use. If this isn't defined, an "
                 "appropriate renderer will be selected."
        )
        self.parser.add_argument(
            "--aggregate-by",
            type=str,
            choices=self.AGGREGATORS.keys(),
            action="append",
            help="Tell the rendering engine to aggregate the results by the "
                 "selected option. Note that if you opt for aggregation, no "
                 "output will be generated until all results are received."
        )
        self.parser.add_argument(
            "--probe-asns",
            type=ArgumentType.comma_separated_integers(
                minimum=1,
                maximum=50000
            ),
            help="A comma-separated list of probe ASNs you want to see "
                 "exclusively."
        )
        self.parser.add_argument(
            "--start-time",
            type=ArgumentType.datetime,
            help="The start time of the report."
        )
        self.parser.add_argument(
            "--stop-time",
            type=ArgumentType.datetime,
            help="The stop time of the report."
        )

    def _get_request(self):

        kwargs = {"msm_id": self.arguments.measurement_id}
        if self.arguments.probes:
            kwargs["probe_ids"] = self.arguments.probes
        if self.arguments.start_time:
            kwargs["start"] = self.arguments.start_time
        if self.arguments.stop_time:
            kwargs["stop"] = self.arguments.stop_time

        if "start" in kwargs or "stop" in kwargs:
            return AtlasResultsRequest(**kwargs)
        return AtlasLatestRequest(**kwargs)

    def run(self):

        try:
            measurement = Measurement(id=self.arguments.measurement_id)
        except APIResponseError:
            raise RipeAtlasToolsException("That measurement does not exist")

        renderer = Renderer.get_renderer(
            self.arguments.renderer, measurement.type.lower())()

        results = self._get_request().get()[1]

        if not results:
            raise RipeAtlasToolsException(
                "There aren't any results available for that measurement")

        results = SaganSet(iterable=results, probes=self.arguments.probes)

        if self.arguments.probe_asns:
            asn_filters = set([])
            for asn in self.arguments.probe_asns:
                asn_filters.add(FilterFactory.create("asn", asn))
            results = filter_results(asn_filters, list(results))

        if self.arguments.aggregate_by:
            results = aggregate(results, self.get_aggregators())

        Rendering(
            renderer=renderer,
            header=self._get_header(measurement),
            payload=results
        ).render()

    def get_aggregators(self):
        """Return aggregators list based on user input"""
        aggregation_keys = []
        for aggr_key in self.arguments.aggregate_by:
            # Get class and aggregator key
            aggregation_class = self.AGGREGATORS[aggr_key][1]
            key = self.AGGREGATORS[aggr_key][0]
            if aggr_key == "rtt-median":
                # Get range for the aggregation
                key_range = self.AGGREGATORS[aggr_key][2]
                aggregation_keys.append(
                    aggregation_class(key=key, ranges=key_range)
                )
            else:
                aggregation_keys.append(aggregation_class(key=key))
        return aggregation_keys

    def _get_header(self, measurement):
        """
        Most of the time you want a fancy header, but for the raw renderer,
        we want nothing.
        """

        description = measurement.description or ""
        if description:
            description = "\n{}".format(description)

        return ("\nRIPE Atlas Report for Measurement #{}\n"
                "==================================================="
                "{}\n".format(measurement.id, description))
