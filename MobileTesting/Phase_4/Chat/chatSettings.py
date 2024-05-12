import sys 
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *


el42 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Chat\nTab 4 of 5")
el42.click()
assert_element(el42, "Failed to find 'Chat' option")
el43 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="HassanHatem1\njimmyy: hi\n01:17")
el43.click()
assert_element(el43,"Failed to find chat room")
el44 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
el44.click()
assert_element(el44, "Failed to find 'Chat settings'")
el45 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
el45.click()
assert_element(el45, "Failed to find 'Hide Chat' option")
sleep(1)
el45.click()
assert_element(el45, "Failed to find 'Hide Chat' option")
el46 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Hide Chat")
el46.click()
assert_element(el46, "Failed to find 'Hide Chat' option")
