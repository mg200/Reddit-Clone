import time
from main import *

def changeCountry():
    el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
    el1.click()
    sleep(1.5)
    
    el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
    el2.click()
    sleep(1.5)
    
    el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Account settings for u/mariam")
    el3.click()
    sleep(1.5)
    
    el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Country\nAlbania (AL) [+355]")
    # el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="🇦🇱\nAlbania")
    el4.click()
    sleep(1.5)
    # United States (US) [+1]
    # instead of Albania make it the country just before Albania in the list
    # US
    el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="🇺🇸\nUnited States")
    el5.click()
    sleep(1.5)
    
    el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Gender\nman")
    el6.click()
    sleep(1.5)
    
    # el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Manage notifications")
    # el7.click()
    # sleep(1.5)
    
    # el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="ACTIVITY")
    # el8.click()
    # sleep(1.5)
    
    # el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
    # el9.click()
    # sleep(1.5)
    
    # el10 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
    # el10.click()
    # sleep(1.5)
    
    # el11 = driver.find_element(by=AppiumBy.CLASS_NAME, value="android.widget.Switch")
    # el11.click()
    # sleep(1.5)
    
    el12 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
    el12.click()
    sleep(1.5)
    
    el13 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Back")
    el13.click()
    sleep(1.5)
    
    el14 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Home\nTab 1 of 5")
    el14.click()
    sleep(1.5)

changeCountry()