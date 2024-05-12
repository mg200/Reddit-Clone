"""
unblock a user from settings and see what happens to the chat with that user
result: 
"""

import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

username = "HassanHatem1"
msg="hi"
def assert_element(element, message):
    sleep(0.5)
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element

el32 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el32.click()
assert_element(el32,"Failed to find 'Profile'")
el33 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
el33.click()
assert_element(el33,"Failed to find 'Settings'")
el34 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Account settings for u/jimmyy")
el34.click()
assert_element(el34,"Failed to find 'Account settings for u/jimmyy'")
el35 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Manage blocked accounts")
el35.click()
assert_element(el35,"Failed to find Manage blocked accounts")
el36 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Unblock")
el36.click()
assert_element(el36, "Failed to find 'Unblock'")
el37 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el37.click()
assert_element(el37, "Failed to find 'Back'")
el38 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el38.click()
assert_element(el38, "Failed to find 'Back'")
el39 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el39.click()
assert_element(el39, "Failed to find 'Back'")
el40 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Chat\nTab 4 of 5")
el40.click()
assert_element(el40, "Failed to find 'Chat'")
# edit the message content accordingly
el41 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="HassanHatem1\njimmyy: hi\n01:17")
el41.click()
assert_element(el41, "Failed to find 'HassanHatem1'")
