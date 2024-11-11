package main

import (
	"fmt"
	"log"
	"math"
)

// Variable comment
var hello string = "Hello Learning!"

// A standalone struct
type Point struct {
	X float64
	Y float64
}

// The following function attached to the standalone struct Point
// (p Point) is the receiver
// Distance is the name
// (q Point) is the param
func (p Point) Distance(q Point) float64 {
	//Note: q is farther than p
	return math.Hypot(q.X-p.X, q.Y-p.Y)
}

// Learn about interfaces
//
// interface Shape
type Shape interface {
	area() float64
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

// interface area implementation for struct Circle
func (c Circle) area() float64 {
	return math.Pi * c.radius * c.radius
}

// interface area implementation for struct Rect
func (r Rect) area() float64 {
	return r.lenth * r.width
}

// function to print the area regardless
// who implements the interface
func printArea(s Shape) {

	fmt.Println("Shape: ", s)
	fmt.Println("Area is: ", s.area())
}

// function

func main() {

	fmt.Println(hello)
	log.Println(hello)

	//Test standalone struct and method
	fmt.Println("### Testing the standalone struct and method function")

	p := Point{1, 2} //near point
	q := Point{3, 4} //remote point

	fmt.Println(" The distance: ", p.Distance(q))

	//Test the interface and its implementations
	fmt.Println("### Testing the interface implementation")

	c := Circle{radius: 10.0}
	r := Rect{width: 3, lenth: 5}

	fmt.Println(" Area of the circle ")
	printArea(c)

	fmt.Println(" Area of the rectangle")
	printArea(r)
}
