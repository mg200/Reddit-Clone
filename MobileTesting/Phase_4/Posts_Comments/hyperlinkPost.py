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

communityName="Flutter Community"
title="hyperlink_post_title"
body="hyperlink_post_body"
hyperlink="https://www.threadit.tech/"

el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create\nTab 3 of 5")
el4.click()
assert_element(el4, "Failed to find 'Create'")
el5 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
el5.click()
assert_element(el5, "Failed to find 'Title'")
el5.send_keys(title)
el6 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el6.click()
assert_element(el6, "Failed to find 'Body'")
el6.send_keys(body)
el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el7.click()
assert_element(el7, "Failed to find 'Add Link'")
el8 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el8.click()
el8.send_keys(hyperlink)
assert_element(el8, "Failed to find 'Link'")
el9 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el9.click()
assert_element(el9, "Failed to find 'Done'")
el10 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el10.click()
assert_element(el10, "Failed to find 'Add Tags'")
# el11 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().text(\"https://www.threadit.tech/\")")
# el11.clear()
el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Next")
el12.click()
assert_element(el12, "Failed to find 'Next'")
el13 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=communityName)
el13.click()
assert_element(el13, "Failed to find 'Flutter Community'")
el14 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
el14.click()
assert_element(el14, "Failed to find 'Post'")