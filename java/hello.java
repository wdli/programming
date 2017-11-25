/*
 * Hello class for testing 
 *
 * Env: 
 *  - which java
 *  - sudo apt-get install default-jdk
 */
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
    }

    //
    // main
    //
    public static void main (String [] args ){
	hello h = new hello("David");
    }
    
}
