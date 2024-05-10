# from main import *
# el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(19)")
# el1.send_keys("")
# el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(20)")
# el2.send_keys("")
# el2.send_keys("")
# el2.click()
# el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(19)")
# el3.click()
# el3.click()
# el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(22)")
# el4.click()
# el5 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
# el5.click()
# el5.send_keys("insert comment here")
# el5.click()
# el6 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(0)")
# el6.click()
# el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.RadioButton\").instance(0)")
# el7.click()

# try:
#     el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Submit Vote")
#     el8.click()
# except NoSuchElementException:
#     print("Element not found")
# el9 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(26)")
# el9.click()
# el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Submit Vote")
# el10.click()
# el11 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(29)")
# el11.click()
# el12 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
# el12.click()
# el12.send_keys("comment1")
# el12.click()
# el13 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(7)")
# el13.click()
# el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(0)")
# el14.click()



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