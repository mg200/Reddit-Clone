
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

title="enter title here"
content="enter content here"

def assert_element(element, message):
    sleep(0.5)
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element

el20 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create\nTab 3 of 5")
el20.click()
assert_element(el20, "Failed to find 'Create'")
el21 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
el21.click()
el21.send_keys(title)
assert_element(el21, "Failed to send keys to 'Title'")
el22 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el22.click()
el22.send_keys(content)
assert_element(el22, "Failed to send keys to 'Content'")
el23 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el23.click()
assert_element(el23, "Failed to find 'Add Image'")
el24 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().resourceId(\"com.google.android.providers.media.module:id/icon_thumbnail\").instance(3)")
el24.click()
assert_element(el24, "Failed to find 'Image'")
el25 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Next")
el25.click()
assert_element(el25, "Failed to find 'Next'")
el26 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="firstcommunity")
el26.click()
assert_element(el26, "Failed to find 'firstcommunity'")
el27 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Add Tags")
el27.click()
assert_element(el27, "Failed to find 'Add Tags'")
el28 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Switch\").instance(0)")
el28.click()
assert_element(el28, "Failed to find 'Switch'")
el29 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Scrim")
el29.click()
assert_element(el29, "Failed to find 'Scrim'")
el30 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
el30.click()
assert_element(el30, "Failed to find 'Post'")
