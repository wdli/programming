"""
This module provides functionality to reverse strings and includes unit tests.

The module contains a reverse_string function and a TestReverseString test class
to verify the functionality of string reversal operations.
"""

import unittest

def reverse_string(input_str):
    return input_str[::-1]

class TestReverseString(unittest.TestCase):
    def print_test(self, test_str, expected):
        print(f"Testing string: {test_str} -> Expected: {expected}")
        try:
            self.assertEqual(reverse_string(test_str), expected)
            print("OK")
        except AssertionError:
            print("FAIL")

    def test_reverse_string(self):
        # Test regular string
        self.print_test("Hello World!", "!dlroW olleH")
        
        # Test empty string
        self.print_test("", "")
        
        # Test palindrome
        self.print_test("radar", "radar")
        
        # Test string with spaces
        self.print_test("   spaces   ", "   secaps   ")
        
        # Test string with numbers
        self.print_test("123abc", "cba321")
        
        # Test string with special characters
        self.print_test("Hello@#$%", "%$#@olleH")

if __name__ == '__main__':
    unittest.main()