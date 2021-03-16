## Interfaces

Interfaces defines a formal way for objects to handle interaction with the rest of the application. Interfaces are a way for the programmer to define what behaviors, methods, an object should have. Any class that implements an interface must include an implementation for each method in the interface. Interfaces thus give us a standard list of method headers that MUST be implemented in classes that use the interface. Classes that use the interface can include additional methods but must include the ones from the interface.

For example: We have an interface called vehicles where all vehicles move and use fuel.

All classes will use this interface. So all vehicles must move and use fuel but how they move and use fuel varies by vehicle. They can do other things as well!

Car is a vehicle
* all vehicles move: Moves on land with wheels
* use fuel: Uses gasoline
* Says “honk”
Airplane is a vehicle
* all vehicles move: Moves through air on wings
* use fuel: Uses Jet Fuel
Sailboat is a vehicle
* all vehicles move: Moves through water on a hull
* use fuel: Uses Wind

```java
public interface SampleInterface
{
    void amethod(String parameter);
    int operation(int a, int b);
}
```

This is a Java interface:

* an Interface is a class so its name must start with a capital letter
* an Interface is a class so its file name must match the interface name
* the key word interface is used in place of class to say this class is special. It is an interface
* interfaces can implement other interfaces and can extend an abstract class.

The interface defines 2 methods:

the methods are defined simply with their method header
* Thus methods in the interface are considered abstract meaning they have no implementation, just the header
* The class that implements the interface must provide the body for the method
Normally we do not give an access modifier for a method header in an interface
* methods default to public

Let’s create a class that implements the interface thus giving a body to the method headers from the interface.

```java
public class ASampleClass implements SampleInterface
{
    String aStringField;
    int anIntField;

    public ASampleClass(String aStringField, int anIntField)
    {
        this.aStringField = aStringField;
        this.anIntField = anIntField;
    }

    @Override public void amethod(String parameter)
    {
        System.out.println(parameter.toLowerCase());
    }

    @Override public int operation(int a, int b)
    {
        return a + b;
    }

    public void lookAtMe()
    {
        System.out.println("I am a method");
    }
}
```

We have a class with two fields that implements both of the methods from the interface. The class also adds its own method. Now let’s implement another class that implements the interface but in a completely new way:

```java
public class AnotherClass implements SampleInterface
{
    @Override public void amethod(String parameter)
    {
        System.out.println(parameter.toLowerCase());
    }

    @Override public int operation(int a, int b)
    {
        return a / b;
    }
}
```

Both of the above classes are valid and can be used in the same application!

Note that interfaces:

* Cannot be used to create objects directly. Other classes must implement them
* Do not have the body implement methods just give structure
* Classes implementing interfaces must implement ALL interface methods. Classes can add their own methods as well
* Interface methods by default are abstract and public
* The main purpose of interfaces is to provide uniformity of behaviors among a group of classes. These classes all can do the same thing!

Create an application called sampleoop with a package called interfaces. Create a file called Animal.java:

```java
package interfaces;

public interface Animal
{
    void animalSound();
    void sleep();
}
```

Create a file called Pig.java:

```java
package interfaces;

class Pig implements Animal
{
    @Override public void animalSound()
    {
        System.out.println("Oink Oink");
    }

    @Override public void sleep()
    {
        System.out.println("ZZZ");
    }
}
```

Create a file called Dog.java:

```java
package interfaces;

public class Dog implements Animal
{
    @Override public void animalSound()
    {
        System.out.println("Woof");
    }

    @Override public void sleep()
    {
        System.out.println("Snore...");
    }

    public void eat()
    {
        System.out.println("chomp chomp chomp");
    }
}
```

Create Main.java file with main class:

```java
package interfaces;

public class Main
{
    public static void main(String[] args)
    {
        Pig myPig = new Pig(); // instantiate a pig object
        Dog myDog = new Dog(); // instantiate a dog object

        myPig.animalSound();
        myPig.sleep();
        // myPig.eat() pig does not know how to eat. Poor pig

        myDog.animalSound();
        myDog.sleep();
        myDog.eat();
    }
}
```

Run these commands from the src directory:

`javac interfaces/*.java`
`jar cvfe interfaces.jar interfaces.Main interfaces/*.class`
`java -jar interfaces.jar`

Output:

```
Oink Oink
ZZZ
Woof
Snore...
chomp chomp chomp
```

## Abstract Classes

If we have a group of classes that share similar methods and / or fields, using abstract classes would make sense. The idea is that our group of classes could inherit from our abstract class, our parent class, all those standard methods or fields. That way, the group of classes could worry about just implementing what is different in each class.

Abstraction is the process of hiding certain details and showing only the essential information to the sub class.

abstract is a keyword used for classes and methods:

Abstract classes cannot be used to create objects. Abstract classes are used to create uniform subclasses.
* These subclass extends the abstract class thus inheriting all the fields and methods from the abstract class and still being able to create their own.
* A subclass can only extends a single abstract class.
Abstract methods do not have a body, only a method header.

So why should we use abstract classes?
* They enforce a common method and field implementation across subclasses.
* Subclasses can be combined into a single list, like an ArrayList under the parent, abstract class, data type!
* The abstract classes forces subclasses to have certain fields and implements of methods. Abstract classes do NOT require abstract methods.

```java
abstract class AnAbstractClass
{
    protected int anInt = 7;

    public void amethod(String parameter)
    {
        System.out.println("I am a method from " + parameter);
    }
    abstract int operation(int a, int b);
}
```

The above is a Java abstract class. Notice that it contains:

* A field anInt that will be known to all subclasses
* A method amethod already defined that can be used directly by all subclasses
* An abstract method operation that subclasses MUST implement

```java
public class ASampleClass extends AnAbstractClass
{
    @Override int operation(int a, int b)
    {
        return a + b + anInt;
    }
}
```

Now we have the class ASampleClass extending the abstract class including finishing the declaration of the method operation. Inside the method operation, ASampleClass uses the field anInt inherited from AnAbstractClass!

* Classes can inherit from multiple interfaces but only a single abstract class
* Abstract classes can contain fields; interfaces should not
* Abstract classes can implement methods that get shared across classes; interfaces give method headers but not actual implementations.
* Java with the Spring Framework uses interfaces much more than abstract classes!

Create an application called sampleoop with a package called abstraction. Create a file called Animal.java.

```java
package abstraction;

abstract class Animal
{
    int weight = 50;

    abstract void animalSound();

    void sleep()
    {
        System.out.println("ZZZ");
    };

    int getWeight()
    {
        return weight;
    }
}
```

Create a file called Pig.java:

```java
package abstraction;

public class Pig extends Animal
{
    // Pig must give the implementation for animalSound
    // the rest of the methods can be used directly
    @Override void animalSound()
    {
        System.out.println("Oink Oink");
    }
}
```

Create Main.java file with main class:

```java
package abstraction;

public class Main
{
    public static void main(String[] args)
    {
        Pig myPig = new Pig(); // create a pig object
        myPig.animalSound();   // use the animalSound method from the abstract class defined in Pig
        myPig.sleep(); // use the sleep method from the abstract class
        System.out.println("Weight " + myPig.getWeight()); // use the getWeight method from the abstract class!
    }
}
```

Run these commands from the src directory:

`javac abstraction/*.java`
`jar cvfe abstraction.jar abstraction.Main abstraction/*.class`
`java -jar abstraction.jar`

Output:

```
Oink Oink
ZZZ
Weight 50
```

## Lambda Expressions

Lambda Expressions are anonymous functions similar to arrow functions in JavaScript, although not as robust or as widely used. Lambda Expressions are functions:

* without a name
* do not belong to any class
* may or may not have parameters
* have no stated return type
* with syntax of (parameter list) -> {body; function; statements;}

#### Using a Lambda Expression with 1 parameter: Iterating through a collection

A very common use of Lambda Expressions is to iterate through a collection. So for example if list was ArrayList, this lambda expression would display each element of the ArrayList in order. name is our parameter in the lambda expression.

```java
list.forEach (name -> System.out.println (name));
```

#### Using a Lambda Expression with no parameters

No parameters for the lambda expression is shown through the use of () to take the place of parameters.

```java
public interface MyInterface
{
    int operation ();
}
```
```java
public class Main
{
    public static void main(String[] args)
    {
        MyInterface myAnswer = () -> 2 * 2;
        System.out.println("Answer: " + myAnswer.operation());
    }
}
```

#### Using a Lambda Expression with multiple parameters
Note the two parameters in ()

```java
public interface MyInterface
{
    String operation (int num, String msg);
}
```

```java
public class Main
{
    public static void main(String[] args)
    {
        MyInterface myAnswer = (n, x) -> x + (n * n);
        System.out.println("Answer: " + myAnswer.operation(2, "My Answer "));
    }
}
```

#### Used when you have a single interface method or abstract method

As shown in the previous two examples, often we use lambda expressions to implement abstract methods.

By combining an interface and lambda expressions we can easily filter an ArrayList. We will be creating a copy of the ArrayList that contains the items we want. Then we use a lambda expression to print the filtered list!

Create an application called sampleoop with a package called lambdaexpress.

Create an interface that has one method. It’s one method will take as a parameter an object of the data type we wish to check. The method will be implemented using a lambda expression. Create the file CheckNumber.java with the following code

```java
package lambdaexpress;

public interface CheckNumber
{
    boolean test(int testNum);
}
```

Now let’s create the Main.java file

```java
package lambdaexpress;

import java.util.ArrayList;
import java.util.List;

public class Main
{
    public static List<Integer> filterOdds(List<Integer> myList, CheckNumber tester)
    {
        // when we call this, myList becomes numbers from the main method
        // tester becomes the lambda expression num -> ((num % 2) == 0
        // where num is some element in the ArrayList
        List<Integer> filteredList = new ArrayList<>();

        for (Integer n : myList)
        {
            // if the lambda expression returns true, add that element to the new ArrayList
            if (tester.test(n))
            {
                filteredList.add(n);
            }
        }
        return filteredList;
    }

    public static void main(String[] args)
    {
        List<Integer> numbers = new ArrayList();

        // populate an ArrayList with numbers 0 - 6
        for (int i = 0; i < 7; i++)
        {
            numbers.add(i);
        }

        // Create a new ArrayList from the output of the function filterOdds with parameters
        // our populated ArrayList
        // lambda expression that looks to see if the ArrayList element is divisible by 2
        List<Integer> toPrintList = filterOdds(numbers, num -> ((num % 2) == 0));
        toPrintList.forEach(n -> System.out.println(n));
    }
}
```

Our main method:

* Creates a list of integers 0 through 6.
* Then we call a function with two parameters: one, the list we just created, the other a lambda expression that will implement the method from the interface we just created.
* The function loops through the ArrayList. If the lambda expression evaluates to true, that element is added to a temporary list.
* The temporary list is then returned to the main method.
* Now the main method displays the returned list using a lambda expression!

Run these commands from the src directory:

`javac lambdaexpress/*.java`
`jar cvfe lambdaexpress.jar lambdaexpress.Main lambdaexpress/*.class`
`java -jar lambdaexpress.jar`

Output:

```
0
2
4
6
```
