# -*- coding: utf-8 -*-
"""
    mongoop.cli
    ~~~~~~~~~~~

    A simple command line application to run mongoop.

    :copyright: (c) 2015 by Lujeni.
    :license: BSD, see LICENSE for more details.
"""

import argparse
import imp
import sys

from yaml import load

from mongoop import default_settings as s
from mongoop.core import Mongoop


def main():
    try:
        parser = argparse.ArgumentParser(description=""""Monitor and locate long
            running operations on MongoDB and automatically trigger specific
            actions for alerting and performance analysis.""")
        parser.add_argument('--config', dest='config_file', help='/path/to/settings.py or /path/to/settings.yaml')

        args = parser.parse_args()
        config = args.config_file

        if config:
            if config.endswith('.py'):
                settings = imp.load_source('*', config).__dict__
            if config.endswith(('.yml', '.yaml',)):
                with open(config, 'r') as f:
                    settings = load(f)

            s.__dict__.update(settings)

        extra_checks = {}
        if s.balancer:
            extra_checks['balancer'] = s.balancer

        mongoop = Mongoop(
            mongodb_host=s.mongodb_host,
            mongodb_port=s.mongodb_port,
            mongodb_credentials=s.mongodb_credentials,
            mongodb_options=s.mongodb_options,
            frequency=s.frequency,
            triggers=s.triggers,
            threshold_timeout=s.threshold_timeout,
            extra_checks=extra_checks,
        )
        mongoop()
    except KeyboardInterrupt:
        sys.exit(0)


if __name__ == '__main__':
    main()
