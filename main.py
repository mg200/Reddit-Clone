
import Identifiers
#import everything from Identifiers.py
from Identifiers import *

url="http://localhost:4723"
driver=webdriver.Remote(url,options=AppiumOptions().load_capabilities(desired_caps))
driver.implicitly_wait(10)


def login():
    el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
    el1.click()
    sleep(3)
    
    email_field=driver.find_element(AppiumBy.XPATH, value=Identifiers.xpath_login_email_box)
    email_field.click()
    sleep(3)
    email_field.send_keys("mariam")
    driver.hide_keyboard()
    sleep(3)
    
    password_field=driver.find_element(AppiumBy.XPATH, value=Identifiers.xpath_password_box)
    password_field.click()
    sleep(3)
    password_field.send_keys("pass1234")
    sleep(3)
    driver.hide_keyboard()
    sleep(2)
    
    continue_button=driver.find_element(AppiumBy.XPATH, value=Identifiers.xpath_login_continue)
    continue_button.click()
    sleep(3)

login()

    
# def recorded_login():
    # el1 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    # el1.send_keys("mariam")
    # el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    # el2.send_keys("pass1234")
    # el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Conitnue")
    # el3.send_keys("")    
    # el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
    # el1.send_keys("")
    # sleep(3)
    # # el1.send_keys("")
    # # el1.send_keys("")
    # el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    # el2.send_keys("mariam")
    # sleep(3)
    # # el2.send_keys("mariam")
    # # el2.send_keys("mariam")
    # el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    # el3.send_keys("pass1234")
    # sleep(3)
    # el4=driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Conitnue")
    # #press the continue button
    # el4.click()
    # sleep(6)
# recorded_login()




