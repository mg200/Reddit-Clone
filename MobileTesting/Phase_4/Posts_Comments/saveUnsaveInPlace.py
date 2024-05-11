import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

el12 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(25)")
el12.click()
el13 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Save")
el13.click()
el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(25)")
el14.click()
el15 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Unsave")
el15.click()
