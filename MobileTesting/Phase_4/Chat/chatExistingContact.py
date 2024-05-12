
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

friendUsername="HassanHatem1"
messageContent="new message to Hassan"

def assert_element(element, message):
    sleep(0.5)
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element


el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Chat\nTab 4 of 5")
el6.click()
assert_element(el6, "Failed to find 'Chat'")
el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="HassanHatem1\njimmyy: Hello Hassan\n18:14")
el7.click()
assert_element(el7, "Failed to find 'HassanHatem1'")
el8 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el8.click()
assert_element(el8, "Failed to find 'Message box'")
el8.send_keys(messageContent)
assert_element(el8, "Failed to send keys to 'Message box'")
el9 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(3)")
el9.click()
assert_element(el9, "Failed to find 'Send'")
el10 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el10.click()
assert_element(el10, "Failed to find 'Back'")
