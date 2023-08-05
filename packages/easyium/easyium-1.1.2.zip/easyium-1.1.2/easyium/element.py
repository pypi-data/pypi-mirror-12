from selenium.common.exceptions import WebDriverException, StaleElementReferenceException
from selenium.webdriver import ActionChains

from .decorator import SupportedBy
from .webdriver import WebDriverType
from .exceptions import EasyiumException, NoSuchElementException
from .waiter import ElementWaitFor
from .context import Context
from .config import DEFAULT

__author__ = 'karl.gong'


class Element(Context):
    def __init__(self, parent):
        Context.__init__(self)
        self.__parent = parent

    def get_web_driver(self):
        return self.get_parent().get_web_driver()

    get_browser = get_web_driver

    def get_web_driver_type(self):
        return self.get_web_driver().get_web_driver_type()

    get_browser_type = get_web_driver_type

    def get_pre_wait_time(self):
        return self.get_web_driver().get_pre_wait_time()

    def get_wait_interval(self):
        return self.get_web_driver().get_wait_interval()

    def get_wait_timeout(self):
        return self.get_web_driver().get_wait_timeout()

    def get_parent(self):
        return self.__parent

    def _selenium_element(self):
        pass

    def wait_for(self, pre_wait_time=DEFAULT, interval=DEFAULT, timeout=DEFAULT):
        """
            Get a ElementWaitFor instance.

        :param pre_wait_time: the pre wait time (in milliseconds), default value is web driver's pre wait time
        :param interval: the wait interval (in milliseconds), default value is web driver's wait interval
        :param timeout: the wait timeout (in milliseconds), default value is web driver's wait timeout
        """
        pre_wait_time = self.get_pre_wait_time() if pre_wait_time == DEFAULT else pre_wait_time
        interval = self.get_wait_interval() if interval == DEFAULT else interval
        timeout = self.get_wait_timeout() if timeout == DEFAULT else timeout
        return ElementWaitFor(self, pre_wait_time, interval, timeout)

    def blur(self):
        try:
            try:
                self.get_web_driver().execute_script("arguments[0].blur()", self)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self.get_web_driver().execute_script("arguments[0].blur()", self)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def clear(self):
        try:
            try:
                self._selenium_element().clear()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self._selenium_element().clear()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def click(self):
        try:
            try:
                self._selenium_element().click()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self._selenium_element().click()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def send_keys(self, value):
        try:
            try:
                self._selenium_element().send_keys(value)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self._selenium_element().send_keys(value)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def submit(self):
        try:
            try:
                self._selenium_element().submit()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self._selenium_element().submit()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_attribute(self, name):
        try:
            try:
                return self._selenium_element().get_attribute(name)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                return self._selenium_element().get_attribute(name)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_css_value(self, property_name):
        try:
            try:
                return self._selenium_element().value_of_css_property(property_name)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                return self._selenium_element().value_of_css_property(property_name)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_location(self):
        """
            Usage: x, y = element.get_location()
        :return: The location for the top-left corner of this element.
        """
        try:
            try:
                location = self._selenium_element().location
                return location["x"], location["y"]
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                location = self._selenium_element().location
                return location["x"], location["y"]
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_size(self):
        """
            Usage: width, height = element.get_size()
        :return: The size (including border) of this element.
        """
        try:
            try:
                size = self._selenium_element().size
                return size["width"], size["height"]
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                size = self._selenium_element().size
                return size["width"], size["height"]
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_tag_name(self):
        try:
            try:
                return self._selenium_element().tag_name
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                return self._selenium_element().tag_name
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_value(self):
        try:
            try:
                return self._selenium_element().get_attribute("value")
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                return self._selenium_element().get_attribute("value")
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_text(self):
        try:
            try:
                return self._selenium_element().text
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                return self._selenium_element().text
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_text_node_content(self, text_node_index):
        """
            Get content of the text node in this element.
            If the text_node_index refers to a non-text node or be out of bounds, an exception will be thrown.
        :param text_node_index: index of text node in this element
        :return: the content of the text node in this element.
        """
        try:
            try:
                content = self.get_web_driver().execute_script(
                    "return arguments[0].childNodes[%s].nodeValue" % text_node_index, self)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                content = self.get_web_driver().execute_script(
                    "return arguments[0].childNodes[%s].nodeValue" % text_node_index, self)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

        if content is None:
            raise EasyiumException("Cannot get text content of a non-text node in element: \n%s\n" % self)
        return content

    def set_selection_range(self, start, end):
        """
            Set the selection range for text in this element..
        :param start: start position
        :param end: end position
        """
        script = """
            function getTextNodesIn(node) {
                var textNodes = [];
                if (node.nodeType == 3) {
                    textNodes.push(node);
                } else {
                    var children = node.childNodes;
                    for (var i = 0, len = children.length; i < len; ++i) {
                        textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
                    }
                }
                return textNodes;
            }

            function setSelectionRange(el, start, end) {
                if (el.tagName == 'INPUT' || el.tagName == 'TEXTAREA'){
                    if(el.createTextRange){
                        var Range=el.createTextRange();
                        Range.collapse();
                        Range.moveEnd('character',end);
                        Range.moveStart('character',start);
                        Range.select();
                    }else if(el.setSelectionRange){
                        el.focus();
                        el.setSelectionRange(start,end);
                    }
                } else {
					if (document.createRange && window.getSelection) {
                        var range = document.createRange();
                        range.selectNodeContents(el);
                        var textNodes = getTextNodesIn(el);
                        var foundStart = false;
                        var charCount = 0, endCharCount;

                        for (var i = 0, textNode; textNode = textNodes[i++]; ) {
                            endCharCount = charCount + textNode.length;
                            if (!foundStart && start >= charCount
                                    && (start < endCharCount ||
                                    (start == endCharCount && i < textNodes.length))) {
                                range.setStart(textNode, start - charCount);
                                foundStart = true;
                            }
                            if (foundStart && end <= endCharCount) {
                                range.setEnd(textNode, end - charCount);
                                break;
                            }
                            charCount = endCharCount;
                        }

                        var sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(range);
                    } else if (document.selection && document.body.createTextRange) {
                        var textRange = document.body.createTextRange();
                        textRange.moveToElementText(el);
                        textRange.collapse(true);
                        textRange.moveEnd('character', end);
                        textRange.moveStart('character', start);
                        textRange.select();
                    }
				}
            }

            setSelectionRange(arguments[0], %s, %s);
        """
        try:
            try:
                self.get_web_driver().execute_script(script % (start, end), self)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self.get_web_driver().execute_script(script % (start, end), self)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def get_inner_html(self):
        try:
            try:
                return self.get_web_driver().execute_script("return arguments[0].innerHTML", self)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                return self.get_web_driver().execute_script("return arguments[0].innerHTML", self)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def is_enabled(self):
        try:
            try:
                return self._selenium_element().is_enabled()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                return self._selenium_element().is_enabled()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def is_selected(self):
        try:
            try:
                return self._selenium_element().is_selected()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                return self._selenium_element().is_selected()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._BROWSER)
    def mouse_over(self):
        script = """
            var evObj = document.createEvent('MouseEvents');
            evObj.initMouseEvent("mouseover",true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            arguments[0].dispatchEvent(evObj);
        """
        web_driver_type = self.get_web_driver_type()
        try:
            try:
                if web_driver_type == WebDriverType.CHROME or web_driver_type == WebDriverType.FIREFOX:
                    self.get_web_driver().execute_script(script, self)
                else:
                    ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element(
                        self._selenium_element()).perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                if web_driver_type == WebDriverType.CHROME or web_driver_type == WebDriverType.FIREFOX:
                    self.get_web_driver().execute_script(script, self)
                else:
                    ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element(
                        self._selenium_element()).perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._BROWSER)
    def mouse_out(self):
        script = """
            var evObj = document.createEvent('MouseEvents');
            evObj.initMouseEvent("mouseout",true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            arguments[0].dispatchEvent(evObj);
        """
        web_driver_type = self.get_web_driver_type()
        try:
            try:
                if web_driver_type in [WebDriverType.CHROME, WebDriverType.FIREFOX]:
                    self.get_web_driver().execute_script(script, self)
                else:
                    ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element(
                        self._selenium_element()).perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                if web_driver_type in [WebDriverType.CHROME, WebDriverType.FIREFOX]:
                    self.get_web_driver().execute_script(script, self)
                else:
                    ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element(
                        self._selenium_element()).perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def click_and_hold(self):
        try:
            try:
                ActionChains(self.get_web_driver()._selenium_web_driver()).click_and_hold(
                    self._selenium_element()).perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                ActionChains(self.get_web_driver()._selenium_web_driver()).click_and_hold(
                    self._selenium_element()).perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def release_mouse_here(self):
        try:
            try:
                ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element(
                    self._selenium_element()).release().perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element(
                    self._selenium_element()).release().perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._BROWSER)
    def release_mouse_here_with_offset(self, x_offset, y_offset):
        """
            Release mouse here with offset.
            The origin is at the top-left corner of web driver and offsets are relative to the top-left corner of the element.
        :param x_offset: X offset to release mouse.
        :param y_offset: Y offset to release mouse.
        """
        try:
            try:
                ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element_with_offset(
                    self._selenium_element(), x_offset, y_offset).release().perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                ActionChains(self.get_web_driver()._selenium_web_driver()).move_to_element_with_offset(
                    self._selenium_element(), x_offset, y_offset).release().perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def drag_and_drop_to(self, target_element):
        web_driver_type = self.get_web_driver_type()
        if web_driver_type in WebDriverType._MOBILE:
            try:
                try:
                    self.get_web_driver()._selenium_web_driver().drag_and_drop(self._selenium_element(),
                                                                               target_element._selenium_element())
                except (NoSuchElementException, StaleElementReferenceException):
                    self.wait_for().visible()
                    target_element.wait_for().visible()
                    self.get_web_driver()._selenium_web_driver().drag_and_drop(self._selenium_element(),
                                                                               target_element._selenium_element())
            except WebDriverException as wde:
                raise EasyiumException("%s\n%s" % (wde.msg, self))
        else:
            self.click_and_hold()
            target_element.release_mouse_here()

    @SupportedBy(WebDriverType._BROWSER)
    def drag_and_drop_to_with_offset(self, target_element, x_offset, y_offset):
        """
            Drag and drop to target element with offset.
            The origin is at the top-left corner of web driver and offsets are relative to the top-left corner of the element.
        :param target_element: the target element to drop.
        :param x_offset: X offset to drop
        :param y_offset: Y offset to drop.
        """
        self.click_and_hold()
        target_element.release_mouse_here_with_offset(x_offset, y_offset)

    @SupportedBy(WebDriverType._MOBILE)
    def tap(self):
        from appium.webdriver.common.touch_action import TouchAction

        touch_action = TouchAction(self.get_web_driver()._selenium_web_driver())
        try:
            try:
                touch_action.tap(self._selenium_element(), None, None, 1).perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                touch_action.tap(self._selenium_element(), None, None, 1).perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._MOBILE)
    def press(self):
        from appium.webdriver.common.touch_action import TouchAction

        touch_action = TouchAction(self.get_web_driver()._selenium_web_driver())
        try:
            try:
                touch_action.press(self._selenium_element(), None, None).release().perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                touch_action.press(self._selenium_element(), None, None).release().perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._MOBILE)
    def long_press(self, duration=1000):
        from appium.webdriver.common.touch_action import TouchAction

        touch_action = TouchAction(self.get_web_driver()._selenium_web_driver())
        try:
            try:
                touch_action.long_press(self._selenium_element(), None, None, duration).release().perform()
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                touch_action.long_press(self._selenium_element(), None, None, duration).release().perform()
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType.ANDROID)
    def set_text(self, text):
        try:
            try:
                self._selenium_element().set_text(text)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                self._selenium_element().set_text(text)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._MOBILE)
    def get_location_in_view(self):
        try:
            try:
                location = self._selenium_element().location_in_view
                return location["x"], location["y"]
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                location = self._selenium_element().location_in_view
                return location["x"], location["y"]
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._MOBILE)
    def set_value(self, value):
        try:
            try:
                self._selenium_element().set_value(value)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                self._selenium_element().set_value(value)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._MOBILE)
    def scroll_to(self, target_element):
        try:
            try:
                self.get_web_driver()._selenium_web_driver().scroll(self._selenium_element(),
                                                                    target_element._selenium_element())
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().exists()
                target_element.wait_for().exists()
                self.get_web_driver()._selenium_web_driver().scroll(self._selenium_element(),
                                                                    target_element._selenium_element())
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._MOBILE)
    def pinch(self, percent=200, steps=50):
        try:
            try:
                self.get_web_driver()._selenium_web_driver().pinch(self._selenium_element(), percent, steps)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self.get_web_driver()._selenium_web_driver().pinch(self._selenium_element(), percent, steps)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    @SupportedBy(WebDriverType._MOBILE)
    def zoom(self, percent=200, steps=50):
        try:
            try:
                self.get_web_driver()._selenium_web_driver().zoom(self._selenium_element(), percent, steps)
            except (NoSuchElementException, StaleElementReferenceException):
                self.wait_for().visible()
                self.get_web_driver()._selenium_web_driver().zoom(self._selenium_element(), percent, steps)
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def is_displayed(self):
        try:
            try:
                return self._selenium_element().is_displayed()
            except StaleElementReferenceException:
                self._refresh()
                return self._selenium_element().is_displayed()
        except NoSuchElementException:
            return False
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))

    def exists(self):
        try:
            try:
                self._selenium_element().is_displayed()
                return True
            except StaleElementReferenceException:
                self._refresh()
                return True
        except NoSuchElementException:
            return False
        except WebDriverException as wde:
            raise EasyiumException("%s\n%s" % (wde.msg, self))
