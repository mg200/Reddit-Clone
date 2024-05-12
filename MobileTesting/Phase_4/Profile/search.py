import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *
searchWord="h"
def assert_element(element, message):
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element

el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el1.click()
try:
    assert el1 is not None, "Failed to find 'Profile'"
except AssertionError as e:
    print(e)
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="My profile")
el2.click()
try:
    assert el2 is not None, "Failed to find 'My profile'"
except AssertionError as e:
    print(e)
el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el3.click()
sleep(0.5)
try:
    assert el3 is not None, "Failed to find 'Search'"
except AssertionError as e:
    print(e)
el4 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el4.click()
sleep(0.5)
try:
    assert el4 is not None, "Failed to find 'Search bar'"
except AssertionError as e:
    print(e)
el4.send_keys(searchWord)
assert_element(el4, "Failed to send keys to 'Search bar'")