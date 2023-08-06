from __future__ import print_function

from ripe.atlas.sagan import Result, ResultParseError

from ..probes import Probe


class SaganSet(object):
    """
    We need something that doesn't take up a lot of memory while it's being
    constructed, but that will also spread out into a handy string when we need
    it to.
    """

    def __init__(self, iterable=None, probes=()):
        self._probes = probes
        self._iterable = iterable

    def __iter__(self):

        sagans = []

        for line in self._iterable:

            # line may be a dictionary (parsed JSON)
            if hasattr(line, "strip"):
                line = line.strip()

            # Break out when there's nothing left
            if not line:
                break

            try:
                sagan = Result.get(
                    line,
                    on_error=Result.ACTION_IGNORE,
                    on_warning=Result.ACTION_IGNORE
                )
                if not self._probes or sagan.probe_id in self._probes:
                    sagans.append(sagan)
                if len(sagans) > 100:
                    for sagan in self._attach_probes(sagans):
                        yield sagan
                    sagans = []
            except ResultParseError:
                pass  # Probably garbage in the file

        for sagan in self._attach_probes(sagans):
            yield sagan

    def __next__(self):
        return iter(self).next()

    def next(self):
        return self.__next__()

    @staticmethod
    def _attach_probes(sagans):
        probes = dict(
            [(p.id, p) for p in Probe.get_many(s.probe_id for s in sagans)]
        )
        for sagan in sagans:
            sagan.probe = probes[sagan.probe_id]
            yield sagan


class Rendering(object):

    def __init__(self, renderer=None, header="", footer="", payload=()):

        self.renderer = renderer
        self.header = header + "\n" if header else ""
        self.footer = footer + "\n" if footer else ""
        self.payload = payload

    def render(self):
        print(self.header, end="")
        self.renderer.header()
        self._smart_render(self.payload)
        self.renderer.additional(self.payload)
        self.renderer.footer()
        print(self.footer, end="")

    def _get_rendered_results(self, data):
        for sagan in data:
            yield self.renderer.on_result(sagan)

    def _smart_render(self, data, indent=""):
        """
        Traverses the aggregation data and prints everything nicely indented.
        """

        if not data:
            return

        if isinstance(data, (list, SaganSet)):

            for line in self._get_rendered_results(data):
                print(indent + line, end="")

        elif isinstance(data, dict):

            for k, v in data.items():
                print("{}{}".format(indent, k))
                self._smart_render(v, indent=indent + " ")
