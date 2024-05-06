# login and logout and repeat with different users
from main import *
def LoginandOut2():
    el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
    el1.click()
    sleep(2)
    
    email_field=driver.find_element(AppiumBy.XPATH, value=xpath_login_email_box)
    email_field.click()
    sleep(2)
    email_field.send_keys(mariam_name)
    driver.hide_keyboard()
    sleep(2)
    
    password_field=driver.find_element(AppiumBy.XPATH, value=xpath_password_box)
    password_field.click()
    sleep(1)
    password_field.send_keys(mariam_pass)
    sleep(1)
    driver.hide_keyboard()
    sleep(1)
    
    continue_button=driver.find_element(AppiumBy.XPATH, value=xpath_login_continue)
    continue_button.click()
    sleep(1)
    
    profile_tab=driver.find_element(AppiumBy.XPATH, value=xpath_to_profile_tab)
    profile_tab.click()
    sleep(1)
    
    logout=driver.find_element(AppiumBy.XPATH, value=logout_in_list_xpath)
    logout.click()
    sleep(1)
    
    login()
    sleep(2)
    logout()
    sleep(2)
    login(jimmy_name, jimmy_pass)

LoginandOut2()
    