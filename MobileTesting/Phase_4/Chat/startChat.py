
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *

friendUsername="HassanHatem1"
messageContent="Hello Hassan"
el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Chat\nTab 4 of 5")
el3.click()
el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el4.click()
el5 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el5.click()
el5.send_keys(friendUsername)
el6 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.CheckBox")
el6.click()
el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Start Chat")
el7.click()
el8 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el8.click()
el9 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
el9.click()
el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Tab 2 of 9")
el10.click()
el11 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="😇")
el11.send_keys(messageContent)
el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Scrim")
el12.click()
el13 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el13.send_keys(messageContent)
el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(3)")
el14.send_keys(messageContent)
el14.click()
