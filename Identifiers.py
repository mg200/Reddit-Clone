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

signup_xpath="//android.widget.Button[@content-desc='Sign up']"
Signup_accessibility_id="Sign up"


#upvote and downvote
# //android.view.View[@content-desc="11h ago Downvote this Every downvote matters... 😔 34 1"]

xpath_upvote_34_post="//android.view.View[@content-desc='11h ago Downvote this Every downvote matters... 😔 42 1']/android.view.View[3]"
xpath_downvote_1_post="//android.view.View[@content-desc='11h ago Downvote this Every downvote matters... 😔 42 1']/android.view.View[4]"
xpath_34_1_post_settings="//android.view.View[@content-desc='11h ago Downvote this Every downvote matters... 😔 42 1']/android.view.View[2]"


xpath_to_profile_tab="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[3]"
#//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[3]
#//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button[3]


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
account_settings_for_mariam_xpath="//android.view.View[@content-desc='Account settings for u/mariam']"
account_settings_for_mariam_accessibility_id="Account settings for u/mariam"


accSettingsJimmy="//android.view.View[@content-desc='Account settings for u/jimmyy']"
#account_settings_for_mariam_accessibility_id="Account settings for u/jimmyy"


# {
# 1.1- account settings
#update email address
update_email_address_xpath="//android.view.View[@content-desc='Update email address mariamgamal70.backup@gmail.com']"
update_email_address_accessibility_id="Update email address mariamgamal70.backup@gmail.com"
update_email_address_textbox_xpath='//android.widget.EditText'


#1.2- update password
# change password
change_password_xpath="//android.view.View[@content-desc='Change password']"
change_password_accessibility_id="Change password"

change_password_current_password_xpath="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]"
change_password_new_password_xpath="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]"
change_password_confirm_new_password_xpath="//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[3]"

change_password_cancel_xpath="//android.widget.Button[@content-desc='Cancel']"
change_password_cancel_accessibility_id="Cancel"
change_password_save_xpath='//android.widget.Button[@content-desc="Save"]' #trying the '' instead of ""
change_password_save_accessibility_id="Save"


#1.3- update username
# allow people to follow you              
allow_people_to_follow_you_xpath="//android.view.View[@content-desc='Allow people to follow you Followers will be notified about posts you make to your profile and see them in their home feed.']"
allow_people_to_follow_you_accessibility_id="Allow people to follow you Followers will be notified about posts you make to your profile and see them in their home feed."

allow_people_to_follow_you_switch_xpath="//android.widget.Switch"


# }




###############
# Navigation Window
###############
navigation_menu_xpath="//android.widget.Button[@content-desc='Open navigation menu']"
navigation_menu_accessibility_id="Open navigation menu"

following_xpath="//android.view.View[@content-desc='Following']"
Eliot_himself_xpath='//android.view.View[@content-desc="u/Eliot"]'
Eliot_star_unstar_xpath='//android.view.View[@content-desc="u/Eliot"]/android.widget.Button'



my_favorites_xpath="//android.view.View[@content-desc='My favourites']"
my_favorites_accessibility_id="My favourites"

return_to_home_xpath='//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View'

# //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View

# //android.widget.Button[@content-desc="Open navigation menu"]
