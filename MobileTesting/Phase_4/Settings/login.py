import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

username="jimmyy"
password="pass12345"

el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
el1.click()
sleep(1)
el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
el2.click()
sleep(1)
el2.send_keys(username)
el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el4.click()
sleep(1)
el4.send_keys(password)
# try:
sleep(1)
el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Continue")
el5.click()
# except NoSuchElementException:
    # print("Element with AppiumBy.ACCESSIBILITY_ID = Continue not found");


# import sys
# sys.path.append('../Phase_4')
# from main import *

# username="jimmyy"
# password="pass12345"
# def find_and_click(driver, by, value):
#     try:
#         element = driver.find_element(by=by, value=value)
#         element.click()
#         time.sleep(1)
#     except NoSuchElementException:
#         print(f"Element with {by} = {value} not found")

# def find_and_type(driver, by, value, text):
#     try:
#         element = driver.find_element(by=by, value=value)
#         element.click()
#         element.send_keys(text)
#         time.sleep(1)
#     except NoSuchElementException:
#         print(f"Element with {by} = {value} not found")

# find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Already a redditor? Log in")
# find_and_type(driver, AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.widget.EditText\").instance(0)", username)
# find_and_type(driver, AppiumBy.ANDROID_UIAUTOMATOR, "new UiSelector().className(\"android.widget.EditText\").instance(1)", password)
# find_and_click(driver, AppiumBy.ACCESSIBILITY_ID, "Continue")
