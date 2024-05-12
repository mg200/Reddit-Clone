import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

def assert_element(element, message):
    sleep(0.5)
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element


el10 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el10.click()
assert_element(el10, "Failed to find 'Profile'")
el11 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="My profile")
el11.click()
assert_element(el11, "Failed to find 'My profile'")
# post to delete, check the instance
el12 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(32)")
el12.click()
assert_element(el12, "Failed to find 'Post'")
el13 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Delete post")
el13.click()
assert_element(el13, "Failed to find 'Delete post'")
el14 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Delete")
el14.click()
assert_element(el14, "Failed to find 'Delete'")
