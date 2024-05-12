import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().description(\"u/Super Mario\").instance(0)")
el1.click()
assert_element(el1, "Failed to find 'u/Super Mario'")
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Follow")
el2.click()
assert_element(el2, "Failed to find 'Follow'")
el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Unfollow")
el3.click()
assert_element(el3, "Failed to find 'Unfollow'")
