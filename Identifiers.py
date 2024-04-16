from typing import Any, Dict
import pytest
from appium import webdriver
from appium.options.common import AppiumOptions
from appium.webdriver.common.appiumby import AppiumBy
from time import sleep
from typing import Any, Dict
# from Identifiers import desired_caps
desired_caps = {
  "platformName": "Android",
  "appium:platformVersion": "14",
  "appium:automationName": "UIAutomator2",
#   "appium:deviceName": "pixel_3a"
  "appium:deviceName": "emulator-5554"
}


# 1- Serial identifiers
xpath_login_email_box="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]"

xpath_password_box="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]"
xpath_login_continue="//android.widget.Button[@content-desc='Conitnue']"



#upvote and downvote
# //android.view.View[@content-desc="11h ago Downvote this Every downvote matters... 😔 34 1"]

xpath_upvote_34_post="//android.view.View[@content-desc='11h ago Downvote this Every downvote matters... 😔 34 1']/android.view.View[3]"
xpath_downvote_1_post="//android.view.View[@content-desc='11h ago Downvote this Every downvote matters... 😔 34 1']/android.view.View[4]"
xpath_34_1_post_settings="//android.view.View[@content-desc='11h ago Downvote this Every downvote matters... 😔 34 1']/android.view.View[2]"


xpath_to_profile_tab="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[3]"


###############################
# profile tab and its children
###############################
profile_tab_xpat="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[3]"


# logout
logout_in_list_xpath="//android.view.View[@content-desc='Logout']"
logout_accessibility_id="Logout"


# settings
settings_xpath="//android.view.View[@content-desc='Settings']"
settings_accessibility_id="Settings"
# 1. account settings

# {
account_settings_for_mariam_xpath="//android.view.View[@content-desc='Account settings for u/mariam']"
account_settings_for_mariam_accessibility_id="Account settings for u/mariam"


#update email address
update_email_address_xpath="//android.view.View[@content-desc='Update email address mariamgamal70.backup@gmail.com']"
update_email_address_accessibility_id="Update email address mariamgamal70.backup@gmail.com"

# change password
change_password_xpath="//android.view.View[@content-desc='Change password']"
change_password_accessibility_id="Change password"

# allow people to follow you 
                                  
allow_people_to_follow_you_xpath="//android.view.View[@content-desc='Allow people to follow you Followers will be notified about posts you make to your profile and see them in their home feed.']"
allow_people_to_follow_you_accessibility_id="Allow people to follow you Followers will be notified about posts you make to your profile and see them in their home feed."

# }
