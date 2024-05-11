import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *
el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el1.click()
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="History")
el2.click()
el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Clear History")
el3.click()
el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el4.click()
