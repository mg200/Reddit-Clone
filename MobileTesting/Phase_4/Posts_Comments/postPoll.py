
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *
"""
create a poll and vote on it 
result: success, the poll was created and voted on successfully
"""
option1="chicken"
option2="meat"
title="title here"
body="body here"
el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create\nTab 3 of 5")
el1.click()
assert_element(el1, "Failed to find 'Create'")
el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
el2.click()
sleep(0.5)
el2.send_keys(body)
assert_element(el2, "Failed to send keys to 'Title'")
el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el3.click()
assert_element(el3, "Failed to find 'Body'")
el3.send_keys(body)
el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(5)")
el4.click()
assert_element(el4, "Failed to find 'Add Poll'")
el5 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el5.click()
sleep(0.5)
el5.send_keys(option1)
assert_element(el5, "Failed to send keys to 'Option 1'")
el6 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(2)")
el6.click()
sleep(0.5)
el6.send_keys(option2)
assert_element(el6, "Failed to find 'Option 2'")
el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"body here\")")
el7.click()
assert_element(el7, "Failed to find 'body here'")
el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Next")
el8.click()
assert_element(el8, "Failed to find 'Next'")
el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Testing Community")
el9.click()
assert_element(el9, "Failed to find 'Testing Community'")
el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
el10.click()
assert_element(el10, "Failed to find 'Post'")
el11 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.RadioButton\").instance(1)")
el11.click()
assert_element(el11, "Failed to find 'Option 1'")
el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Submit Vote")
el12.click()
assert_element(el12, "Failed to find 'Submit Vote'")
