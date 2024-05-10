from main import * 

el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
el4.click()
el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
el5.click()
el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Account settings for u/jimmyy")
el6.click()
el7 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
el7.click()
