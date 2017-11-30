/* 
 *  Test calling Java function from Scala 
 * 
 *  Set CLASSPATH
 *  
 *  Use make to compile
 *  see Makefile for details how to compile
 * 
 */

import com.example.hello._

/*
 *  test class
 */
class myTestClass {

  def Hello(): Unit = {
    println("Hello Scala!")
  }

}


/*
 * main
 */
object testMyClass {
  def main (args: Array[String]): Unit = {
    // call my own scala class
    val my = new myTestClass()
    my.Hello()

    // call my Java class
    val myjava = new hello(" Davids Java!")

  }

}

