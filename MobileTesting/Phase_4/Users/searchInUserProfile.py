import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *


"""
test case: search in user profile
result: failed, the search is not working
"""
el13 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().description(\"u/Super Mario\").instance(0)")
el13.click()
assert_element(el13, "Failed to find 'u/Super Mario'")
el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
el14.click()
assert_element(el14, "Failed to find 'Search'")
el15 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
el15.click()
assert_element(el15, "Failed to find 'Search'")
