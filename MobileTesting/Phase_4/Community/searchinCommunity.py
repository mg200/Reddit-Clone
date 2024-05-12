import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

searchkey="h"
el16 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().description(\"r/Flutter Community\").instance(0)")
el16.click()
el17 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
el17.click()
el18 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el18.click()
el18.send_keys(searchkey)
el19 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Best of r/Flutter Community")
el19.click()
el20 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="New in r/Flutter Community")
el20.click()
