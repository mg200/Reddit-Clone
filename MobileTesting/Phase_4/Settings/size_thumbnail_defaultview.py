import sys
import time
from main import *

sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')

el23 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el23.click()
time.sleep(1)

el24 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
el24.click()
time.sleep(1)

el25 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Default View\ncard")
el25.click()
time.sleep(1)

el25.click()
time.sleep(1)

el26 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Thumbnails\nCommunity default")
el26.click()
time.sleep(1)

el26.click()
time.sleep(1)

el27 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Thumbnails\nCommunity default")
el27.click()
time.sleep(1)

el28 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Increase text size")
el28.click()
time.sleep(1)

el29 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
el29.click()
time.sleep(1)

el30 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="54%")
el30.click()
time.sleep(1)

el31 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
el31.click()
time.sleep(1)

el32 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el32.click()
time.sleep(1)

el33 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el33.click()
time.sleep(1)
