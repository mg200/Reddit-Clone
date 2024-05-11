import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *
# NOTE: test is very poor as there are no handles, so it's effectively a useless test
el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Inbox\nTab 5 of 5")
el2.click()
el3 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Messages\nTab 2 of 2")
el3.click()
el4 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="New Message")
el4.click()
