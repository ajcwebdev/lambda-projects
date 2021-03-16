# Learn to implement a data seeding class using JPA and Hibernate

We can seed data to our application using Java. The models and repositories have to be in place before we use Java to seed our application. Preferably, the services would be in place as well. In this example, I will be using the services. You can use the repositories directly but miss some of the data validation that is done in the services. So let’s code this seed data! Find the code in the repo as it is mentioned in the objective!

First create a class at the root package, the same package where your main method is located. You can call this class anything you wish. I usually call it `SeedData`

Let’s look at the starting annotations for this class.

* Since this is making changes to the database, we annotate with `@Transactional`
* Spring Boot needs to know this class exists so we use `@Component`.
  * If we wish for this seed data NOT to be added to the database, all we have to do is not tell Spring Boot about the class. We do this by commenting out the `@Component` annotation. All the code is still in place but with the `@Component` annotation is gone; Spring Boot does not know about the class and thus no seeding the data!!!

```java
@Transactional
@Component
public class SeedData implements CommandLineRunner
{
    @Override
    public void run(String... args) throws Exception
    {

    }
}
```

Notice that SeedData implements `CommandLineRunner`. `CommandLineRunner` is a special Spring interface with a single run method. This runs once and only once after the Application Context is loaded. The Application Context is the container that manages all the Beans and so is responsible for running the CommandLineRunner run method.

To make this work, I want to add a constructor to Email. This constructor will take parameters of an email and an employee using those to create the object. So in the Email model add

```java
    public Email(String email, Employee employee)
    {
        this.email = email;
        this.employee = employee;
    }
```

Looking at the data.sql file as inspiration, let’s recreate that same seed data using Java.
* One big difference is we do not get to pick the primary keys. We will allow Hibernate to generate them for us.
* The data.sql file first deletes all the data. I do not do that in my SeedData. Usually if I am loading data from both places and do not want to wipe out in SeedData what I just added through data.sql.
* I am going to access the JPA methods directly from the repositories as oppose to going through the services. The choice is yours. Using the services is preferred if they are fully implemented! Ours are not. So, autowire in the repositories.

```java
public class SeedData implements CommandLineRunner
{
    @Autowired
    private EmployeeRepository employeerepos;

    @Autowired
    private JobTitleRepository jobTitlerepos;
```

Let’s create the JobTitles so we can add them when we create the employees

```java
    @Override
    public void run(String... args) throws Exception
    {
        JobTitle jt1 = new JobTitle();
        jt1.setTitle("Big Boss");
        jobTitlerepos.save(jt1);

        JobTitle jt2 = new JobTitle();
        jt2.setTitle("Wizard");
        jobTitlerepos.save(jt2);
```

Now, let us create the Employees. While creating the Employees, we add their emails and jobtitles
* emails are added by adding an email one at time to the employee’s email arraylist
* jobtitles are added on at a time using the addJobTitle method we created in the Employee model.

```java
        Employee emp1 = new Employee();
        emp1.setName("CINNAMON");
        emp1.setSalary(80000.00);
        emp1.getEmails().add(new Email("hops@local.com", emp1));
        emp1.getEmails().add(new Email("bunny@hoppin.local", emp1));
        emp1.addJobTitle(jt1);
        emp1.addJobTitle(jt2);
        employeerepos.save(emp1);

        Employee emp2 = new Employee();
        emp2.setName("BARNBARN");
        emp2.setSalary(80000.00);
        emp2.getEmails().add(new Email("barnbarn@local.com", emp2));
        emp2.addJobTitle(jt1);
        employeerepos.save(emp2);

        Employee emp3 = new Employee();
        emp3.setName("JOHN");
        emp3.setSalary(75000.00);
        employeerepos.save(emp3);
```

Before running make sure that in `application.properties spring.datasource.initialization-mode` is set to `never`. This will prevent Spring Boot from loading the data in data.sql!