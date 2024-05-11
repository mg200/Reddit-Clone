
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *
el8 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(19)")
el8.click()
el8.click()
el9 = driver.find_element(by=AppiumBy.ANDROID_UIAUTOMATOR, value="new UiSelector().className(\"android.view.View\").instance(20)")
el9.click()
el9.click()
