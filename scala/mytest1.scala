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
import java.io._

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



  def updateToFile ( fn : String, key : String, encFile : String ) : Unit = {
    
    val w = new FileWriter(new File(fn), true)
    val bw = new BufferedWriter(w)

    bw.write(key + " " + encFile + "\n")
    bw.close

  }




  def main (args: Array[String]): Unit = {

    // call my own scala class
    val my = new myTestClass()
    my.Hello()

    // call my Java class
    val myjava = new hello("Hello Java from Scala")

    // Write a line to a file
    println("Update the file")
    updateToFile("file1", "key1", "encFile1")

    println("Update the file")
    updateToFile("file1", "key2", "encFile2")

  }

}
