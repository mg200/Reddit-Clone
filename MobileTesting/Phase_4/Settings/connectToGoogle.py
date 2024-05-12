
import sys
sys.path.append('E:\Spring2024\SW\Phase3\mobile_tests\MobileTesting\Phase_4')
from main import *


def assert_element(element, message):
    sleep(0.5)
    try:
        assert element is not None, message
    except AssertionError as e:
        print(e)
    return element