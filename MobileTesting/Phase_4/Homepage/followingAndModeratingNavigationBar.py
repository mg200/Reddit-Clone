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

el15 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Open navigation menu")
el15.click()
assert_element(el15, "Failed to find 'Open navigation menu'")
el16 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Favourites")
el16.click()
assert_element(el16, "Failed to find 'Favourites'")
el17 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el17.click()
assert_element(el17, "Failed to find 'Following'")
el18 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Moderating")
el18.click()
assert_element(el18, "Failed to find 'Moderating'")
el19 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(6)")
el19.click()
assert_element(el19, "Failed to find 'Moderating'")
