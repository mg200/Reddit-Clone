
# import Identifiers
#import everything from Identifiers.py
from Identifiers import *
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
 #from Identifiers import Identifiers
url="http://localhost:4723"
driver=webdriver.Remote(url,options=AppiumOptions().load_capabilities(desired_caps))
driver.implicitly_wait(10)

#gloabl variables
mariam_name="mariam"
mariam_pass="newpass12345"

jimmy_name="jimmy"
jimmy_pass="pass1234"

def login(name: str="mariam", password: str="pass1234"): #tested, CORRECT
    #el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
    wait=WebDriverWait(driver, 10)
    el1=wait.until(EC.presence_of_element_located((AppiumBy.ACCESSIBILITY_ID, "Already a redditor? Log in")))
    el1.click()
    sleep(2)
    
    #email_field=driver.find_element(AppiumBy.XPATH, value=xpath_login_email_box)
    #replace with wait
    email_field=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, xpath_login_email_box)))
    email_field.click()
    sleep(2)
    email_field.send_keys(name)
    driver.hide_keyboard()
    sleep(2)
    
    password_field=driver.find_element(AppiumBy.XPATH, value=xpath_password_box)
    password_field.click()
    sleep(2)
    password_field.send_keys(password)
    sleep(2)
    driver.hide_keyboard()
    sleep(3)
    continue_button=driver.find_element(AppiumBy.XPATH, value=xpath_login_continue)
    continue_button.click()
    sleep(2)



def UpvoteDownvote():
    # el1 = driver.find_element(by=AppiumBy.XPATH, value=xpath_upvote_34_post)
    # el1.click()
    # sleep(2)
    
    el2 = driver.find_element(by=AppiumBy.XPATH, value=xpath_upvote_34_post)
    el2.click()
    sleep(1)
    
    el3 = driver.find_element(by=AppiumBy.XPATH, value=xpath_downvote_1_post)
    el3.click()
    sleep(1)
    
    el4 = driver.find_element(by=AppiumBy.XPATH, value=xpath_34_1_post_settings)
    el4.click()
    sleep(1)




def logout(): #from homepage, profile_tab, tested, CORRECT
    profile_tab=driver.find_element(AppiumBy.XPATH, value=xpath_to_profile_tab)
    profile_tab.click()
    sleep(2)
    
    logout=driver.find_element(AppiumBy.XPATH, value=logout_in_list_xpath)
    logout.click()
    sleep(1)

def LoginandOut(): #tested, CORRECT
    login()
    sleep(2)
    logout()
    


def clickProfileTabHome(): #called from Home
    profile_tab=driver.find_element(AppiumBy.XPATH, value=xpath_to_profile_tab)
    profile_tab.click()
    sleep(1)

def goToSettings(): #called from Home
    # login()
    clickProfileTabHome()
    settings=driver.find_element(AppiumBy.XPATH, value=settings_xpath)
    settings.click()
    sleep(1)
    
    
def goToNavigation():
    naviation_menu=driver.find_element(AppiumBy.XPATH, value=navigation_menu_xpath)
    naviation_menu.click()
    sleep(1)
    
    my_favorites=driver.find_element(AppiumBy.XPATH, value=my_favorites_xpath)
    my_favorites.click()
    sleep(1)
    my_favorites.click()
    sleep(1)
    
    following=driver.find_element(AppiumBy.XPATH, value=following_xpath)
    following.click()
    sleep(1)
    eliot_click=driver.find_element(AppiumBy.XPATH, value=Eliot_himself_xpath)
    sleep(1)
    eliot_star=driver.find_element(AppiumBy.XPATH,value=Eliot_star_unstar_xpath)
    eliot_star.click()
    sleep(2)
    eliot_star.click()
    sleep(1)
    
    # return_home=driver.find_element(AppiumBy.XPATH, value=return_to_home_xpath)
    # return_home.click()
    # sleep(1)
    

def goToAccountSettings():
    goToSettings()
    account_settings=driver.find_element(AppiumBy.XPATH, value=account_settings_for_mariam_xpath)
    account_settings.click()
    sleep(1)
    
def changeCountry(): #country is inside account settings
    goToAccountSettings()

    
def updateEmailAddress():
    update_email_address=driver.find_element(AppiumBy.XPATH, value=update_email_address_xpath)
    update_email_address.click()
    sleep(2)
    update_email_address_textbox=driver.find_element(AppiumBy.XPATH, value=update_email_address_textbox_xpath)
    update_email_address_textbox.click()
#    update_email_address_textbox.send_keys("     


def changePassword():
    changePass=driver.find_element(AppiumBy.XPATH, value=change_password_xpath)
    changePass.click()
    sleep(1)
    changePasswordcurPass=driver.find_element(AppiumBy.XPATH, value=change_password_current_password_xpath)
    changePasswordcurPass.click()
    sleep(1)
    changePasswordcurPass.send_keys("pass1234")
    driver.hide_keyboard()
    sleep(2)
    changePasswordNewPass=driver.find_element(AppiumBy.XPATH, value=change_password_new_password_xpath)
    changePasswordNewPass.click()
    sleep(1)
    changePasswordNewPass.send_keys("newpass1234")
    # if keyboard is open, hide it
    driver.hide_keyboard()
    sleep(2)
    changePasswordConfirmNewPass=driver.find_element(AppiumBy.XPATH, value=change_password_confirm_new_password_xpath)
    changePasswordConfirmNewPass.click()
    sleep(1)
    changePasswordConfirmNewPass.send_keys("newpass1234")
    driver.hide_keyboard()
    sleep(1)
    changePasswordSave=driver.find_element(AppiumBy.XPATH, value=change_password_save_xpath)
    changePasswordSave.click()
    sleep(1)
#changePassword()
