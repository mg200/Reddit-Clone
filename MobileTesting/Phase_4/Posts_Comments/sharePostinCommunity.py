# Description:
# This test is to share a post in a community and comment on the shared post.
shared_post_title="it's my post hello!"
shared_post_comment="commenting on the shared post"
from main import *
el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(6)")
el1.click()
el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(0)")
el2.click()
el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Testing Community")
el3.click()
el4 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el4.click()
el4.send_keys(shared_post_title)
el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
el5.click()
el6 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el6.click()
el6.send_keys(shared_post_comment)
el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(7)")
el7.click()
el8 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(0)")
el8.click()
el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Open navigation menu")
el9.click()
el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Your Communities")
el10.click()
el11 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Testing Community")
el11.click()
el12 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(23)")
el12.click()
el13 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(0)")
el13.click()
