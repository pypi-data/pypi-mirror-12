#! -*- coding: utf-8 -*-

import socket

import psutil

from brome.core.model.utils import *
from .base_instance import BaseInstance

class LocalhostInstance(BaseInstance):
    """Localhost instance

    Attributes:
        runner (object)
        browser_config (object)
    """

    def __init__(self, runner, browser_config, **kwargs):
        self.runner = runner
        self.browser_config = browser_config
        self.test_name = kwargs.get('test_name')

    def startup(self):
        """Start the instance

        This is mainly use to start the proxy
        """
        self.runner.info_log("Startup")

        if self.browser_config.config.get('enable_proxy'):
            self.start_proxy()
        
    def tear_down(self):
        """Tear down the instance

        This is mainly use to stop the proxy
        """
        self.runner.info_log("Tear down")

        if self.browser_config.config.get('enable_proxy'):
            self.stop_proxy()

    def execute_command(self, command):
        """Execute a command

        Args:
            command (str)

        Returns:
            process (object)
        """

        self.runner.info_log("Executing command: %s"%command)

        process = Popen(
                command,
                stdout=open(os.devnull, 'w'),
                stderr=open('runner.log', 'a'),
        )

        return process

    def start_proxy(self, port = None):
        """Start the mitmproxy
        """
        
        self.runner.info_log("Starting proxy...")
        
        #Get a random port that is available
        if not port:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.bind(('0.0.0.0', 0))
            sock.listen(5)
            self.proxy_port = sock.getsockname()[1]
            sock.close()

        network_data_path = os.path.join(
            self.runner.runner_dir,
            'network_data'
        )
        create_dir_if_doesnt_exist(network_data_path)

        self.proxy_output_path = os.path.join(
            network_data_path,
            string_to_filename('%s.data'%self.test_name)
        )

        path_to_mitmproxy = self.runner.brome.get_config_value("mitmproxy:path")

        filter_ = self.runner.brome.get_config_value("mitmproxy:filter")
        command = [
            path_to_mitmproxy,
            "-p",
            "%s"%self.proxy_port,
            "-w",
            self.proxy_output_path
        ]

        if filter_:
            command.append(filter_)

        process = self.execute_command(command)

        self.proxy_pid = process.pid

        self.runner.info_log("Proxy pid: %s"%self.proxy_pid)

    def stop_proxy(self):
        """Stop the mitmproxy
        """

        self.runner.info_log("Stopping proxy...")

        if hasattr(self, 'proxy_pid'):
            try:
                kill_by_pid(self.proxy_pid)
            except psutil.NoSuchProcess:
                pass
