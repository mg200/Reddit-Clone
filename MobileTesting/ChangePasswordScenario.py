from main import *

login(mariam_name, mariam_pass)
sleep(1)
goToAccountSettings()
sleep(3)
changePassword()
sleep(1)
login(mariam_name, mariam_pass_new)