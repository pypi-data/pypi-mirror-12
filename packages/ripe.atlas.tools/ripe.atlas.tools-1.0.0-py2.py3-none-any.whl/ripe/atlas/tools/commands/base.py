import argparse
import re
import sys

from ..helpers.colours import colourise


class RipeHelpFormatter(argparse.RawTextHelpFormatter):

    def _format_usage(self, *args):
        r = argparse.RawTextHelpFormatter._format_usage(
            self, *args).capitalize()
        return "\n\n{}\n".format(r)


class Command(object):

    NAME = ""
    DESCRIPTION = ""  # Define this in the subclass

    def __init__(self, *args, **kwargs):

        self.arguments = None
        self.parser = argparse.ArgumentParser(
            formatter_class=RipeHelpFormatter,
            description=self.DESCRIPTION,
            prog="ripe-atlas {}".format(self.NAME)
        )

        self.add_arguments()

    def init_args(self, parser_args=None):
        """
        Initialises all parse arguments and makes them available to the class.
        """

        if parser_args is None:
            self.arguments = self.parser.parse_args()
        else:
            self.arguments = self.parser.parse_args(parser_args)

    def run(self):
        raise NotImplemented()

    def add_arguments(self):
        """

        A hook that's executed in the __init__, you can make use of
        `self.parser` here to add arguments to the command:

          self.parser.add_argument(
            "measurement_id",
            type=int,
            help="The measurement id you want to use"
          )

        """
        pass

    def ok(self, message):
        sys.stdout.write("\n{}\n\n".format(colourise(message, "green")))


class TabularFieldsMixin(object):
    """
    A handy mixin to dump into classes that are expected to render tabular data.
    It expects both that COLUMNS is defined by the subclass and that --field is
    set in the add_arguments() method.
    """

    def _get_line_format(self):
        """
        Loop over the field arguments and generate a string that makes use of
        Python's string format mini language.  We later use this string to
        format the values for each row.
        """
        r = u""
        for field in self.arguments.field:
            if r:
                r += u" "
            r += (u"{!s:" + u"{}{}".format(*self.COLUMNS[field]) + u"}")
        return r

    def _get_header_names(self):
        return [_.capitalize() for _ in self.arguments.field]

    def _get_header(self):
        """
        Generates a header by using the line formatter and the list of field
        arguments.
        """
        return self._get_line_format().format(*self._get_header_names())

    def _get_horizontal_rule(self):
        """
        A bit of a hack: We get a formatted line for no other reason than to
        determine the width of that line.  Then we use a regex to overwrite that
        line with "=".
        """
        return re.sub(
            r".", "=", self._get_line_format().format(*self.arguments.field))

    def _get_line_items(self, measurement):
        raise NotImplementedError("This needs to be defined in the subclass.")

    def _get_filter_display(self, filters):

        if not filters:
            return ""

        r = colourise("\nFilters:\n", "white")
        for k, v in filters.items():
            if k not in ("search",):
                v = str(v).capitalize()
            r += colourise(
                "  {}: {}\n".format(*self._get_filter_key_value_pair(k, v)),
                "cyan"
            )

        return r

    def _get_filter_key_value_pair(self, k, v):
        return k.capitalize().replace("__", " "), v
