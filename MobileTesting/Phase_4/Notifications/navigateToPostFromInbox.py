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

el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Inbox\nTab 5 of 5")
el1.click()
assert_element(el1, "Failed to find 'Inbox'")
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="u/AlHussein\ncommented on your post")
el2.click()
assert_element(el2, "Failed to find 'u/AlHussein'")
el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.ImageView\").instance(2)")
el3.click()
assert_element(el3, "Failed to find 'Post'")
