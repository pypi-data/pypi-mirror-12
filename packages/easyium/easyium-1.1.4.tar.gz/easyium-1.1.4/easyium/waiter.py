import time

from selenium.common.exceptions import NoAlertPresentException

from .config import DEFAULT, default_config
from .exceptions import TimeoutException, NoSuchElementException

__author__ = 'karl.gong'


class Waiter:
    def __init__(self, interval=DEFAULT, timeout=DEFAULT, pre_wait_time=DEFAULT, post_wait_time=DEFAULT):
        """
            Create a Waiter instance.

        :param interval: the wait interval (in milliseconds), default value is from default_config.waiter_wait_interval
        :param timeout: the wait timeout (in milliseconds), default value is from default_config.waiter_wait_timeout
        :param pre_wait_time: the pre wait time (in milliseconds), default value is from default_config.waiter_pre_wait_time
        :param post_wait_time: the post wait time (in milliseconds), default value is from default_config.waiter_post_wait_time
        """
        self.__interval = default_config.waiter_wait_interval if interval == DEFAULT else interval
        self.__timeout = default_config.waiter_wait_timeout if timeout == DEFAULT else timeout
        self.__pre_wait_time = default_config.waiter_pre_wait_time if pre_wait_time == DEFAULT else pre_wait_time
        self.__post_wait_time = default_config.waiter_post_wait_time if post_wait_time == DEFAULT else post_wait_time

    def wait_for(self, condition_function, *function_args, **function_kwargs):
        """
            Wait for the condition.

        :param condition_function: the condition function
        :param function_args: the args for condition_function
        :param function_kwargs: the kwargs for condition_function
        """
        time.sleep(self.__pre_wait_time / 1000.0)

        start_time = time.time() * 1000.0

        if condition_function(*function_args, **function_kwargs):
            time.sleep(self.__post_wait_time / 1000.0)
            return

        while (time.time() * 1000.0 - start_time) <= self.__timeout:
            if condition_function(*function_args, **function_kwargs):
                time.sleep(self.__post_wait_time / 1000.0)
                return
            else:
                time.sleep(self.__interval / 1000.0)

        raise TimeoutException("Timed out waiting for <%s>." % condition_function.__name__)


class ElementWaitFor:
    def __init__(self, element, interval, timeout, pre_wait_time, post_wait_time):
        self.__element = element
        self.__desired_occurrence = True
        self.__waiter = Waiter(interval, timeout, pre_wait_time, post_wait_time)

    def __wait_for(self, element_condition):
        def is_element_condition_occurred():
            return element_condition.occurred() == self.__desired_occurrence

        try:
            self.__waiter.wait_for(is_element_condition_occurred)
        except TimeoutException:
            raise TimeoutException(
                "Timed out waiting for <%s> to be <%s>." % (element_condition, self.__desired_occurrence))

    def not_(self):
        self.__desired_occurrence = not self.__desired_occurrence
        return self

    def exists(self):
        self.__wait_for(ElementExistence(self.__element))

    def visible(self):
        self.__wait_for(ElementVisible(self.__element))

    def attribute_contains_one(self, attribute, *values):
        self.__wait_for(ElementAttributeContainsOne(self.__element, attribute, *values))

    def attribute_contains_all(self, attribute, *values):
        self.__wait_for(ElementAttributeContainsAll(self.__element, attribute, *values))


class ElementExistence:
    def __init__(self, element):
        self.__element = element

    def occurred(self):
        return self.__element.exists()

    def __str__(self):
        return "ElementExistence [\n%s\n]" % self.__element


class ElementVisible:
    def __init__(self, element):
        self.__element = element

    def occurred(self):
        return self.__element.is_displayed()

    def __str__(self):
        return "ElementVisible [\n%s\n]" % self.__element


class ElementAttributeContainsOne:
    def __init__(self, element, attribute, *values):
        self.__element = element
        self.__attribute = attribute
        self.__values = values

    def occurred(self):
        attribute_value = self.__element.get_attribute(self.__attribute)
        for value in self.__values:
            if attribute_value.find(value) != -1:
                return True
        return False

    def __str__(self):
        return "ElementAttributeContainsOne [element: \n%s\n][attribute: %s][values: %s]" % (
            self.__element, self.__attribute, self.__values)


class ElementAttributeContainsAll:
    def __init__(self, element, attribute, *values):
        self.__element = element
        self.__attribute = attribute
        self.__values = values

    def occurred(self):
        attribute_value = self.__element.get_attribute(self.__attribute)
        for value in self.__values:
            if attribute_value.find(value) == -1:
                return False
        return True

    def __str__(self):
        return "ElementAttributeContainsAll [element: \n%s\n][attribute: %s][values: %s]" % (
            self.__element, self.__attribute, self.__values)


class WebDriverWaitFor:
    def __init__(self, web_driver, interval, timeout, pre_wait_time, post_wait_time):
        self.__web_driver = web_driver
        self.__desired_occurrence = True
        self.__waiter = Waiter(interval, timeout, pre_wait_time, post_wait_time)

    def __wait_for(self, web_driver_condition):
        def is_web_driver_condition_occurred():
            return web_driver_condition.occurred() == self.__desired_occurrence

        try:
            self.__waiter.wait_for(is_web_driver_condition_occurred)
        except TimeoutException:
            raise TimeoutException(
                "Timed out waiting for <%s> to be <%s>." % (web_driver_condition, self.__desired_occurrence))

    def not_(self):
        self.__desired_occurrence = not self.__desired_occurrence
        return self

    def alert_present(self):
        self.__wait_for(AlertPresent(self.__web_driver))

    def text_present(self, text):
        self.__wait_for(TextPresent(self.__web_driver, text))

    def url_changed(self, current_url):
        self.__wait_for(URLChanged(self.__web_driver, current_url))


class AlertPresent:
    def __init__(self, web_driver):
        self.__web_driver = web_driver

    def occurred(self):
        try:
            alert_text = self.__web_driver.get_alert().text
            return True
        except NoAlertPresentException:
            return False

    def __str__(self):
        return "AlertPresent [\n%s\n]" % self.__web_driver


class TextPresent:
    def __init__(self, web_driver, text):
        self.__web_driver = web_driver
        self.__text = text

    def occurred(self):
        try:
            self.__web_driver.find_element("xpath=//*[contains(text(), '%s')]" % self.__text)
            return True
        except NoSuchElementException:
            return False

    def __str__(self):
        return "TextPresent [webdriver: \n%s\n][text: %s]" % (self.__web_driver, self.__text)


class URLChanged:
    def __init__(self, web_driver, current_url):
        self.__web_driver = web_driver
        self.__current_url = current_url

    def occurred(self):
        return self.__web_driver.get_current_url() != self.__current_url

    def __str__(self):
        return "URLChanged [\n%s\n]" % self.__web_driver
