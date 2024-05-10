#Description:
# mute Videos by default

# sort feed by category
from main import *


category="New" # "Top", "Controversial", "Hot", "Rising", "New"
el5 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el5.click()
el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
el6.click()
el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Switch\").instance(0)")
el7.click()
el8 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Switch\").instance(1)")
el8.click()
el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Default comment sort\nBest")
el9.click()
el10 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value=category)
el10.click()
el11 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
el11.click()
