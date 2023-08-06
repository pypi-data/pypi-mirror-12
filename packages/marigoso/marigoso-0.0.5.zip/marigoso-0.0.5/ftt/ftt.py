from selenium.webdriver import Firefox
from selenium.webdriver import Ie
from selenium.webdriver import PhantomJS
from selenium.webdriver import Chrome
from selenium.webdriver import Safari
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile

import types
import os
import sys
import inspect
import importlib

from . import Knife, Dom, Surf, Mouse, Keyboard


class Data(dict):
    """Subclass of a dictionary that allows dot syntax notation for accessing
    key value pairs.
    http://stackoverflow.com/questions/2352181/how-to-use-a-dot-to-access-members-of-dictionary
    """
    def __init__(self, *args, **kwargs):
        super(Data, self).__init__(*args, **kwargs)
        for arg in args:
            if isinstance(arg, dict):
                for k, v in arg.iteritems():
                    self[k] = v

        if kwargs:
            for k, v in kwargs.iteritems():
                self[k] = v

    def __getattr__(self, attr):
        return self.get(attr)

    def __setattr__(self, key, value):
        self.__setitem__(key, value)

    def __setitem__(self, key, value):
        super(Data, self).__setitem__(key, value)
        self.__dict__.update({key: value})

    def __delattr__(self, item):
        self.__delitem__(item)

    def __delitem__(self, key):
        super(Data, self).__delitem__(key)
        del self.__dict__[key]


class FTT(object):

    def __init__(self, request):
        # Add a data container
        self.data = Data()

        # Check if the test wants to retrieve django models
        if 'django' in request:
            self.models = Data()
            self.get_django_models(request)

        # Check if the test is interested in load profiles
        if 'proxy' in request:
            from browsermobproxy import Server
            self.server = Server(request['proxy'])
            self.server.start()
            self.proxy = self.server.create_proxy()
            selenium_proxy = self.proxy.selenium_proxy()
        else:
            selenium_proxy = None

        # Check if the test needs a browser
        if 'browser' in request:
            capabilities_map = {
                "Firefox":      DesiredCapabilities.FIREFOX,
                "IExplorer":    DesiredCapabilities.INTERNETEXPLORER,
                "Chrome":       DesiredCapabilities.CHROME,
                "PhantomJS":    DesiredCapabilities.PHANTOMJS,
                "Safari":       DesiredCapabilities.SAFARI,
            }
            caps = capabilities_map[request['browser']]
            if request['browser'] == 'Firefox':
                firefox_profile = FirefoxProfile()
                firefox_profile.set_preference('extensions.logging.enabled', False)
                firefox_profile.set_preference('network.dns.disableIPv6', False)
                for extension in request['firefox']['extentions']:
                    extension = os.path.join(request['firefox']['extensions_path'], extension)
                    firefox_profile.add_extension(extension)

                self.browser = Firefox(firefox_profile, proxy=selenium_proxy)
            elif request['browser'] == 'IExplorer':
                iedriver_server = os.path.join(request['iexplorer']['server_path'],
                                               request['iexplorer']['server_file'])
                self.browser = Ie(iedriver_server)

            elif request['browser'] == 'PhantomJS':
                service_args = ["--ignore-ssl-errors=yes"]
                caps['phantomjs.page.settings.userAgent'] = (
                    'Mozilla/5.0 (Windows NT'
                    ' 6.1; Win64; x64; rv:16.0) Gecko/20121026 Firefox/16.0'
                )
                self.browser = PhantomJS(service_args=service_args,
                                         desired_capabilities=caps)
                # If you don't do this, you'll get the pain:
                # https://github.com/angular/protractor/issues/585
                self.browser.set_window_size(1024, 768)

            elif request['browser'] == 'Chrome':
                chromedriver_server = os.path.join(request['chrome']['server_path'],
                                                   request['chrome']['server_file'])
                os.environ["webdriver.chrome.driver"] = chromedriver_server
                self.browser = Chrome(chromedriver_server)

            elif request['browser'] == 'Safari':
                selenium_server = os.path.join(request['safari']['server_path'],
                                               request['safari']['server_file'])
                self.browser = Safari(selenium_server)

            self.register_modules("browser", [Knife, Dom, Surf, Mouse, Keyboard])

        else:
            self.browser = 'There was no browser requested for this test.'

    def register_modules(self, attr_name, modules):
        """Register module defined functions to an attribute of the test object."""
        for mod in modules:
            for func_name, func in inspect.getmembers(mod, inspect.isfunction):
                _attribute = getattr(self, attr_name)
                setattr(_attribute, func_name, types.MethodType(func, _attribute))

    def register_classes(self, *args):
        """Create an object which is subclassed from the browser, using the class name
        as the attribute name (of the browser) and object name (of the subclass instance)."""
        class SubBrowser(self.browser.__class__):

            def __init__(self, browser):
                self.__dict__.update(browser.__dict__)

        for mod in args:
            for clas_name, clas in inspect.getmembers(mod, inspect.isclass):
                if not hasattr(self, clas_name):
                    setattr(self, clas_name, SubBrowser(self.browser))
                _attribute = getattr(self, clas_name)
                for func_name, func in inspect.getmembers(clas, inspect.isfunction):
                    setattr(_attribute, func_name, types.MethodType(func, _attribute))

    def get_django_models(self, request):
        # Setup Django
        if request['django']['path'] not in sys.path:
            sys.path.append(request['django']['path'])
        if not 'DJANGO_SETTINGS_MODULE' in os.environ:
            os.environ['DJANGO_SETTINGS_MODULE'] = "{}.settings".format(request['django']['name'])
        import django
        django.setup()

        for app in request['django']['apps'].keys():
            app_models = importlib.import_module("{}.models".format(app))
            for model in request['django']['apps'][app]:
                self.models[model] = getattr(app_models, model)
