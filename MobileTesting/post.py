from main import *
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as E
post_name="insert post name" # change this to the name of the post you want to create
post_body="insert the body of your post" # change this to the body of the post you want to create
    
def post():
    el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create\nTab 3 of 5")
    el1.click()
    sleep(2)
    el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    el2.click()
    sleep(2)
    el2.send_keys(post_name)
    sleep(2)
    el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    el3.click()
    sleep(2)
    el3.send_keys(post_body)
    sleep(2)
    el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Next")
    el4.click()
    sleep(2)
    el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="firstcommunity")
    el5.click()
    sleep(2)
    el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
    el6.click() 
    sleep(2)
    
    
post()