
import sys 
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *


def find_and_click(driver, by, value):
    element = driver.find_element(by=by, value=value)
    element.click()
    return element

def find_and_send_keys(driver, by, value, keys):
    element = driver.find_element(by=by, value=value)
    element.send_keys(keys)
    return element

el5 = find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Inbox\nTab 5 of 5")
assert el5 is not None
el6 = find_and_click(driver, AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().description(\"check out this post in r/testingSquad by u/hussein\n \").instance(0)")
assert el6 is not None
# el6.click()
el7 = find_and_click(driver, AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().description(\"check out this post in r/testingSquad by u/hussein\n \").instance(1)")
assert el7 is not None
el8 = find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Messages\nTab 2 of 2")
assert el8 is not None
