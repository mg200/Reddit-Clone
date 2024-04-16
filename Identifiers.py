from typing import Any, Dict
import pytest
from appium import webdriver
from appium.options.common import AppiumOptions
from appium.webdriver.common.appiumby import AppiumBy
from time import sleep
from typing import Any, Dict
from Identifiers import desired_caps
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



