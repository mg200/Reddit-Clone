from main import *
# post_title="insert title here"
post_title="it's my post hello2!"
# post_body="post body"  
post_body="the content of my second post, testing team"  

# package_name = driver.execute_script('mobile: getCurrentPackage')
# desired_caps = driver.desired_capabilities()
el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Create\nTab 3 of 5")
el1.click()
el2 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(0)")
el2.click()
el2.send_keys(post_title)
el3 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.EditText\").instance(1)")
el3.click()
el3.send_keys(post_body)
el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Next")
el4.click()
el5 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Testing Community")
el5.click()
el6 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Rules")
el6.click()
el7 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="I Understand")
el7.click()
el8 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Post")
el8.click()
el9 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(0)")
el9.click()
# el10 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.widget.Button\").instance(1)")
# el10.click()
