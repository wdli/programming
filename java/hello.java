/*
 * Hello class for testing 
 *
 * Env: 
 *  - which java
 *  - sudo apt-get install default-jdk
 *  - set CLASSPATH env var
 * 
 * Use make to compile and see Makefile for details
 *
 */
package com.example.hello;

public class hello {

    //
    // private var
    //
    private String message;

    //
    // constructor
    //
    public hello(String msg) {
	message = msg;
	System.out.println("Hello: " + message);

	// Test String to bytes conversion
	byte [] buf = message.getBytes();
	System.out.println("Length of the byte buffer: " + buf.length);
    }

    
}
