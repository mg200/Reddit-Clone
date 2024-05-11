import sys 
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

community_name="sci-fic"


def find_and_click(driver, by, value):
    element = driver.find_element(by=by, value=value)
    element.click()
    return element

def find_and_send_keys(driver, by, value, keys):
    element = driver.find_element(by=by, value=value)
    element.send_keys(keys)
    return element

def create_community(driver, community_name):
    el14 = find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Your Communities")
    assert el14 is not None, "Failed to find 'Your Communities'"

    el15 = find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Create a community")
    assert el15 is not None, "Failed to find 'Create a community'"

    el16 = find_and_click(driver, AppiumBy.CLASS_NAME, "android.widget.EditText")
    assert el16 is not None, "Failed to find EditText"

    el17 = find_and_send_keys(driver, AppiumBy.CLASS_NAME, "android.widget.EditText", community_name)
    assert el17 is not None, "Failed to find EditText or send keys"

    el18 = find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Public")
    assert el18 is not None, "Failed to find 'Public'"

    el20 = find_and_click(driver, AppiumBy.CLASS_NAME, "android.widget.Switch")
    assert el20 is not None, "Failed to find Switch"

    el21 = find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Create Community")
    assert el21 is not None, "Failed to find 'Create Community'"

create_community(driver, community_name)