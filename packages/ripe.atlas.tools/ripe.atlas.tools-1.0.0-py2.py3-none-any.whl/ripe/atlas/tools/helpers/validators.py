from __future__ import print_function, absolute_import

import argparse
import os
import re

from dateutil import parser


class ArgumentType(object):

    @staticmethod
    def path(string):
        if not os.path.exists(string) and not string == "-":
            raise argparse.ArgumentTypeError(
                'The file name specified, "{}" does not appear to exist'.format(
                    string
                )
            )
        return string

    @staticmethod
    def country_code(string):
        if not re.match(r"^[a-zA-Z][a-zA-Z]$", string):
            raise argparse.ArgumentTypeError(
                "Countries must be defined with a two-letter ISO code")
        return string.upper()

    @staticmethod
    def datetime(string):
        try:
            return parser.parse(string)
        except:
            raise argparse.ArgumentTypeError(
                "Times must be specified in ISO 8601 format.  For example: "
                "2010-10-01T00:00:00 or a portion thereof.  All times are in "
                "UTC."
            )

    @staticmethod
    def ip_or_domain(string):
        message = '"{}" does not appear to be an IP address or host ' \
                  'name'.format(string)

        if " " in string:
            raise argparse.ArgumentTypeError(message)
        if "." not in string and ":" not in string:
            if not re.match(r"^\w+$", string):
                raise argparse.ArgumentTypeError(message)

        return string

    class integer_range(object):

        def __init__(self, minimum=float("-inf"), maximum=float("inf")):
            self.minimum = minimum
            self.maximum = maximum

        def __call__(self, string):

            message = "The integer must be between {} and {}.".format(
                self.minimum, self.maximum)
            if self.maximum == float("inf"):
                message = "The integer must be greater than {}.".format(
                    self.minimum)

            try:
                integer = int(string)
                if integer < self.minimum or integer > self.maximum:
                    raise argparse.ArgumentTypeError(message)
            except ValueError:
                raise argparse.ArgumentTypeError(
                    "An integer must be specified."
                )

            return integer

    class comma_separated_integers(object):

        def __init__(self, minimum=float("-inf"), maximum=float("inf")):
            self.minimum = minimum
            self.maximum = maximum

        def __call__(self, string):

            r = []

            for i in string.split(","):

                try:
                    i = int(i)
                except ValueError:
                    raise argparse.ArgumentTypeError(
                        "The ids supplied were not in the correct format. Note "
                        "that you must specify them as a list of "
                        "comma-separated integers without spaces.  Example: "
                        "1,2,34,157,10006"
                    )

                if i < self.minimum:
                    raise argparse.ArgumentTypeError(
                        "{} is lower than the minimum permitted value of "
                        "{}.".format(i, self.minimum)
                    )
                if i > self.maximum:
                    raise argparse.ArgumentTypeError(
                        "{} exceeds the maximum permitted value of {}.".format(
                            i, self.maximum)
                    )

                r.append(i)

            return r

    class regex(object):

        def __init__(self, regex):
            self.regex = re.compile(regex)

        def __call__(self, string):

            if not self.regex.match(string):
                raise argparse.ArgumentTypeError(
                    '"{}" does not appear to be valid.'.format(string))

            return string
