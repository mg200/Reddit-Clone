import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *
"""
the test itself is NOT responsible for the the fact that the remaining posts of the user do not disappear from the 
feed
"""

el16 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(13)")
el16.click()
el17 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Block account")
el17.click()
el18 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el18.click()
el19 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
el19.click()
el20 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Account settings for u/jimmyy")
el20.click()
el21 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Manage blocked accounts")
el21.click()
el22 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Unblock")
el22.click()
