package main

import (
	"fmt"
	//"log"
	"math"

	"time"
)

// // Calculate days count between two dates
func daysBetweenDates(startDate, endDate time.Time) int {
	return int(math.Ceil(endDate.Sub(startDate).Hours() / 24))
}

// // Calculate days count between two dates
// func daysBetweenDates(startDate, endDate time.Time) int {
// 	return int(math.Ceil(endDate.Sub(startDate).Hours() / 24))
// }

// Test above functions
func main() {
	// Test daysBetweenDates function
	startDate := time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)
	endDate := time.Date(2020, 1, 10, 0, 0, 0, 0, time.UTC)
	fmt.Println("Days during the interval: ", daysBetweenDates(startDate, endDate))
}

// Test above functions






