package main

import (
	"fmt"
	"testing"
)

func reverseString(input string) string {
	// Convert string to rune slice to handle UTF-8 characters correctly
	runes := []rune(input)
	length := len(runes)

	// Create new rune slice for reversed string
	reversed := make([]rune, length)

	// Fill reversed slice from end to start
	for i := 0; i < length; i++ {
		reversed[i] = runes[length-1-i]
	}

	return string(reversed)
}

func TestReverseString(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"Hello World!", "!dlroW olleH"},
		{"", ""},
		{"radar", "radar"},
		{"   spaces   ", "   secaps   "},
		{"123abc", "cba321"},
		{"Hello@#$%", "%$#@olleH"},
		{"こんにちは", "はちにんこ"},
	}

	for _, test := range tests {
		//print test string and expected output
		fmt.Printf("Testing string: %q -> Expected: %q\n", test.input, test.expected)

		t.Run(fmt.Sprintf("reversing %q", test.input), func(t *testing.T) {
			result := reverseString(test.input)
			if result != test.expected {
				t.Errorf("reverseString(%q) = %q; expected %q",
					test.input, result, test.expected)
			}
			// Print input and output for visibility
			t.Logf("Input: %q", test.input)
			t.Logf("Output: %q", result)
		})
	}
}
