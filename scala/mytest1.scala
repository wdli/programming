class myTestClass {

  def Hello(): Unit = {
    println("Hello Scala!")
  }

}


object testMyClass {
  def main (args: Array[String]): Unit = {
    val my = new myTestClass()
    my.Hello()
  }

}
