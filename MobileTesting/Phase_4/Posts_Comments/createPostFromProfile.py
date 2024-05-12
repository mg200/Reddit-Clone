
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


title="Title of my post3"
body="the body of the post3"
comment="comment on my spoiler post3"
el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el1.click()
assert_element(el1, "Failed to find 'Profile'")
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="My profile")
el2.click()
assert_element(el2, "Failed to find 'My profile'")
el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
el4.click()
assert_element(el4, "Failed to find 'Create post'")
el5 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
el5.click()
assert_element(el5, "Failed to find 'Title'")
el5.click()
assert_element(el5, "Failed to find 'Title'")
el5.send_keys(title)
assert_element(el5, "Failed to send keys to 'Title'")
el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Add Tags")
el6.click()
el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Switch\").instance(1)")
el7.click()
assert_element(el7, "Failed to find 'Switch'")
el8 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Switch\").instance(0)")
el8.click()
assert_element(el8, "Failed to find 'Switch'")
el9 = driver.find_element(by=AppiumBy.ID, value="android:id/navigationBarBackground")
el9.click()
assert_element(el9, "Failed to find 'android:id/navigationBarBackground'")
el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Scrim")
el10.click()
assert_element(el10, "Failed to find 'Scrim'")
el11 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el11.click()
sleep(0.5)
el11.send_keys(body)
assert_element(el11, "Failed to send keys to 'Body'")
el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
el12.click()
assert_element(el12, "Failed to find 'Post'")
el13 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el13.click()
el13.send_keys(comment)
assert_element(el13, "Failed to find 'Comment box'")
el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(7)")
el14.click()
assert_element(el14, "Failed to find 'Send'")
