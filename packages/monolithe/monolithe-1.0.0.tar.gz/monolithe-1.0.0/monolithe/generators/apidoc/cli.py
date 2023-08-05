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

import argparse
import getpass
import sys
import os

from monolithe import MonolitheConfig
from monolithe.generators import APIDocumentationGenerator


def main(argv=sys.argv):
    """
    """
    parser = argparse.ArgumentParser(description="Generates an API documentation from a specification set")

    parser.add_argument("-g", "--github",
                        dest="api_url",
                        metavar="github_api_url",
                        default="https://api.github.com",
                        help="The GitHub API URL. Can be given by setting the environment variable \"MONOLITHE_GITHUB_API_URL\"",
                        type=str)

    parser.add_argument("-l", "--login",
                        dest="login",
                        metavar="login_login",
                        help="The GitHub Login (if set, you will be prompted for your password). Can be given by setting the environment variable \"MONOLITHE_GITHUB_LOGIN\"",
                        type=str)

    parser.add_argument("-t", "--token",
                        dest="token",
                        metavar="github_token",
                        help="The GitHub Token (if set, --login will be ignored). To generate a token, go here https://github.com/settings/tokens. Can be given by setting the environment variable \"$MONOLITHE_GITHUB_TOKEN\"",
                        type=str)

    parser.add_argument("-o", "--organization",
                        dest="organization",
                        metavar="github_organization",
                        default="nuagenetworks",
                        help="The GitHub Organization. Can be given by setting the environment variable \"MONOLITHE_GITHUB_ORGANIZATION\"",
                        type=str)

    parser.add_argument("-r", "--repository",
                        dest="repository",
                        metavar="github_repository",
                        default="vsd-api-specifications",
                        help="The GitHub Repository. Can be given by setting the environment variable \"MONOLITHE_GITHUB_REPOSITORY\"",
                        type=str)

    parser.add_argument("-p", "--path",
                        dest="repository_path",
                        metavar="path",
                        help="The relative repository path of the specification folder. Can be given by setting the environment variable \"MONOLITHE_GITHUB_REPOSITORY_PATH\"",
                        type=str)

    parser.add_argument("-b", "--branches",
                        dest="branches",
                        metavar="branches",
                        help="The branches of the specifications to use to generate the documentation (examples: \"master 3.2\")",
                        nargs="*",
                        type=str)

    parser.add_argument("-f", "--folder",
                        dest="folder",
                        metavar="folder",
                        help="Path of the specifications folder. If set, all other attributes will be ignored",
                        type=str)

    parser.add_argument("-c", "--config",
                        dest="config_path",
                        metavar="config_path",
                        help="Path the monolithe configuration file",
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

    generator = APIDocumentationGenerator(monolithe_config=monolithe_config)

    if args.folder:
        generator.generate_from_folder(folder=args.folder)
    else:
        # Use environment variable if necessary
        if not args.api_url and "MONOLITHE_GITHUB_API_URL" in os.environ:
            args.api_url = os.environ["MONOLITHE_GITHUB_API_URL"]

        if not args.token and not args.login:

            if "MONOLITHE_GITHUB_TOKEN" in os.environ:
                args.token = os.environ["MONOLITHE_GITHUB_TOKEN"]

            elif "MONOLITHE_GITHUB_LOGIN" in os.environ:
                args.login = os.environ["MONOLITHE_GITHUB_LOGIN"]

        if not args.organization and "MONOLITHE_GITHUB_ORGANIZATION" in os.environ:
            args.organization = os.environ["MONOLITHE_GITHUB_ORGANIZATION"]

        if not args.repository and "MONOLITHE_GITHUB_REPOSITORY" in os.environ:
            args.repository = os.environ["MONOLITHE_GITHUB_REPOSITORY"]

        if not args.repository_path and "MONOLITHE_GITHUB_REPOSITORY_PATH" in os.environ:
            args.repository_path = os.environ["MONOLITHE_GITHUB_REPOSITORY_PATH"]

        if not args.config_path and "MONOLITHE_CONFIG_PATH" in os.environ:
            args.config_path = os.environ["MONOLITHE_CONFIG_PATH"]

        if not args.login and not args.token:
            args.login = raw_input("Enter your GitHub login: ")

        if not args.config_path:
            args.config_path = raw_input("Enter the path of the monolithe config file: ")

        if not args.repository_path:
            args.repository_path = "/"

        # Ask for password
        if args.login:
            password = getpass.getpass(prompt="Enter your GitHub password for %s: " % args.login)
            login_or_token = args.login
        else:
            password = None
            login_or_token = args.token

        generator.generate_from_repo(   api_url=args.api_url,
                                        login_or_token=login_or_token,
                                        password=password,
                                        organization=args.organization,
                                        repository=args.repository,
                                        repository_path=args.repository_path,
                                        branches=args.branches)

if __name__ == "__main__":
    main()