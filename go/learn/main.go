package main

import (
	"fmt"
	"math"
)

// Variable comment
var hello string = "Hello Learning!"

// Struct
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

// interface Shape
type Shape interface {
	area()
}

// struct Circle
type Circle struct {
	radius float64
}

// struct Rect
type Rect struct {
	width float64
	lenth float64
}

// func method area for struct Circle
func (c Circle) area() float64 {
	return 3.14 * c.radius * c.radius
}

// func method area for struct Rect
func (r Rect) area() float64 {
	return r.lenth * r.width
}

// function

func main() {

	fmt.Println(hello)
	fmt.Println("# Testing the struct and method function")

	p := Point{1, 2} //near point
	q := Point{3, 4} //remote point

	fmt.Println(" The distance: ", p.Distance(q))

}
