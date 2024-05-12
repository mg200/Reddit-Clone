"""
block a user from settings and see what happens to the chat with that user
result: the user is blocked but you can still chat to him
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

el15 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el15.click()
el16 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
el16.click()
el17 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Account settings for u/jimmyy")
el17.click()
el18 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Manage blocked accounts")
el18.click()
el19 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
el19.click()
el20 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el20.click()
el20.send_keys(username)
el21 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(3)")
el21.click()
el22 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
el22.click()
el23 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el23.click()
el24 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Manage blocked accounts")
el24.click()
el25 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el25.click()
el26 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el26.click()
el27 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el27.click()
el28 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Chat\nTab 4 of 5")
el28.click()
el29 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="HassanHatem1\njimmyy: hi\n01:17")
el29.click()
el30 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el30.click()
el30.send_keys(msg)
el31 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(3)")
el31.click()
