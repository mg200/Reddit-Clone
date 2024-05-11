#description: This file contains the code to create a community in the app. The code is generated using Appium Recorder and then modified to be used in the test suite.
# The test does the following:
# creates a community, name, access type, age-restricted or not
# views it in the communities and stars it

from main import *
communityName="JewWatch"
accessType="Private" # or Private or Restricted

el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el1.click()
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create a community")
el2.click()
el3 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.EditText")
el3.click()
el3.send_keys(communityName)
el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Public")
el4.click()
el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=accessType)
el5.click()
el6 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
el6.click()
el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create Community")
el7.click()
el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el8.click()
el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Open navigation menu")
el9.click()
el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Your Communities")
el10.click()
el11 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(6)")
el11.click()
el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Your Communities")
el12.click()
el13 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(3)")
el13.click()
