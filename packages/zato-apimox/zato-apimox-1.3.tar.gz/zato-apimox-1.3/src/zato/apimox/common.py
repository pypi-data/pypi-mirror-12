# -*- coding: utf-8 -*-

"""
Copyright (C) 2014 Dariusz Suchojad <dsuch at zato.io>

Licensed under LGPLv3, see LICENSE.txt for terms and conditions.
"""

from __future__ import absolute_import, division, print_function

# stdlib
import logging, os
from logging.handlers import RotatingFileHandler

# Bunch
from bunch import Bunch, bunchify

# ConfigObj
from configobj import ConfigObj

class BaseServer(object):

    SERVER_TYPE = None

    def __init__(self, log_type, config_dir):
        self.log_type = log_type
        self.config = Bunch()
        self.config.dir = None
        self.config.mocks = Bunch()
        self.config.mocks_config = self.get_mocks_config(config_dir)
        self.setup_logging()

    def get_mocks_config(self, config_dir):
        self.config.dir = os.path.abspath(os.path.join(os.path.expanduser(config_dir), self.SERVER_TYPE))
        base_config_path = os.path.join(self.config.dir, 'config.ini')
        base_config = ConfigObj(open(base_config_path))

        config_paths = open(base_config_path).readlines()

        include = base_config.get('apimox', {}).get('include')
        if include:
            base_config_dir = os.path.dirname(base_config_path)

            if isinstance(include, list):
                for name in include:
                    config_paths.extend(open(os.path.abspath(os.path.join(base_config_dir, name))).readlines())
            else:
                config_paths.extend(open(os.path.abspath(os.path.join(base_config_dir, include))).readlines())

        return bunchify(ConfigObj(config_paths))

    def setup_logging(self):
        config = self.config.mocks_config.apimox

        log_level = getattr(logging, config.log_level)

        logger = logging.getLogger('zato')
        logger.setLevel(log_level)

        rfh = RotatingFileHandler(os.path.join(self.config.dir, 'logs', getattr(config, 'log_file_{}'.format(self.log_type))))
        sh = logging.StreamHandler()

        rfh.setLevel(log_level)
        sh.setLevel(log_level)

        formatter = logging.Formatter('%(asctime)s %(name)s %(message)s', '%Y-%m-%d %H:%M:%S')

        rfh.setFormatter(formatter)
        sh.setFormatter(formatter)

        logger.addHandler(rfh)
        logger.addHandler(sh)

    def set_up(self):
        raise NotImplementedError('Must be implemented in subclasses')
