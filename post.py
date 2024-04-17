from main import *
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as E
post_name="my post" # change this to the name of the post you want to create
post_body="this is my post" # change this to the body of the post you want to create


#########LOGGED IN as Mariam##########
# def post():
#     # webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()
#     wait=WebDriverWait(driver, 10)
#     #use wait until
#     create_post=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, createTab35_xp)))
#     # create_post=driver.find_element(AppiumBy.XPATH, value=createTab35_xp).click()
#     # create_post=driver.find_element(AppiumBy.ACCESSIBILITY_ID, value=createTab35_accID).click()
#     create_post.click()
#     # EC.element_to_be_clickable
#     # create_post=wait.until(EC.element_to_be_clickable((AppiumBy.XPATH, createTab35_xp)))
#     create_post.click()
#     #enter title
#     title=driver.find_element(AppiumBy.XPATH, value=Title_xpath)
#     title.click()
#     title.send_keys(post_name)
#     #enter content
#     content=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, body_text_xpath)))
#     # content=driver.find_element(AppiumBy.XPATH, value=body_text_xpath)
#     content.click()
#     content.send_keys(post_body)
    
#     #click on the next button
#     next_button=driver.find_element(AppiumBy.XPATH, value=next_xpath)
#     next_button.click()
    
#     #click on first community
#     community=driver.find_element(AppiumBy.XPATH, value=firstcommunity_xpath)
#     community.click()
#     post_button=driver.find_element(AppiumBy.XPATH, value=post_xpath)
#     post_button.click()
#     # wait.until(EC.presence_of_element_located((AppiumBy.XPATH, return_to_home_xpath)))
#     # wait for a few seconds
#     sleep(5)
#     #click on the post button
    
# post()
    
    
def postRecorded():
    el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create\nTab 3 of 5")
    el1.click()
    el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
    el2.click()
    el2.send_keys("newPost3")
    el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
    el3.click()
    el3.send_keys("body of the post_3")
    el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Next")
    el4.click()
    el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="firstcommunity")
    el5.click()
    el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
    el6.click() 
    
    
postRecorded()