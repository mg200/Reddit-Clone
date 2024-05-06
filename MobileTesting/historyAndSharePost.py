from main import *

#this shares a post in a community called 'firstcommunity'
# this scenario should be customzied for use in phase 4
def historyandsharepost():
    el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
    el14.click()
    sleep(2)
    el15 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="History")
    el15.click()
    sleep(2)
    el16 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().description(\"Share\").instance(0)")
    el16.click()
    sleep(2)
    el17 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Button")
    el17.click()
    sleep(2)
    el18 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="firstcommunity")
    el18.click()
    sleep(2)
    el19 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
    el19.click()
    sleep(2)
    el20 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(3)")
    el20.click()
    # el21 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(0)")
    # el21.click()
historyandsharepost()