
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

friendUsername="HassanHatem1"
messageContent="Hello Hassan"

def assert_element(element, message):
    sleep(0.5)
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element


el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Chat\nTab 4 of 5")
el3.click()
assert_element(el3, "Failed to find 'Chat'")
el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el4.click()
assert_element(el4, "Failed to find 'New Chat'")
el5 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el5.click()
assert_element(el5, "Failed to find 'Search bar'")
el5.send_keys(friendUsername)
sleep(0.5)
el6 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.CheckBox")
el6.click()
assert_element(el6, "Failed to find 'Checkbox'")
el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Start Chat")
el7.click()
assert_element(el7, "Failed to find 'Start Chat'")
el8 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el8.click()
assert_element(el8, "Failed to find 'Message bar'")

# el9 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
# el9.click()
# assert_element(el9, "Failed to find 'Emoji'")
# el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Tab 2 of 9")
# el10.click()
# assert_element(el10, "Failed to find 'Emoji Tab'")
# el11 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="😇")
# el11.send_keys(messageContent)

# el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Scrim")
# el12.click()
el13 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el13.send_keys(messageContent)
el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(3)")
el14.send_keys(messageContent)
el14.click()
assert_element(el14, "Failed to find 'Send'")
