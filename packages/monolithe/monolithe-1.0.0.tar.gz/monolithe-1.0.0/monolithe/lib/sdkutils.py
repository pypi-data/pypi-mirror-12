# -*- coding: utf-8 -*-
#
# Copyright (c) 2015, Alcatel-Lucent Inc
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#     * Redistributions of source code must retain the above copyright
#       notice, this list of conditions and the following disclaimer.
#     * Redistributions in binary form must reproduce the above copyright
#       notice, this list of conditions and the following disclaimer in the
#       documentation and/or other materials provided with the distribution.
#     * Neither the name of the copyright holder nor the names of its contributors
#       may be used to endorse or promote products derived from this software without
#       specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
# DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import re

from monolithe.lib import Printer


class SDKUtils(object):
    """ SDK Utilities

    """
    @classmethod
    def _string_clean(cls, string):
        """ String cleaning for specific cases

            This is very specific and is used to force
            some underscore while using get_python_name.

            Args:
                string: the string to clean

            Returns:
                Returns a clean string
        """
        rep = {
            "IPID": "IpID",
            "VCenter": "Vcenter",
            "vCenter": "Vcenter",
            "VPort": "Vport",
        }

        rep = dict((re.escape(k), v) for k, v in rep.iteritems())
        pattern = re.compile("|".join(rep.keys()))
        return pattern.sub(lambda m: rep[re.escape(m.group(0))], string)

    @classmethod
    def get_python_name(cls, name):
        """ Transform a given name to python name

            Args:
                name (string): the name to convert

            Returns:
                A pythonic name

            Exammple:
                get_python_name(EnterpriseNetwork)
                >>> enterprise_network

        """
        first_cap_re = re.compile("(.)([A-Z](?!s([A-Z])*)[a-z]+)")
        all_cap_re = re.compile("([a-z0-9])([A-Z])")

        s1 = first_cap_re.sub(r"\1_\2", cls._string_clean(name))
        return all_cap_re.sub(r"\1_\2", s1).lower()

    @classmethod
    def get_python_type_name(cls, type_name):
        """ Returns a python type according to a java type

        """
        if type_name == "long":
            return "long"

        if type_name == "boolean":
            return "bool"

        if type_name in ["int", "integer"]:
            return "int"

        if type_name in ["date", "datetime", "time"]:
            return "time"

        if type_name in ["double", "float"]:
            return "float"

        return "str"

    @classmethod
    def get_plural_name(cls, singular_name):
        """ Returns the plural name of the singular name

            Certain words are invariant.

            Args:
                singular_name (string): the singular name to pluralize

            Returns:
                The pluralized version of the singular name

        """
        if singular_name[-1] == "y" and singular_name[-2] not in ["a", "e", "i", "o", "u", "y"]:
            return singular_name[:-1] + "ies"

        if singular_name[-1] != "s":
            return singular_name + "s"

        return singular_name

    @classmethod
    def get_string_version(cls, version):
        """ Get the sdk version according to the given version

            Args:
                version (float): the version

            Returns:
                version as string

            Example:
                get_string_version(3.1)
                >>> v3_1

        """
        if version == "master":
            return version

        return ("v%s" % version).replace(".", "_")

    @classmethod
    def get_float_version(cls, string_version):
        """ Get the sdk version as float according to the given string version

            Args:
                string_version (stirng): the version

            Returns:
                version as float

            Example:
                get_float_version("v3_1")
                >>> 3.1

        """
        if string_version == "master":
            return string_version

        return float(string_version.replace("v", "").replace("_", "."))
