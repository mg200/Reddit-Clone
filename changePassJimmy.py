from main import *
import time

# oldpass = jimmy_pass_new
# newpass = jimmy_pass

newpass = jimmy_pass_new
oldpass = jimmy_pass

def ChangePassJimmy():
    el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
    el1.click()
    sleep(2)  
    
    el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    el2.click()
    el2.send_keys("jimmyy")
    sleep(2)  
    
    el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(7)")
    el3.click()
    sleep(2)  
    
    el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    el4.click()
    el4.send_keys(oldpass)
    sleep(2)  
    
    el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Conitnue")
    el5.click()
    sleep(2)  
    
    el5.click()
    sleep(2)  
    
    el6 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
    el6.click()
    sleep(2)  
    
    el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Settings")
    el7.click()
    sleep(2)  
    
    el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Account settings for u/jimmyy")
    el8.click()
    sleep(2)  
    
    el9 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Change password")
    el9.click()
    sleep(2)  
    
    el10 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    el10.click()
    el10.send_keys(oldpass)
    sleep(2)  
    
    el11 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
    el11.click()
    sleep(2)  
    
    el12 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    el12.click()
    el12.send_keys(newpass)
    sleep(2)  
    
    el13 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(2)")
    el13.click()
    el13.send_keys(newpass)
    sleep(2)  
    
    el14 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(4)")
    el14.click()
    sleep(2)  
    
    el15 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(2)")
    el15.click()
    sleep(2)  
    
    el16 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Save")
    el16.click()
    sleep(2)  
    
    
    el17 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
    el17.click()
    sleep(2)  
    
    el18 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    el18.click()
    el18.send_keys("jimmyy")
    sleep(2)  
    
    el19 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(7)")
    el19.click()
    sleep(2)  
    
    el20 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    el20.click()
    el20.send_keys(newpass)
    sleep(2)
    
    el21 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Conitnue")
    el21.click()
    sleep(2)  
    
    el21.click()
    sleep(2)  
    

ChangePassJimmy()