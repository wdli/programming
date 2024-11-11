package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var (
	counter1Value = 1
	counter2Value = 1
	mutex1        sync.Mutex
	mutex2        sync.Mutex
)

func incrementCounter1() {
	for {
		time.Sleep(1 * time.Second)
		mutex1.Lock()
		counter1Value++
		if counter1Value > 999 {
			counter1Value = 0
		}
		mutex1.Unlock()
	}
}

func incrementCounter2() {
	for {
		time.Sleep(2 * time.Second)
		mutex2.Lock()
		counter2Value++
		if counter2Value > 999 {
			counter2Value = 0
		}
		mutex2.Unlock()
	}
}

func counter1Handler(w http.ResponseWriter, r *http.Request) {
	mutex1.Lock()
	defer mutex1.Unlock()
	fmt.Println("Serving counter1...")
	fmt.Fprintf(w, "%d", counter1Value)
}

func counter2Handler(w http.ResponseWriter, r *http.Request) {
	mutex2.Lock()
	defer mutex2.Unlock()
	fmt.Println("Serving counter2...")
	fmt.Fprintf(w, "%d", counter2Value)
}

func main() {
	// Create Prometheus counters
	counter1 := prometheus.NewGaugeFunc(
		prometheus.GaugeOpts{
			Name: "counter1",
			Help: "This is counter1",
		},
		func() float64 {
			mutex1.Lock()
			defer mutex1.Unlock()
			return float64(counter1Value)
		},
	)

	counter2 := prometheus.NewGaugeFunc(
		prometheus.GaugeOpts{
			Name: "counter2",
			Help: "This is counter2",
		},
		func() float64 {
			mutex2.Lock()
			defer mutex2.Unlock()
			return float64(counter2Value)
		},
	)

	// Register the counters with Prometheus
	prometheus.MustRegister(counter1)
	prometheus.MustRegister(counter2)

	// Start incrementing the counters in separate goroutines
	go incrementCounter1()
	go incrementCounter2()

	// Expose the registered metrics via HTTP.
	http.Handle("/metrics", promhttp.Handler())
	http.HandleFunc("/metric/counter1", counter1Handler)
	http.HandleFunc("/metric/counter2", counter2Handler)

	fmt.Println("Starting server at :8080")
	http.ListenAndServe(":8080", nil)
}
