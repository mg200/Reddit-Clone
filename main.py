
# import Identifiers
#import everything from Identifiers.py
from Identifiers import *
# from Identifiers import Identifiers
url="http://localhost:4723"
driver=webdriver.Remote(url,options=AppiumOptions().load_capabilities(desired_caps))
driver.implicitly_wait(10)


def login():
    el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
    el1.click()
    sleep(3)
    
    email_field=driver.find_element(AppiumBy.XPATH, value=xpath_login_email_box)
    email_field.click()
    sleep(3)
    email_field.send_keys("mariam")
    driver.hide_keyboard()
    sleep(3)
    
    password_field=driver.find_element(AppiumBy.XPATH, value=xpath_password_box)
    password_field.click()
    sleep(3)
    password_field.send_keys("pass1234")
    sleep(3)
    driver.hide_keyboard()
    sleep(2)
    
    continue_button=driver.find_element(AppiumBy.XPATH, value=xpath_login_continue)
    continue_button.click()
    sleep(3)

login()

    
# def recorded_login():
#     el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
#     el1.click()
#     el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
#     el2.send_keys("mariam")
#     sleep(3)
#     el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
#     el3.send_keys("pass1234")
#     el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Conitnue")
#     # el4.click()
#     el4.click()
#     sleep(3)
#     # el4.send_keys("")
#     el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Conitnue")
#     el5.click()
# # el5.clear()
# recorded_login()




