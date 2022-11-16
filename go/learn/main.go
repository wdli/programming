package main

import (
	"fmt"
	"math"
)

// Variable comment
var hello string = "Hello Learning!"

// Struct and method
type Point struct {
	X float64
	Y float64
}

// The following function attached to the struct Point
// (p Point) is the receiver
// Distance is the name
// (q Point) is the param
func (p Point) Distance(q Point) float64 {
	//Note: q is farther than p
	return math.Hypot(q.X-p.X, q.Y-p.Y)
}

//interface and method

type Shape interface {
	area()
}

func main() {

	fmt.Println(hello)
	fmt.Println("# Testing the struct and method function")

	p := Point{1, 2} //near point
	q := Point{3, 4} //remote point

	fmt.Println(" The distance: ", p.Distance(q))

}
