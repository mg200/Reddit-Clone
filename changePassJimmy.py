from main import *

def goToAccountSettingsJimmy():
    wait=WebDriverWait(driver, 10)
    goToSettings()
    account_settings=wait.until(EC.presence_of_element_located((AppiumBy.XPATH, accSettingsJimmy)))
    account_settings.click()
    sleep(1)


login(jimmy_name, jimmy_pass)
#sleep(1)
goToAccountSettingsJimmy()
sleep(1)
changePassword()
sleep(1)
login(jimmy_name, jimmy_pass_new)
