
# import Identifiers
#import everything from Identifiers.py
from Identifiers import *
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
#from Identifiers import Identifiers
url="http://localhost:4723"
driver=webdriver.Remote(url,options=AppiumOptions().load_capabilities(desired_caps))
driver.implicitly_wait(20)

#gloabl variables
mariam_name="mariam"
mariam_pass="pass1234"
mariam_pass_new="pass12345"

jimmy_name="jimmyy"
jimmy_pass="pass1234"
jimmy_pass_new="pass12345"


# assert function
def assert_element(element, message):
    sleep(0.5)
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element


# def login(name: str, password: str): #tested, CORRECT
#     # el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
#     wait=WebDriverWait(driver, 10)
#     el1 = wait.until(EC.presence_of_element_located((AppiumBy.ACCESSIBILITY_ID, "Already a redditor? Log in")))
#     # el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Already a redditor? Log in")
#     el1.click()
#     sleep(1)

#     email_field = wait.until(EC.presence_of_element_located((AppiumBy.XPATH, xpath_login_email_box)))
#     # email_field = driver.find_element(by=AppiumBy.XPATH, value=xpath_login_email_box)
#     email_field.click()
#     sleep(1)
#     email_field.send_keys(name)
#     # driver.hide_keyboard()
#     sleep(1)

#     password_field = wait.until(EC.presence_of_element_located((AppiumBy.XPATH, xpath_password_box)))
#     # password_field = driver.find_element(by=AppiumBy.XPATH, value=xpath_password_box)
#     password_field.click()
#     # sleep(1)
#     password_field.send_keys(password)
#     sleep(1)
#     #wait till keyboard is hidden
#     # wait.until(EC.presence_of_element_located((AppiumBy.XPATH, xpath_login_continue)))
#     driver.hide_keyboard()
#     # sleep(1)
#     continue_button = wait.until(EC.presence_of_element_located((AppiumBy.XPATH, xpath_login_continue)))
#     # continue_button = driver.find_element(by=AppiumBy.XPATH, value=xpath_login_continue)
#     continue_button.click()
#     # sleep(1)
#     # driver.quit()



# def UpvoteDownvote():
#     # el1 = driver.find_element(by=AppiumBy.XPATH, value=xpath_upvote_34_post)
#     # el1.click()
#     # sleep(1)
#     wait=WebDriverWait(driver, 10)
    
#     el2 = driver.find_element(by=AppiumBy.XPATH, value=xpath_upvote_34_post)
#     el2.click()
#     sleep(1)
    
#     el3 = driver.find_element(by=AppiumBy.XPATH, value=xpath_downvote_1_post)
#     el3.click()
#     sleep(1)
    
#     el4 = driver.find_element(by=AppiumBy.XPATH, value=xpath_34_1_post_settings)
#     el4.click()
#     sleep(1)




# def logout(): #from homepage, profile_tab, tested, CORRECT
#     wait=WebDriverWait(driver, 10)
#     profile_tab=driver.find_element(AppiumBy.XPATH, value=xpath_to_profile_tab)
#     profile_tab.click()
#     sleep(1)
    
#     logout=driver.find_element(AppiumBy.XPATH, value=logout_in_list_xpath)
#     logout.click()
#     # sleep(1)

# def LoginandOut(): #tested, CORRECT
#     login()
#     sleep(1)
#     logout()
    


# def clickProfileTabHome(): #called from Home
#     #profile_tab=driver.find_element(AppiumBy.XPATH, value=xpath_to_profile_tab)
#     #replace with wait function 
#     wait=WebDriverWait(driver, 10)
#     profile_tab=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, xpath_to_profile_tab)))
#     profile_tab.click()
    
# def goToSettings(): #called from Home
#     wait=WebDriverWait(driver, 10)
#     clickProfileTabHome()
#     settings=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, settings_xpath)))
#     sleep(1)
#     settings.click()
#     # sleep(1)
        
        
# def goToNavigation():
#     wait=WebDriverWait(driver, 10)
#     naviation_menu=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, navigation_menu_xpath)))
#     naviation_menu.click()
#     sleep(1)
    
#     my_favorites=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, my_favorites_xpath)))
#     my_favorites.click()
#     sleep(1)
#     my_favorites.click()
#     sleep(1)
    
#     following=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, following_xpath)))
#     following.click()
#     sleep(1)
#     eliot_click=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, Eliot_himself_xpath)))
#     sleep(1)
#     eliot_star=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, Eliot_star_unstar_xpath)))
#     eliot_star.click()
#     sleep(1)
#     eliot_star.click()
#     sleep(1)
        
#         # return_home=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, return_to_home_xpath)))
#         # return_home.click()
#         # sleep(1)
        

# def goToAccountSettings():
#     wait=WebDriverWait(driver, 10)
#     goToSettings()
#     account_settings=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, account_settings_for_mariam_xpath)))
#     account_settings.click()
#     sleep(1)
    
# def changeCountry(): #country is inside account settings
#     goToAccountSettings()

    
# def updateEmailAddress():
#     wait=WebDriverWait(driver, 10)
#     update_email_address=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, update_email_address_xpath)))
#     update_email_address.click()
#     sleep(1)
#     update_email_address_textbox=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, update_email_address_textbox_xpath)))
#     update_email_address_textbox.click()
# #    update_email_address_textbox.send_keys("     


# def changePassword(oldpass: str, newpass: str): #tested, CORRECT
#     wait=WebDriverWait(driver, 10)
#     changePass=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, change_password_xpath)))
#     changePass.click()
#     sleep(1)
#     changePasswordcurPass=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, change_password_current_password_xpath)))
#     changePasswordcurPass.click()
#     sleep(1)
#     changePasswordcurPass.send_keys(oldpass)
#     driver.hide_keyboard()
#     sleep(1)
#     changePasswordNewPass=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, change_password_new_password_xpath)))
#     changePasswordNewPass.click()
#     sleep(1)
#     changePasswordNewPass.send_keys(newpass)
#     # if keyboard is open, hide it
#     driver.hide_keyboard()
#     sleep(1)
#     changePasswordConfirmNewPass=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, change_password_confirm_new_password_xpath)))
#     changePasswordConfirmNewPass.click()
#     sleep(1)
#     changePasswordConfirmNewPass.send_keys(newpass)
#     driver.hide_keyboard()
#     sleep(1)
#     changePasswordSave=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, change_password_save_xpath)))
#     changePasswordSave.click()
#     # sleep(1)
#     #changePassword()



def Post():
    el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create\nTab 3 of 5")
    el1.click()
    el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    el2.send_keys("Post1")
    el2.click()
    el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    el3.send_keys("Post1")
    el4 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    el4.click()
    el4.send_keys("post content, it's jimmy")
    el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Next")
    el5.click()
    el6 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(6)")
    el6.click()
    el6.click()
    el6.send_keys("football")
    el6.click()
    el6.send_keys("football")
    
# Post()
# def createCommunity():
    