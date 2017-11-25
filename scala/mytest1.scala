/* 
 *  Test calling Java function from Scala 
 */

import com.example.hello._

class myTestClass {

  def Hello(): Unit = {
    println("Hello Scala!")
  }

}


object testMyClass {
  def main (args: Array[String]): Unit = {
    // call my own scala class
    val my = new myTestClass()
    my.Hello()

    // call my Java class
    val myjava = new hello(" Davids Java!")

  }

}

