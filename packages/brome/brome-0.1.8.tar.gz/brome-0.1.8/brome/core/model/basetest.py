#! -*- coding: utf-8 -*-

import json
import logging
import os
import pickle
from urlparse import urlparse

from selenium.webdriver.common.proxy import *
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from castroredux import CastroRedux

from brome.core.model.utils import *
from brome.core.model.stateful import Stateful
from brome.core.model.proxy_driver import ProxyDriver
from brome.core.model.meta.base import Session
from brome.core.model.test_instance import TestInstance
from brome.core.model.test_result import TestResult
from brome.core.model.test_crash import TestCrash
from brome.core.model.test import Test
from brome.core.model.configurator import get_config_value, parse_brome_config_from_browser_config, default_config, test_config_to_dict

class BaseTest(object):
    """Base test class used to init the driver, load and save state, start and stop video recording

    Attributes:
        runner (object): the runner that created the BaseTest instance
        name (str): the name of the test
        index (int): the index of the test
        browser_config (object): the browser config; used to init the driver
        test_batch_id (int): the test batch id
    """

    def __init__(self, runner, name, index, browser_config, test_batch_id, **kwargs):
        self._runner = runner
        self._name = name
        self._index = index
        self._browser_config = browser_config
        self._test_batch_id = test_batch_id
        self._localhost_instance = kwargs.get('localhost_instance')

        self._crash_error = False

        #TEST BATCH DIRECTORY
        if self._runner.runner_dir:
            self._runner_dir = self._runner.runner_dir
        else:
            self._runner_dir = False

        #LOGGING
        self.configure_logger()

        #DRIVER
        self.pdriver = self.init_driver()

        #ASSIGN THE TEST NAME TO THE INSTANCE
        if self._browser_config.location in ['ec2', 'virtualbox']:
            self._runner.resolve_instance_by_ip(self.pdriver.get_ip_of_node()).testname = self._name

        #TEST RESULT DIRECTORY
        self.configure_test_result_dir()

        #DRIVER RESOLUTION
        self.pdriver.configure_resolution()

        #VIDEO RECORDING
        self.start_video_recording()

        #TEST KWARGS
        self._test_config = test_config_to_dict(self.get_config_value("runner:test_config"))

        session = Session()

        extra_data = {} 
        if self._browser_config.location == 'ec2':
            private_ip = self.pdriver.get_ip_of_node()
            extra_data['instance_private_ip'] = self._runner.instances_ip[private_ip].private_ip
            extra_data['instance_public_ip'] = self._runner.instances_ip[private_ip].public_ip
            extra_data['instance_public_dns'] = self._runner.instances_ip[private_ip].public_dns
            extra_data['instance_private_dns'] = self._runner.instances_ip[private_ip].private_dns

        sa_test_instance = TestInstance(
            starting_timestamp = datetime.now(),
            name = self._name,
            test_batch_id = self._test_batch_id,
            extra_data = json.dumps(extra_data)
        )

        session.add(sa_test_instance)
        session.commit()

        self._test_instance_id = sa_test_instance.id

        session.close()

    def start_video_recording(self):
        self._video_capture_file_relative_path = False

        if self._browser_config.get('record_session'):
            vnc_passwd_file = os.path.expanduser(self._browser_config.get('vnc_password_file'))
            #Check if the vnc_password_file exist
            if not os.path.exists(vnc_passwd_file):
                #Create it
                with open(vnc_passwd_file, 'w') as fd:
                    fd.write(self._browser_config.get('vnc_password'))

            node_ip = self.pdriver.get_ip_of_node()

            self._video_capture_file_path = os.path.join(
                self._video_recording_dir,
                string_to_filename('%s.flv'%(self._name.replace(' ', '_')))
            )

            self._video_capture_file_relative_path = os.path.join(
                self._video_recording_relative_dir,
                string_to_filename('%s.flv'%(self._name.replace(' ', '_')))
            )

            self._video_recorder = CastroRedux(
                self._video_capture_file_path,
                framerate = self.get_config_value("browser:castroredux_framerate"),
                host = node_ip,
                port = self._browser_config.get('vnc_port'),
                pwdfile = vnc_passwd_file
            )

            try:
                self._video_recorder.start()
                self.info_log("CastroRedux started (ip: %s)(output: %s)"%(node_ip, self._video_capture_file_path))
            except Exception as e:
                self.info_log("CastroRedux exception: %s"%str(e))

    def stop_video_recording(self):
        if hasattr(self, '_video_recorder'):
            self.info_log("Finalizing the video capture...")

            #Let the time to the driver to quit so we have the full picture
            sleep(5)

            try:
                self._video_recorder.stop()
            except Exception as e:
                tb = traceback.format_exc()
                self.error_log("CastroRedux error traceback: %s"%str(e))
            """
            file_name = "%s/%s"%(self.video_capture_dir, self.config.get('name').replace(' ', '_'))
            Popen(["/usr/bin/ffmpeg", "-i", "%s.flv"%file_name, "-vcodec", "libvpx", "-acodec", "libvorbis", "%s.webm"%file_name], stdout=devnull, stderr=devnull)
            """

    def init_driver(self, retry = 30):
        """Init driver will instanciate a webdriver according to the browser config

        First a webdriver is instanciate according to the provided browser config
        then the webdriver is wrapped in the brome proxy_driver

        Args:
            retry (int): the number of time the init driver will retry to init the driver if it fail
                            default: 10

        Returns:
            proxy_driver instance
            
        Raises:
            Exception InitDriverException
            Exception InvalidBrowserName

        """
        #LOCAL
        if self._browser_config.location == 'localhost':
            if self._browser_config.get('browserName').lower() in ['chrome', 'firefox', 'phantomjs'] \
                and self._browser_config.get('enable_proxy'):
                mitm_proxy = "localhost:%s"%self._localhost_instance.proxy_port

                proxy = Proxy({
                    'proxyType': ProxyType.MANUAL,
                    'httpProxy': mitm_proxy,
                    'sslProxy': mitm_proxy
                })

                #NOTE http://www.seleniumhq.org/docs/04_webdriver_advanced.jsp#using-a-proxy
                #FIREFOX
                if self._browser_config.get('browserName').lower() == 'firefox':
                    profile  = webdriver.FirefoxProfile()
                    profile.set_proxy(proxy = proxy)
                    driver = webdriver.Firefox(firefox_profile=profile)

                #CHROME
                elif self._browser_config.get('browserName').lower() == 'chrome':
                    chrome_options = webdriver.ChromeOptions()
                    chrome_options.add_argument("--proxy-server={0}".format(proxy))
                    driver = webdriver.Chrome(chrome_options = chrome_options)

                #PHANTOMJS
                elif self._browser_config.get('browserName').lower() == 'phantomjs':

                    #TODO investigate why this doesnt work in phantomjs
                    """
                    #WAY 1
                    #http://stackoverflow.com/questions/14699718/how-do-i-set-a-proxy-for-phantomjs-ghostdriver-in-python-webdriver
                    service_args = [
                    '--proxy=127.0.0.1:%s'%self._localhost_instance.proxy_port,
                    '--proxy-type=http',
                    ]
                    driver = webdriver.PhantomJS(service_args=service_args)

                    #WAY 2
                    desired_cap = self._browser_config.config
                    proxy.add_to_capabilities(desired_cap)
                    driver = webdriver.PhantomJS(desired_capabilities = desired_cap)
                    """
                    raise NotImplemented()

                #NOTE: AFAIK Safari doesn't support proxy
                #https://code.google.com/p/selenium/issues/detail?id=5051
            else:
                try:
                    driver = getattr(webdriver, self._browser_config.get('browserName'))()
                except AttributeError:
                    raise InvalidBrowserName("The browserName('%s') is invalid"%self._browser_config.get('browserName'))

        #APPIUM
        elif self._browser_config.location == 'appium':
            driver = webdriver.Remote(
                command_executor='http://127.0.0.1:4723/wd/hub',
                desired_capabilities = self._browser_config.config
            )

        #SAUCELABS
        elif self._browser_config.location == 'saucelabs':
            driver = webdriver.Remote(
                command_executor='http://%s:%s@ondemand.saucelabs.com:80/wd/hub'%(
                    self.get_config_value("saucelabs:username"),
                    self.get_config_value("saucelabs:key")
                ),
                desired_capabilities = self._browser_config.config
            )

        #BROWSERSTACK
        elif self._browser_config.location == 'browserstack':
            driver = webdriver.Remote(
                command_executor='http://%s:%s@hub.browserstack.com:80/wd/hub'%(
                    self.get_config_value("browserstack:username"),
                    self.get_config_value("browserstack:key")
                ),
                desired_capabilities = self._browser_config.config
            )

        #REMOTE
        elif self._browser_config.location in ['virtualbox', 'ec2']:
            config = self._browser_config.config

            desired_cap = {}
            desired_cap['browserName'] = config.get('browserName')
            desired_cap['platform'] = config.get('platform')
            desired_cap['javascriptEnabled'] = True

            if config.get('enable_proxy'):
                mitm_proxy = "localhost:%s"%config.get('proxy_port', 8080)

                proxy = Proxy({
                    'proxyType': ProxyType.MANUAL,
                    'httpProxy': mitm_proxy,
                    'sslProxy': mitm_proxy
                })

            if desired_cap['browserName'].lower() == "chrome":
                chrome_options = Options()
                chrome_options.add_argument("--test-type")
                chrome_options.add_argument("--disable-application-cache")

                if config.get('enable_proxy'):
                    chrome_options.add_argument("--proxy-server={0}".format(proxy))

                desired_cap=chrome_options.to_capabilities()

            try:
                command_executor = "http://%s:%s/wd/hub"%(
                    self.get_config_value("grid_runner:selenium_server_ip"),
                    self.get_config_value("grid_runner:selenium_server_port")
                )

                if desired_cap['browserName'].lower() == "firefox" and config.get('enable_proxy'):
                    profile  = webdriver.FirefoxProfile()
                    profile.set_proxy(proxy = proxy)
                    driver = webdriver.Remote(
                            browser_profile = profile,
                            desired_capabilities = desired_cap,
                            command_executor = command_executor)
                else:
                    driver = webdriver.Remote(
                            command_executor = command_executor,
                            desired_capabilities = desired_cap
                    )

                self.info_log('Got a session')

            except Exception as e:
                if unicode(e).find("Error forwarding the new session") != -1:
                    if retry:

                        self.info_log("Waiting 5 sec because the pool doesn't contain the needed browser.")

                        sleep(5)

                        return self.init_driver(retry = (retry - 1))
                    else:
                        raise InitDriverException("Cannot get the driver")

        #Wrap the driver in the brome proxy driver and return it
        return ProxyDriver(
            driver = driver,
            test_instance = self,
            runner = self._runner
        )

    def delete_state(self, state_pickle = None):
        """This will delete the pickle that hold the saved test state
            
        Args:
            state_pickle (path): the path of the pickle that will be delete
        """
        if not state_pickle:
            state_pickle = self.get_state_pickle_path()

        if os.path.isfile(state_pickle):
            os.remove(state_pickle)
            self.info_log("State deleted: %s"%state_pickle)

    def get_state_pickle_path(self):
        """Return the state's pickle path

        The project:url config need to be set in order to extract the server name. Each server will have it own state
        The test name is used to name the state.

        E.g.: the test named "test 1" that run with the project:url ("http://www.example.com") with have a state named:
        tests/states/test_1_example.com.pkl

        Returns: str (path)
        """

        #Extract the server name
        server = urlparse(self.pdriver.get_config_value("project:url")).netloc

        states_dir = os.path.join(
            self.get_config_value("project:absolute_path"),
            self.get_config_value("project:script_folder_name"),
            "states"
        )
        create_dir_if_doesnt_exist(states_dir)

        #TODO should be configurable
        state_pickle_path = os.path.join(
            states_dir,
            string_to_filename('%s_%s.pkl'%(self._name.replace(' ', '_'), server))
        )

        return  state_pickle_path

    def save_state(self):
        """Save the state in a pickle

        First remove all the instance variables that are private (_*).
        Then remove the pdriver instance variable.
        Finally cleanup the state using the Stateful.cleanup_state function.
        The cleanup is recursive.

        The test state will be saved to the path returned by the get_state_pickle_path.
        
        Returns: None
        """
        self.info_log("Saving state...")

        state = {}

        #Remove all the instance variables that are private
        state = {key:value for (key, value) in self.__dict__.iteritems() if key[0] != '_'}

        #Remove the pdriver
        del state['pdriver']

        #Cleanup the state
        effective_state = Stateful.cleanup_state(state)

        #Save the state
        state_pickle_path = self.get_state_pickle_path()
        with open(state_pickle_path, 'wb') as fd:
            pickle.dump(effective_state, fd)

        self.info_log("State saved: %s"%state_pickle_path)

    def load_state(self):
        """Load the state pickle into the instance object if a state is found

        The state will be loaded in the basetest instance if a state exist.
        The pdriver will be set on each instance that inherited from Stateful
        These instance can be in a dict or a list. It is not recursive tho.

        If the instance has an after_load method, this method will be called
        E.g.:
        class Base(object):
            def after_load(self):
                self.app = self.pdriver.app

        Returns: bool True if a state was found; False if no state was found;
        """
        self.info_log("Loading state...")

        #Set the pdriver for an object that inherited from Stateful
        def set_pdriver(value):
            #TODO support class that inherited Stateful
            if Stateful in value.__class__.__bases__:
                value.pdriver = self.pdriver
                if hasattr(value, 'after_load'):
                    value.after_load()
            elif type(value) is list:
                for v in value:
                    set_pdriver(v)
            elif type(value) is dict:
                for k, v in value.iteritems():
                    set_pdriver(v)

        #Load the state pickle
        state_pickle_path = self.get_state_pickle_path()
        if os.path.isfile(state_pickle_path):
            with open(state_pickle_path, 'rb') as fd:
                state = pickle.load(fd)
        else:
            self.info_log("No state found.")

            return False

        #Set the pdriver
        for key, value in state.iteritems():
            set_pdriver(value)

        #Update the instance variable dictionary
        self.__dict__.update(state)

        self.info_log("State loaded.")

        return True

    def configure_logger(self):
        """Configure the logger for the test

        Configure the logger from the logger_test config:
            logger_test:level
            logger_test:streamlogger
            logger_test:filelogger
            logger_test:format

        See documentation: http://brome.readthedocs.org/en/release/configuration.html#logger-test

        If the config project:test_batch_result_path is set to False then the filelogger will not be configured.

        Returns: None
        """

        #Logger name
        logger_name = self._name

        #Log directory
        if self._runner_dir:
            self.test_log_dir = os.path.join(
                self._runner_dir,
                "logs"
            )

        #Logger
        self._logger = logging.getLogger(logger_name)

        #Create the log directory
        if self._runner_dir:
            create_dir_if_doesnt_exist(self.test_log_dir)

        #Format
        format_ = self.get_config_value("logger_test:format")

        #Stream logger 
        if self.get_config_value('logger_test:streamlogger'):
            sh = logging.StreamHandler()
            stream_formatter = logging.Formatter(format_)
            sh.setFormatter(stream_formatter)
            self._logger.addHandler(sh)

        #File logger
        if self._runner_dir:
            if self.get_config_value('logger_test:filelogger'):
                test_name = string_to_filename(self._name)
                fh = logging.FileHandler(os.path.join(
                    self.test_log_dir,
                    "%s_%s.log"%(test_name, self._browser_config.get_id())
                ))
                file_formatter = logging.Formatter(format_)
                fh.setFormatter(file_formatter)
                self._logger.addHandler(fh)

        #Set level
        self._logger.setLevel(getattr(logging, self.get_config_value('logger_test:level')))

    def get_logger_dict(self):
        return {'batchid': self._test_batch_id, 'testname': u"%s"%self._name}

    def debug_log(self, msg):
        self._logger.debug(u"[debug]%s"%msg, extra=self.get_logger_dict())

    def info_log(self, msg):
        self._logger.info(u"%s"%msg, extra=self.get_logger_dict())

    def warning_log(self, msg):
        self._logger.warning(u"[warning]%s"%msg, extra=self.get_logger_dict())

    def error_log(self, msg):
        self._logger.error(u"[error]%s"%msg, extra=self.get_logger_dict())

    def critical_log(self, msg):
        self._logger.critical(u"[critical]%s"%msg, extra=self.get_logger_dict())

    def execute(self):
        try:
            self.before_run()

            if self._test_config.get("delete_state"):
                self.delete_state(self.get_state_pickle_path())

            if not self.load_state():
                if hasattr(self, 'create_state'):
                    self.create_state()
                    self.save_state()

            self.run(**self._test_config)

            self.after_run()

        except Exception, e:
            self.error_log('Test failed')

            tb = traceback.format_exc()

            self.error_log('Crash: %s'%tb)

            self.fail(tb)
        finally:
            self.end()

    def end(self):
        self.info_log("Test ended")

        self.quit_driver()

        self.stop_video_recording()

        if self.get_config_value("runner:play_sound_on_test_finished"):
            say(self.get_config_value("runner:sound_on_test_finished"))

        ending_timestamp = datetime.now()
        session = Session()
        sa_test_instance =  session.query(TestInstance).filter(TestInstance.id == self._test_instance_id).one()
        sa_test_instance.ending_timestamp = ending_timestamp
        session.commit()
        session.close()

        self.info_log("Ending timestamp: %s"%ending_timestamp)

    def quit_driver(self):
        self.info_log("Quitting the browser...")
        try:
            self.pdriver.quit()
        except Exception as e:
            self.error_log('Exception driver.quit(): %s'%str(e))

        """
        if hasattr(self, 'browsermobserver'):
            with open("temp.har", "w") as fd:
                fd.write(json.dumps(self.proxy.har))

            self.browsermobserver.stop()
        """

    def before_run(self):
        pass

    def after_run(self):
        pass

    def fail(self, tb):
        if self.get_config_value("runner:play_sound_on_test_crash"):
            say(self.get_config_value("runner:sound_on_test_crash"))

        if self.get_config_value("runner:embed_on_test_crash"):
            self.pdriver.embed()

        self._crash_error = '[!]%s %s crashed: %s'%(self._name, self._browser_config.get_id(), str(tb))

        self.create_crash_report(tb)

    def create_crash_report(self, tb):
        self.info_log('Creating a crash report')

        crash_name = "%s - %s"%(self.pdriver.get_id(join_char = '_'), self._name)

        extra_data = ''
        extra_data_dict = {}

        #JAVASCRIPT ERROR
        extra_data_dict['javascript_error'] = self.pdriver.get_javascript_error()
        
        #NETWORK CAPTURE
        if self._browser_config.get('enable_proxy'):
            extra_data_dict['network_capture_path'] = os.path.join(self._network_capture_relative_dir, string_to_filename('%s.data'%self._name))

        if extra_data_dict:
            extra_data = json.dumps(extra_data_dict)

        crash_screenshot_relative_path = ''
        if self._runner_dir:
            crash_screenshot_path = os.path.join(
                self._crash_report_dir,
                string_to_filename('%s.png'%crash_name)
            )

            crash_screenshot_relative_path = os.path.join(
                self._crash_report_relative_dir,
                string_to_filename('%s.png'%crash_name)
            )

            #CRASH LOG
            with open(os.path.join(self._crash_report_dir, string_to_filename('%s.log'%crash_name)), 'w') as f:
                f.write(str(tb))

            #CRASH SCREENSHOT
            self.pdriver.take_screenshot(screenshot_path = crash_screenshot_path)

        #CRASH OBJECT
        session = Session()

        sa_test_crash = TestCrash(
            timestamp = datetime.now(),
            trace = str(tb),
            browser_id = self.pdriver.get_id(),
            screenshot_path = crash_screenshot_relative_path,
            videocapture_path = self._video_capture_file_relative_path,
            extra_data = extra_data,
            title = crash_name,
            test_instance_id = self._test_instance_id,
            test_batch_id = self._test_batch_id
        )

        session.add(sa_test_crash)
        session.commit()
        session.close()

    def get_config_value(self, config_name):
        if not hasattr(self, 'browser_brome_config'):
            self._browser_brome_config = parse_brome_config_from_browser_config(self._browser_config.config)

        config_list = [
            self._browser_brome_config,
            self._runner.config,
            self._runner.brome_config
        ]
        value = get_config_value(config_list, config_name)

        if hasattr(self, '_logger'):
            self.debug_log("config_value (%s): %s"%(config_name, value))

        return value

    def configure_test_result_dir(self):

        if not self._runner_dir:
            return

        #CRASH DIRECTORY
        self._crash_report_dir = os.path.join(
            self._runner_dir,
            'crashes'
        )
        create_dir_if_doesnt_exist(self._crash_report_dir)

        self._crash_report_relative_dir = os.path.join(
            self._runner.relative_runner_dir,
            'crashes'
        )

        #ASSERTION SCREENSHOT DIRECTORY
        self._assertion_screenshot_relative_dir = os.path.join(
            self._runner.relative_runner_dir,
            'assertion_screenshots',
            self.pdriver.get_id(join_char = '_')
        )

        self._assertion_screenshot_dir = os.path.join(
            self._runner_dir,
            'assertion_screenshots',
            self.pdriver.get_id(join_char = '_')
        )
        create_dir_if_doesnt_exist(self._assertion_screenshot_dir)

        #SCREENSHOT DIRECTORY
        self._screenshot_dir = os.path.join(
            self._runner_dir,
            'screenshots',
            self.pdriver.get_id(join_char = '_')
        )
        create_dir_if_doesnt_exist(self._screenshot_dir)

        #VIDEO RECORDING DIRECTORY
        if self._browser_config.get('record_session'):
            self._video_recording_dir = os.path.join(
                self._runner_dir,
                'video_recording',
                self.pdriver.get_id(join_char = '_')
            )
            create_dir_if_doesnt_exist(self._video_recording_dir)

            self._video_recording_relative_dir = os.path.join(
                self._runner.relative_runner_dir,
                'video_recording',
                self.pdriver.get_id(join_char = '_')
            )

        #NETWORK CAPTURE DIRECTORY
        if self._browser_config.get('enable_proxy'):
            self._network_capture_dir = os.path.join(
                self._runner_dir,
                'network_capture'
            )
            create_dir_if_doesnt_exist(self._network_capture_dir)
            self._network_capture_relative_dir = os.path.join(
                self._runner.relative_runner_dir,
                'network_capture'
            )

    def get_test_result_summary(self):
        results = []

        session = Session()

        base_query = session.query(TestResult).filter(TestResult.test_instance_id == self._test_instance_id).filter(TestResult.browser_id == self.pdriver.get_id())
        total_test = base_query.count()
        total_test_successful = base_query.filter(TestResult.result == True).count()
        total_test_failed = base_query.filter(TestResult.result == False).count()
        failed_tests = base_query.filter(TestResult.result == False).all()

        results.append('Total_test: %s; Total_test_successful: %s; Total_test_failed: %s'%(total_test, total_test_successful, total_test_failed))

        for failed_test in failed_tests:
            query = session.query(Test).filter(Test.id == failed_test.test_id)
            if query.count():
                test = query.one()
                test_id = test.test_id
            else:
                test_id = 'n/a'

            results.append('[%s] %s'%(test_id, failed_test.title))

        session.close()

        return results
