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
