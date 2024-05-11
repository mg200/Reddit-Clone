
"""
Test Scenario: profile_view

This test verifies the functionalities inside the profile view, the user can view the comments and the about section of the profile.

Author: Mohamed Gamal
Date: Mai 11, 2024
"""
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *
description="This is my profile description."

el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el1.click()
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="My profile")
el2.click()
el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Comments\nTab 2 of 3")
el3.click()
el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="About\nTab 3 of 3")
el4.click()
el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Edit")
el5.click()
el6 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el6.click()
el6.send_keys(description)
el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Save")
el7.click()
el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el8.click()
