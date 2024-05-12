
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *


el21 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().description(\"r/Flutter Community\").instance(0)")
el21.click()
assert_element(el21, "r/Flutter Community not found")
el22 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="New Posts")
el22.click()
assert_element(el22, "New Posts not found")
el23 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Top Posts")
el23.click()
assert_element(el23, "Top Posts not found")
el24 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Top Posts")
el24.click()
assert_element(el24, "Top Posts not found")
el25 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Hot Posts")
el25.click()
assert_element(el25, "Hot Posts not found")