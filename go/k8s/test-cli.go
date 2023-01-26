//
// Written by GPT initially
//    after back and forth with GPT it finally worked!!
//
//    to use: ./test-cli --list-pods or ./test-cli --list-nodes

package main

import (
	"context"
	"os"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"flag"
	"fmt"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
)

func main() {
	// Use the current context in kubeconfig
	//config, err := clientcmd.BuildConfigFromFlags("", "")
	config, err := clientcmd.BuildConfigFromFlags("", os.Getenv("KUBECONFIG"))

	if err != nil {
		panic(err.Error())
	}

	// Create the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	// Define command line flags
	listPods := flag.Bool("list-pods", false, "List all pods in the current namespace")
	listNodes := flag.Bool("list-nodes", false, "List all nodes in the cluster")

	flag.Parse()

	// List pods in the current namespace
	if *listPods {
		pods, err := clientset.CoreV1().Pods("").List(context.TODO(), metav1.ListOptions{})
		if err != nil {
			panic(err.Error())
		}
		fmt.Println("Pods in the current namespace:")
		for _, pod := range pods.Items {
			fmt.Printf("- %s\n", pod.Name)
		}
	}

	// List nodes in the cluster
	if *listNodes {
		nodes, err := clientset.CoreV1().Nodes().List(context.TODO(), metav1.ListOptions{})
		if err != nil {
			panic(err.Error())
		}
		fmt.Println("Nodes in the cluster:")
		for _, node := range nodes.Items {
			fmt.Printf("- %s\n", node.Name)
		}
	}
}
