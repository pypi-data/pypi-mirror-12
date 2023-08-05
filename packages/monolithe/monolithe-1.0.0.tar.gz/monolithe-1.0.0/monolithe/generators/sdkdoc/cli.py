#!/usr/bin/env python
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

import sys
import argparse

from monolithe import MonolitheConfig
from monolithe.generators import SDKDocGenerator


def main(argv=sys.argv):
    """
    """

    parser = argparse.ArgumentParser(description="SDK Documentation Generator")

    parser.add_argument("-c", "--config",
                        dest="config_path",
                        help="Path the monolithe configuration file",
                        required=True,
                        type=str)

    parser.add_argument("--vanilla-prefix",
                        dest="vanilla_prefix",
                        help="Prefix added to all vanilla path declared in the monolithe configuration file",
                        required=False,
                        type=str)

    args = parser.parse_args()

    monolithe_config = MonolitheConfig.config_with_path(args.config_path)

    if args.vanilla_prefix:
        monolithe_config.set_option("sdk_user_vanilla", "%s/%s" % (args.vanilla_prefix, monolithe_config.get_option("sdk_user_vanilla", "sdk")), "sdk")
        monolithe_config.set_option("sdkdoc_user_vanilla", "%s/%s" % (args.vanilla_prefix, monolithe_config.get_option("sdkdoc_user_vanilla", "sdkdoc")), "sdkdoc")
        monolithe_config.set_option("apidoc_user_vanilla", "%s/%s" % (args.vanilla_prefix, monolithe_config.get_option("apidoc_user_vanilla", "apidoc")), "apidoc")

    generator = SDKDocGenerator(monolithe_config=monolithe_config, prefix=args.prefix_path)
    generator.generate()

if __name__ == "__main__":
    main()
