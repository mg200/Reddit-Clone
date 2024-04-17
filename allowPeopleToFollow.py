from main import *
#very important
#LOGGED IN as Mariam

#a function to allow people to follow you and logs out afterwards
def test_allow_people_to_follow():
    el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
    el1.click()
    sleep(1)
    el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
    el2.click()
    sleep(2)
    el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Account settings for u/mariam")
    el3.click()
    sleep(1)
    el4 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
    el4.click()
    sleep(2)
    el4.click()
    sleep(2)
    el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
    el5.click()
    sleep(2)
    el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
    el6.click()
    sleep(1)
    # el7 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(3)")
    # el7.click()
    # el8 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Switch\").instance(0)")
    # el8.click()
    # logout()
    el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Logout")
    el9.click()
test_allow_people_to_follow()
