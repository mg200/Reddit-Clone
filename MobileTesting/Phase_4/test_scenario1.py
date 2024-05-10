from main import *
from selenium.common.exceptions import NoSuchElementException

def find_element_and_act(by, value, action, action_value=None):
    try:
        el = driver.find_element(by=by, value=value)
        if action == "click":
            el.click()
        elif action == "send_keys":
            el.send_keys(action_value)
    except NoSuchElementException:
        print(f"Element with {by} = {value} not found")

find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.view.View\").instance(19)", "send_keys", "")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.view.View\").instance(20)", "send_keys", "")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.view.View\").instance(20)", "click")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.view.View\").instance(19)", "click")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.view.View\").instance(22)", "click")
find_element_and_act(AppiumBy.CLASS_NAME, "android.widget.EditText", "click")
find_element_and_act(AppiumBy.CLASS_NAME, "android.widget.EditText", "send_keys", "insert comment here")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.widget.Button\").instance(0)", "click")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.widget.RadioButton\").instance(0)", "click")
find_element_and_act(AppiumBy.ACCESSIBILITY_ID, "Submit Vote", "click")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.view.View\").instance(26)", "click")
find_element_and_act(AppiumBy.ACCESSIBILITY_ID, "Submit Vote", "click")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.view.View\").instance(29)", "click")
find_element_and_act(AppiumBy.CLASS_NAME, "android.widget.EditText", "click")
find_element_and_act(AppiumBy.CLASS_NAME, "android.widget.EditText", "send_keys", "comment1")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.widget.Button\").instance(7)", "click")
find_element_and_act(AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.widget.Button\").instance(0)", "click")