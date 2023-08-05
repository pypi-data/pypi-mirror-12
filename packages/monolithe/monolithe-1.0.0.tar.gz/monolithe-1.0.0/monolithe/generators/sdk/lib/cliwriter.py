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

from monolithe import MonolitheConfig
from monolithe.lib import SDKUtils
from monolithe.generators.lib import TemplateFileWriter


class CLIWriter(object):
    """
    """

    def __init__(self, monolithe_config):
        """
        """
        self.writer = None

        self.monolithe_config = monolithe_config


    def write(self):
        """
        """
        self.writer = _CLIFileWriter(monolithe_config=self.monolithe_config)
        self.writer.write_init()
        self.writer.write_cli()
        self.writer.write_commands()
        self.writer.write_printer()
        self.writer.write_utils()


class _CLIFileWriter(TemplateFileWriter):
    """
    """

    def __init__(self, monolithe_config):
        """
        """
        super(_CLIFileWriter, self).__init__(package="monolithe.generators.sdk")

        self.monolithe_config = monolithe_config
        self._sdk_output = self.monolithe_config.get_option("sdk_output", "sdk")
        self._sdk_name = self.monolithe_config.get_option("sdk_name", "sdk")
        self._sdk_cli_name = self.monolithe_config.get_option("sdk_cli_name", "sdk")
        self._sdk_class_prefix = self.monolithe_config.get_option("sdk_class_prefix", "sdk")
        self._product_accronym = self.monolithe_config.get_option("product_accronym")
        self._product_name = self.monolithe_config.get_option("product_name")
        self.output_directory = "%s/%s/cli" % (self._sdk_output, self._sdk_name)

        with open("%s/__code_header" % self._sdk_output, "r") as f:
            self.header_content = f.read()

    def write_init(self):
        """
        """
        self.write( destination=self.output_directory, filename="__init__.py", template_name="cli__init__.py.tpl",
                    header=self.header_content)

    def write_cli(self):
        """
        """
        self.write( destination=self.output_directory, filename="cli.py", template_name="cli.py.tpl",
                    product_accronym=self._product_accronym,
                    product_name=self._product_name,
                    header=self.header_content)

    def write_commands(self):
        """
        """
        self.write( destination=self.output_directory, filename="commands.py", template_name="cli_commands.py.tpl",
                    product_accronym=self._product_accronym,
                    product_name=self._product_name,
                    sdk_cli_name=self._sdk_cli_name,
                    header=self.header_content)

    def write_printer(self):
        """
        """
        self.write( destination=self.output_directory, filename="printer.py", template_name="cli_printer.py.tpl",
                    header=self.header_content)

    def write_utils(self):
        """
        """
        self.write( destination=self.output_directory, filename="utils.py", template_name="cli_utils.py.tpl",
                    product_accronym=self._product_accronym,
                    sdk_class_prefix=self._sdk_class_prefix,
                    sdk_name=self._sdk_name,
                    header=self.header_content)