from main import *

el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
el1.click()
el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
el2.click()
el2.send_keys("jimmyy")
el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el4.click()
el4.send_keys("pass12345")
try:
    el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Continue")
    el5.click()
except NoSuchElementException:
    print("Element with AppiumBy.ACCESSIBILITY_ID = Continue not found");
