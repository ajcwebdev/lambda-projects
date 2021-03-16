# CRUD

CRUD are the functions that will be done by our application. They are, with their corresponding HTTP Method:

|Letter|CRUD|Http Method|
|------|----|-----------|
|C|Create|POST|
|R|Read|GET|
|U|Update|PUT, PATCH|
|D|Delete|DELETE|

## Dependencies

We will build a Java Spring CRUD Application, we must add certain dependencies to it. These external libraries will be added using the GUI interface inside of IntelliJ. For this application we will be adding the following dependencies:

Spring Boot DevTools
* Makes development life easier.
* Adds automatic restarting when code changes and allows for some remote debugging.

Spring Web
* Allows you to build RESTFul web service using an embedded Apache Tomcat webserver container.

Spring Data JPA
* Using the Java Persistence API which uses Spring Data and Hibernate, works with data in databases.

H2 Database
* Allows the application to use the in memory database H2.
* When we add H2, we need to comment out the scope for H2 in the pom.xml file.
* This is needed to configure H2 database console and make H2 available in IntelliJ.
* We need H2 not only at runtime but also at compile time.

### application.properties

Spring Applications make use of a application.properties file. This file allows to control the configuration of the application including
* how seed data is handled
* how links are handled
* important web sources, paths, and ports
* databases

### Application Layout

In Java Spring applications classes are grouped in packages by the function they perform. Each model gets its own class per function. Under the main package of the application you may find the following subpackages: 

#### `config`

* Contains all classes related to configurations.

#### `controllers`

* Contains access points (endpoints) used by clients.

#### `models`

* Contains layouts of all data used in application.
* This includes persistent data that is saved to a database and non-persistent data used only during application execution.

#### `repositories`

* Contains links between database and application.
* Typically contains one class for each persistent database model.
* Often called DAO - data access objects

#### `services`

* Contains services that are used to retrieve and manipulate data in application.
* Contains contract stating what each client can do with data in the application.
* The majority of the work of the application resides in this package.

Each subpackage contains its own unique set of classes using their own unique annotations.

### Flow of a CRUD Application

Request -> Host -> Tomcat -> Spring -> Controller -> Service -> Repository -> Model -> back up the chain

1. A client sends a request. A request contains the URL of the endpoint and perhaps a body containing data.
2. The request is sent to the correct server, host, via networking protocols.
3. On the host, the request is sent to the application listening on the given port, in this case our embedded Tomcat Webserver.
4. The Tomcat Webserver sends the request to the correct application.
5. In the application Spring takes over.
6. Spring uses the endpoint to find the correct controller looking in classes with the @RestController annotation.
7. Spring then finds the correct method to execute using the @GetMapping annotation, among other annotations.
8. The method then is executed, calling the service.
9. The service gets the requested date from the model using the repository.
10. The service manipulates the data and returns it to the controller method.
11. The controller sends the data back to the client through the network.

To create a Spring Boot application in IntelliJ, follow these steps:

1. Create a project with the Spring Initializer.

![Spring Initializer](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%202%20-%20JX%20Java%20-%20Read%20Data%20using%20CRUD%20Operations%20including%20Seeding%20Data/assets/JX-SP11-M2-02.png)

2. Name the project, picking the correct version of the JDK (Not 8)

![Project Metadata](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%202%20-%20JX%20Java%20-%20Read%20Data%20using%20CRUD%20Operations%20including%20Seeding%20Data/assets/JX-SP11-M2-03.png)

3. Add the appropriate dependencies: Spring Boot DevTools, Spring Web, Spring Data JPA, H2 Database

![Project Dependencies](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%202%20-%20JX%20Java%20-%20Read%20Data%20using%20CRUD%20Operations%20including%20Seeding%20Data/assets/JX-SP11-M2-04.png)

4. Name the project file

![Project Name](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%202%20-%20JX%20Java%20-%20Read%20Data%20using%20CRUD%20Operations%20including%20Seeding%20Data/assets/JX-SP11-M2-05.png)

5. If a popup appears asking, select to make this a Maven Project.
6. If a popup appears asking, select to autoimport Maven dependencies.

Configure the application:

In the `POM.XML` file, comment out the scope for H2

```XML
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
<!--<scope>runtime</scope>-->
</dependency>
```

Now add these lines to the `application.properties` found under main/resources.

```
### Configurations useful for working with H2
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

### We set a port that is not frequently used
server.port=${PORT:2019}

### Feature that determines what happens when no accessors are found for a type
### (and there are no annotations to indicate it is meant to be serialized).
spring.jackson.serialization.FAIL_ON_EMPTY_BEANS=false

### keeps a transaction inside of the same entity manager
### This property register an EntityManager to the current thread,
### so you will have the same EntityManager until the web request is finished.
spring.jpa.open-in-view=true

### What do with the schema
### drop n create table again, good for testing
spring.jpa.hibernate.ddl-auto=create
spring.datasource.initialization-mode=always

### Good for production!
### spring.jpa.hibernate.ddl-auto=update
### spring.datasource.initialization-mode=never
```

Creating the application structure

First, let’s create each of the needed subpackages. Under the main package (src/main/java/com.lambdaschool.sampleemps), create the following subpackages
* config
* controllers
* models
* repositories
* services

Under the subpackage `config` create the class `H2ServerConfiguration`

```java
package com.lambdaschool.sampleemps.config;

import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.SQLException;

/**
 * Configures H2 access through the JetBrains IntelliJ IDEA IDE.
 * Adapted from https://techdev.io/en/developer-blog/querying-the-embedded-h2-database-of-a-spring-boot-application
 * necessary for using the database tool built into intellij
 */
@Configuration
public class H2ServerConfiguration
{
    /**  TCP port for remote connections, default 9092.  */
    @Value("${h2.tcp.port:9092}")
    private String h2TcpPort;

    /**  Web port, default 8082.  */
    @Value("${h2.web.port:8082}")
    private String h2WebPort;

    /**  TCP connection to connect with SQL clients to the embedded h2 database.
     * Connect to "jdbc:h2:tcp://localhost:9092/mem:testdb", username "sa", password empty.
     * @return The created TcpServer needed to access H2.
     * @throws SQLException If the server cannot be created.  */
    @Bean
    @ConditionalOnExpression("${h2.tcp.enabled:true}")
    public Server h2TcpServer() throws
        SQLException
    {
        return Server.createTcpServer("-tcp",
            "-tcpAllowOthers",
            "-tcpPort",
            h2TcpPort)
            .start();
    }

    /**  Web console for the embedded h2 database.
     * Go to http://localhost:8082 and connect to the database "jdbc:h2:mem:testdb", username "sa", password empty.
     * @return The created web server needed to access H2.
     * @throws SQLException If the server cannot be created.  */
    @Bean
    @ConditionalOnExpression("${h2.web.enabled:true}")
    public Server h2WebServer() throws
        SQLException
    {
        return Server.createWebServer("-web",
            "-webAllowOthers",
            "-webPort",
            h2WebPort)
            .start();
    }
}
```

Under the subpackage `controllers` create the class `EmployeeController`

```java
package com.lambdaschool.sampleemps.controllers;

import com.lambdaschool.sampleemps.models.Employee;
import com.lambdaschool.sampleemps.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employees") // optional
public class EmployeeController
{
    @Autowired
    private EmployeeService employeeService;

    @GetMapping(value = "/employees")
    public ResponseEntity<?> listAllEmployees()
    {
        List<Employee> myEmployees = employeeService.findAllEmployees();
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }

    @GetMapping(value = "/employeename/{subname}")
    public ResponseEntity<?> listEmployeesWithName(
        @PathVariable
            String subname)
    {
        List<Employee> myEmployees = employeeService.findEmployeeNameContaining(subname);
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }

    @GetMapping(value = "/employeeemail/{subemail}")
    public ResponseEntity<?> listEmployeesWithEmail(
        @PathVariable
            String subemail)
    {
        List<Employee> myEmployees = employeeService.findEmployeeEmailContaining(subemail);
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }
}
```

## Seed Data

Seeding Data puts an initial set of data into a database for testing purposes or for an initial set of data required for the application to begin functioning. SQL is a popular way of seeding data. Spring Boot will look into `resources` folder for `data.sql`. If the file does exist the data is loaded into the database depending on `application.properties` settings. SQL statements get executed by default and the data is loaded. The preferred practice is to explicitly turn this on in `application.properties` using the following entry:

```
spring.datasource.initialization-mode=always
```

To turn off the execution of `data.sql`, use the following entry:

```
spring.datasource.initialization-mode=never
```

A common practice is to first delete the data in the database. This is necessary when seeding a database with test data. Each time the application is executed old data is deleted and refreshed with the data from `data.sql` so you always know what your data is at the start of running the application. The SQL command `delete from <table>` deletes data. You must delete from tables in a certain order.

1. Find all tables whose primary keys do not exist in other tables. Delete from those tables first. This will include join tables and tables with Many to One relationships.
2. Keeping finding tables whose primary keys do not exist in other tables and delete from those tables. This process can be repeated until all data is removed.

* We delete from the join table `EMPLOYEETITLES` first.
* Then from the Many to One Table `EMAILS`.
* Then delete from `JOBTITLES` and `EMPLOYEES`.

Create the file `data.sql` under `src/main/resources` and enter the following:

```SQL
DELETE
FROM EMPLOYEETITLES;

DELETE
FROM EMAILS;

DELETE
FROM JOBTITLES;

DELETE
FROM EMPLOYEES;
```

We populate our database in the reverse order. We have to add data to a table before its primary key can be used in another table. Start with the `EMPLOYEE` table:

```SQL
INSERT INTO EMPLOYEES (EMPLOYEEID, NAME)
    VALUES (1, 'CINNAMON'),
           (2, 'BARNBARN'),
           (3, 'JOHN');
```

Now we have the employee primary keys and can add employee emails:

```SQL
INSERT INTO EMAILS (EMAILID, EMAIL, EMPLOYEEID)
    VALUES (1, 'hops@local.com', 1),
           (2, 'bunny@hoppin.local', 1),
           (3, 'barnbarn@local.com', 2);
```

Create job titles:

```SQL
INSERT INTO JOBTITLES (JOBTITLEID, TITLE)
    VALUES (1, 'Big Boss'),
           (2, 'Wizard');
```

Now we have job titles and employees and can create a join table:

```SQL
INSERT INTO EMPLOYEETITLES (EMPLOYEEID, JOBTITLEID)
    VALUES (1, 1),
           (1, 2),
           (2, 2);
```

We have been manually assigning primary keys to our database tables. We need to let Spring JPA Hibernate know that we have used some of the primary keys. Hibernate cannot start assigning primary keys at 1, since 1 has already been used. We need to tell Hibernate at what number to start assigning primary keys:

```SQL
/*  Must tell hibernate of the id numbers already used.
The number after with must be greater that the highest number id assigned.  */
alter sequence hibernate_sequence restart with 15;
```

Complete `data.sql` file:

```SQL
DELETE
FROM EMPLOYEETITLES;

DELETE
FROM JOBTITLES;

DELETE
FROM EMAILS;

DELETE
FROM EMPLOYEES;

INSERT INTO EMPLOYEES (EMPLOYEEID, NAME)
    VALUES (1, 'CINNAMON'),
           (2, 'BARNBARN'),
           (3, 'JOHN');

INSERT INTO EMAILS (EMAILID, EMAIL, EMPLOYEEID)
    VALUES (1, 'hops@local.com', 1),
           (2, 'bunny@hoppin.local', 1),
           (3, 'barnbarn@local.com', 2);

INSERT INTO JOBTITLES (JOBTITLEID, TITLE)
    VALUES (1, 'Big Boss'),
           (2, 'Wizard');

INSERT INTO EMPLOYEETITLES (EMPLOYEEID, JOBTITLEID)
    VALUES (1, 1),
           (1, 2),
           (2, 2);

/*  Must tell hibernate of the id numbers already used.
The number after with must be greater that the highest number id assigned.  */
alter sequence hibernate_sequence restart with 15;
```

## Spring Data Relationships

When normalizing our database structure, we create relationships between tables. These relationships usually fall into two main categories: One to Many relationships and Many to Many relationships. After normalizing our data, we will end up with different types of tables. We created these models and classes in the first objective.

### main or driving tables.
These are tables that do not contain foreign keys. Other tables will reference them but they do not reference other tables. In our example, `Employees` is such a table.

### tables with foreign keys that are the one in a one to many relationship.
These tables can be viewed as child tables of the main tables as they cannot stand alone without the reference to the main table. In our example, `Emails` is such as a table. Its purpose is to reference the `Employees` table adding a list of emails to a row in the `Employees` table.

### join tables contain foreign keys to two tables, joining those tables in a many to many relationship.
In a Java Spring application, such a table usually does not have its own Model but is created through the ManyToMany annotation. In our example, the `Employeetitles` table is such a join table, joining `Employees` and `Jobtiles`.

## One to Many

A row in one table may relate to 0 or more rows in another table. This is the way lists of data are represented. In our example, an employee can have a list of emails so employee has a one to many relationship with emails. It can also be said that emails has a Many to One relationship with employee. Other examples of one to many relationships:

* book to pages
* person to todo or chores
* order to items in the order

Usually, this is represented graphically by an arrow. The start of the arrow is on the “one” table; the head of the arrow is on the “many” table.

![One to Many](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%202%20-%20JX%20Java%20-%20Read%20Data%20using%20CRUD%20Operations%20including%20Seeding%20Data/assets/sampleemps-db-onetomany.png)

In Java Spring we need to specify both the one to many relationship and the reverse many to one relationship. In each case we must provide a field to hold the data from the other table in the relationship. One to Many is from `Employee` to `Email` so we need a list of emails in employee. We use the annotation `@OneToMany` with attributes defining the relationship.

```java
    @OneToMany(mappedBy = "employee",
        cascade = CascadeType.ALL, // when adding, reading, updating, deleting, operations should affect emails table as well)
        orphanRemoval = true) // if we find a email with a reference to an employee that does not exist, delete that email record
    private List<Email> emails = new ArrayList<>();
```

Note that `employee` from the `mappedBy` attribute matches the `employee` field found right after the `ManyToOne` attribute. It is critical that these two be named the same including case. Many to One is from `Email` to `Employee`. Each email can only have one employee so we have a single Employee object in the Email table. We use the annotation `@ManyToOne` with attributes defining the relationship.

```java
    @ManyToOne
    @JoinColumn(name = "employeeid",
            nullable = false)
    private Employee employee;
```

Note that the `employeeid` in the `name` attribute must match exactly the primary key column from the `Employee` table.

Note that one to one relationship is a special case of the one to many relationship. The “many” side of the relationship is restricted to only one entry. Notice that the way this is set up, an employee can be assigned duplicate emails. Making emails unique to an individual employee would require us to implement custom queries and that is beyond the scope of this module. So, just remember, though not encouraged!, employees can have duplicates emails in their lists.

## Many to Many

Often in a database we have a list in one table and a list in the another. Each time from each list can be associated with 0 or more items from the other list. In our example we have `Employees` that can have 0 or more `Jobtitles` and a `Jobtitles` can be related to 0 or more `Employees`. Hence we have a Many to Many relationship. Other examples of Many to Many Relationships include:

* Authors to Books. Books can be written by multiple authors and authors can write multiple books
* Students to Classes. Students will take multiple classes and classes will have multiple students.
* Customers to Projects. Many Customers can buy the same project and customers can buy multiple products

Usually, this is represented by having an arrow from a join table to one of the lists with the head of the arrow pointing at the list. We then have another arrow from the join table to other list with the head of the arrow pointing at the other list. So in reality a Many to Many relationship is made up of two One to Many relationships. So in our example:

* Each row in our join table will have only one employee but can have many rows with the same employee.
* Each row in our join table will have only one job title but can have many rows with the same job title.
* Normally we restrict our join table to have a unique combination of employee and job title.
* We will see later how to manually implement a many to many relationship using this one to many idea.

![Many to Many](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%202%20-%20JX%20Java%20-%20Read%20Data%20using%20CRUD%20Operations%20including%20Seeding%20Data/assets/sampleemps-db-manytomany.png)

In Java Spring we specify the many to many relationship in each table that is involved in the relationship. We decide on one table to be the main table. In our case we will pick `Employee`. It does not matter which table we pick. In our case the titles describe the employees, so without employees there would be no reason for job titles. Hence I picked Employee for our driving table. In the `Employee` model we add this code.

```java
    @ManyToMany()
    /*  JoinTable is name of a table that will get created in database combining two primary keys making up this relationship
     *  joinColumn is primary key of main, driving, table
     *  inverseJoinColumns is the primary key of the other table in the relationship  */
    @JoinTable(name = "employeetitles",
            joinColumns = @JoinColumn(name = "employeeid"),
            inverseJoinColumns = @JoinColumn(name = "jobtitleid"))
    List<JobTitle> jobtitles = new ArrayList<>();
```

It is critical that the JoinColumn names match exactly case and all with the respective primary keys of the tables being joined. Now in the JobTitle model we add this code:

```java
    @ManyToMany(mappedBy = "jobtitles")
    private List<Employee> employees = new ArrayList<>();
```

Each model provides a private field LIST to hold the other model’s data. The `mappedBy` attribute matches exactly the list name given in the `Employee` model, the other model.

## One to Many

Under the subpackage `models` create the class `Employee`
* Enter the following code in that class with lowercase letters
    * All field names that will become columns are lowercase. This is by design. This way we do not have be concerned with how JPA will interpret the column names. They will be lowercase!
    * All table names are lowercase. That way we do not have to worry about how JPA will interpret our table names.
    * We also always give a table name. That way we do not have to worry about how JPA will interpret our Entity, Model name.
* Getters and Setters can be generated in IntelliJ

```java
package com.lambdaschool.sampleemps.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "employees")
public class Employee
{

    @ManyToMany()
    /*
     * Note: JoinTable is the name of a table that will get created in the database combining the two primary keys making up this relationship
     *       joinColumn is the primary key of the main, driving, table
     *       inverseJoinColumns is the primary key of the other table in the relationship
     */
    @JoinTable(name = "employeetitles",
        joinColumns = @JoinColumn(name = "employeeid"),
        inverseJoinColumns = @JoinColumn(name = "jobtitleid"))
    @JsonIgnoreProperties("employees")
    List<JobTitle> jobtitles = new ArrayList<>();

    @Id // The primary key
    @GeneratedValue(strategy = GenerationType.AUTO) // We will let the database decide how to generate it
    private long employeeid; // long so we can have many rows

    private String name;

    @OneToMany(mappedBy = "employee",
        cascade = CascadeType.ALL,
        // when adding, reading, updating, and delete, the operations should affect the emails table as well)
        orphanRemoval = true)
    // if we find a email that has a reference to an employee that does not exist, delete that email record
    @JsonIgnoreProperties("employee")
    private List<Email> emails = new ArrayList<>();

    public Employee()
    {
        // the default constructor is required by the JPA
    }

    // Getters and Setters begin, can be generated
    public long getEmployeeid()
    {
        return employeeid;
    }

    public void setEmployeeid(long employeeid)
    {
        this.employeeid = employeeid;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public List<Email> getEmails()
    {
        return emails;
    }

    public void setEmails(List<Email> emails)
    {
        this.emails = emails;
    }

    public List<JobTitle> getJobtitles()
    {
        return jobtitles;
    }

    public void setJobtitles(List<JobTitle> jobtitles)
    {
        this.jobtitles = jobtitles;
    }
}
```

Under the subpackage `models` create the class `Email`

```java
package com.lambdaschool.sampleemps.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "emails")
public class Email
{
    @Id // The primary key
    @GeneratedValue(strategy = GenerationType.AUTO) // We will let the database decide how to generate it
    private long emailid; // long so we can have many rows

    private String email;

    @ManyToOne
    @JoinColumn(name = "employeeid",
        nullable = false)
    @JsonIgnoreProperties("emails")
    private Employee employee;

    public Email()
    {
        // the default constructor is required by the JPA
    }

    // Getters and Setters begin. These can be generated!
    public long getEmailid()
    {
        return emailid;
    }

    public void setEmailid(long emailid)
    {
        this.emailid = emailid;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public Employee getEmployee()
    {
        return employee;
    }

    public void setEmployee(Employee employee)
    {
        this.employee = employee;
    }
}
```

## Many to Many

Under the subpackage `models` create the class `JobTitle`

```java
package com.lambdaschool.sampleemps.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobtitles")
public class JobTitle
{
    @Id // The primary key
    @GeneratedValue(strategy = GenerationType.AUTO) // We will let the database decide how to generate it
    private long jobtitleid; // long so we can have many rows

    private String title;

    @ManyToMany(mappedBy = "jobtitles")
    @JsonIgnoreProperties("jobtitles")
    private List<Employee> employees = new ArrayList<>();

    public JobTitle()
    {
        // the default constructor is required by the JPA
    }

    // Getters and Setters begin. These can be generated
    public long getJobtitleid()
    {
        return jobtitleid;
    }

    public void setJobtitleid(long jobtitleid)
    {
        this.jobtitleid = jobtitleid;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public List<Employee> getEmployees()
    {
        return employees;
    }

    public void setEmployees(List<Employee> employees)
    {
        this.employees = employees;
    }
}
```

## JsonIgnoreProperties

Without some intervention, our responses will end up in infinite loops constantly requesting information. This happens any time we have relationships: `@ManyToMany`, `@OneToMany`, `@ManyToOne`, `@OneToOne`, any relationships! Let’s look at an example: the One To Many relationship between Employee and Email. To represent this relationship, in the `Employee` model we have:

```java
    @OneToMany(mappedBy = "employee",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Email> emails = new ArrayList<>();
```

To represent this relationship, in the `Email` model we have:

```java
    @ManyToOne
    @JoinColumn(name = "employeeid",
            nullable = false)
    private Employee employee;
```

If we run the application as it stands, our output results in an infinite loop. 

```javascript
[
    {
        "employeeid": 1,
        "name": "CINNAMON",
        "emails": [
            {
                "emailid": 1,
                "email": "hops@local.com",
                "employee": {
                    "employeeid": 1,
                    "name": "CINNAMON",
                    "emails": [
                        {
                            "emailid": 1,
                            "email": "hops@local.com",
                            "employee": {
                                "employeeid": 1,
                                "name": "CINNAMON",

<... continues ...>
```

An Employee’s data gets displayed. Part of this display is list of Emails
* Thus an Email object gets printed. The Email object includes an Employee Object
Thus an Employee’s data gets displayed. Part of this display is list of Emails
* Thus an Email object gets printed. The Email object includes an Employee Object
Thus an Employee’s data gets displayed. Part of this display is list of Emails
* Thus an Email object gets printed. The Email object includes an Employee Object

And so and so for ever. Somehow we need to stop the cycle! Here is what we do:

* When we are printing an Employee and say to display the Email, don’t display the Employee again in the Email Object. This is the `employee` field.
* When we are printing an Email and say to display the Employee, don’t display the Email again in the Employee Object. This is the `emails` field.
* When we are setting the data, getting it in from a client, the client is smart enough to not send unlimited data so we can allow for getting data in - allowsetters. We do not allow data going out - no allowgetters.

We do this by using the annotation `@JsonIgnoreProperties`. In the `Employee` model we update the One To Many with the `@JsonIgnoreProperties("employee", )` annotation

```java
    @OneToMany(mappedBy = "employee",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonIgnoreProperties("employee")
    private List<Email> emails = new ArrayList<>();
```

In the `Email` model we update the Many to One relationship with the `@JsonIgnoreProperties("emails")`. And we only want to ignore property when we are reading the data.

```java
    @ManyToOne
    @JoinColumn(name = "employeeid",
            nullable = false)
    @JsonIgnoreProperties("emails")
    private Employee employee;
```

We are telling JSON to ignore the field of the current model when printing the other model. For example inside the Employee model, we annotate `@JsonIgnoreProperties` with the Employee field. Also notice that we name the field using the field name from the other model. Thus in the Employee model we say to ignore the employee object called `employee`. In the Email model we say to ignore the list of emails `emails`. We now have this complete output: 

```javascript
[
    {
        "employeeid": 1,
        "name": "CINNAMON",
        "emails": [
            {
                "emailid": 1,
                "email": "hops@local.com"
            },
            {
                "emailid": 2,
                "email": "bunny@hoppin.local"
            }
        ],
        "jobtitles": [
            {
                "jobtitleid": 1,
                "title": "Big Boss"
            },
            {
                "jobtitleid": 2,
                "title": "Wizard"
            }
        ]
    },
    {
        "employeeid": 2,
        "name": "BARNBARN",
        "emails": [
            {
                "emailid": 3,
                "email": "barnbarn@local.com"
            }
        ],
        "jobtitles": [
            {
                "jobtitleid": 2,
                "title": "Wizard"
            }
        ]
    },
    {
        "employeeid": 3,
        "name": "JOHN",
        "emails": [],
        "jobtitles": []
    }
]
```

You will need to do something similar for each relationship in your application.

JsonIgnoreProperties works great for ending this recursive cycle of reporting. If you wish to ignore a specific field in a class, you do not want a specific field to be displayed to the client, for example someone’s password, you would use the annotation `JsonProperty(access = JsonProperty.Access.WRITE_ONLY)`. This allows to write a new password but not display it.

## Advanced Queries with JPA

Getting data from the database is called Querying the database. Normally we want a subset of the available data which we specify with some search conditions. We say how we want to filter the data. The best way to do this is by using Java Spring Data Java Persistence API, the JPA. Note that the JPA does exist outside of Java Spring Data. However, when combined with Spring Data and Hibernate, the JPA really shines. The queries that are produced through Java Spring Data JPA are highly efficient. Many man hours have gone into making these queries good so let’s take advantage of that!

We can access to the Spring Data JPA when we create the repository connecting our Java application to our database. For example, the `CrudRepository` interface gives us access to the Spring Data JPA. Notice that we are creating an interface extending an interface. Note that an interface can extend another interface just like a class can extend another class.

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long>
{
}
```

By default we have access to many standard querying methods. These include:

|Modifier and Type|Method|Description|
|-----------------|------|-----------|
|long|count()|Returns the number of records|
|boolean|existsById (long id)|Returns whether a record with the given id exists|
|Iterable< T >|findAll()|Returns an iterable list of all objects in the table|
|Iterable< T >|findAllById (Iterable< long > ids)|Returns an iterable list of all objects in the table with the ids found in the given list|
|Optional< T >|findById(long id)|Returns an optional of the record with the given id|

Also included by default are data manipulation methods:

|Modifier and Type|Method|Description|
|-----------------|------|-----------|
|void|delete (T object)|deletes the given object from the table|
|void|deleteAll()|deletes all records in the table|
|void|deleteAll(Iterable<? extends T> objects)|deletes the objects in the iterable list from the table|
|void|deleteById(Long id)|deletes the record with the given primary key id|
|Object|save (S object)|The record is saved or updated based on the presence of the primary key. If no primary key is given, one is generated and the record is added to the database. If a primary key is given and the primary key exists in the database, the record with that primary key is replaced. If a primary key is given and the primary key does not exists in the database, the record is added to the database with that primary key. The object is returned including any generated primary key|
|Iterable < S >|saveAll(Iterable<? extends T> objects)|All records in the iterable list are added or updated based on the presence of the primary key. The primary key is handled as in the save method. An iterable list is returned with all the saved objects including any generated primary keys.|

These we can use directly in our services. For example, the following code from the EmployeeServiceImpl class, returns a list of all records in the employee table

```java
    public List<Employee> findAllEmployees()
    {
        List<Employee> list = new ArrayList<>();
        /*
         * findAll returns an iterator set.
         * iterate over the iterator set and add each element to an array list.
         */
        employeerepos.findAll().iterator().forEachRemaining(list::add);
        return list;
    }
```

However, we can add an almost unlimited number of highly efficient queries by exposing other methods. For example, we can search for employees whose name contains a given substring and in the process we want the search to be case insensitive, then we expose another method in our repository:

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long>
{
    List<Employee> findByNameContainingIgnoreCase(String subname);
}
```

We can then set up to use this method from our repository in our service interface:

```java
public interface EmployeeService
{
    <... other code ...>
    List<Employee> findEmployeeNameContaining(String subname);
}
```

And finally use the method in our service interface implementation:

```java
    @Override
    public List<Employee> findEmployeeNameContaining(String subname)
    {
        return findEmployeeNameContaining(subname);
    }
```

And of course to access it the appropriate code will need to be added to the Employee Controller

```java
    @GetMapping(value = "/employeename/{subname}")
    public ResponseEntity<?> listEmployeesWithName(
        @PathVariable
            String subname)
    {
        List<Employee> myEmployees = employeeService.findEmployeeNameContaining(subname);
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }
```

Here is a break down of what got included in the exposed methods name. We MUST name our methods using these keywords and field names. Field names start with a capital letter and followed by lowercase letters (We know this because we ALWAYS make our field names all lowercase in our models).

|Action|findBy|data|filters|
|------|------|----|-------|
|The format is|findBy|< FieldName(s) with optional AND, OR >|< Qualifiers >|
|yielding|findBy|Employee|ContainingIgnoreCase|

This table is taken from the Spring IO JPA Query Creation link found in the Additional Resources and gives all the available keywords!

![JPA Table](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%202%20-%20JX%20Java%20-%20Read%20Data%20using%20CRUD%20Operations%20including%20Seeding%20Data/assets/JX-SP11-M2-06.png)

Advanced topic: We can include field names from other tables as well. Let’s say we want to search for employees whose email contains a given substring, for example a certain domain. We can now expose a method in the employee repository as follows:

```java
public interface EmployeeRepository extends CrudRepository<Employee, Long>
{
    <... other code ...>

    List<Employee> findByEmails_EmailContainingIgnoreCase(String subemail);
}
```

Notice we gave the field name representing the other table `Emails` followed by `_` followed by the field name from the other table `Email`! Now we can set this up in our service interface

```java
public interface EmployeeService
{
    <... other code ...>

    List<Employee> findEmployeeEmailContaining(String subemail);
}
```

Implement it in the service interface implementation

```java
    @Override
    public List<Employee> findEmployeeEmailContaining(String subemail)
    {
        return employeerepos.findByEmails_EmailContainingIgnoreCase(subemail);
    }
```

And access it from the Employee Controller

```java
    @GetMapping(value = "/employeeemail/{subemail}")
    public ResponseEntity<?> listEmployeesWithEmail(
        @PathVariable
            String subemail)
    {
        List<Employee> myEmployees = employeeService.findEmployeeEmailContaining(subemail);
        return new ResponseEntity<>(myEmployees,
            HttpStatus.OK);
    }
```

We need to finish creating our code started in Objective 1 CRUD Reading and worked on in the following objectives.

Under the subpackage `repositories` create the class `EmployeeRepository`

```java
package com.lambdaschool.sampleemps.repositories;

import com.lambdaschool.sampleemps.models.Employee;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EmployeeRepository
    extends CrudRepository<Employee, Long>
{
    List<Employee> findByNameContainingIgnoreCase(String subname);

    List<Employee> findByEmails_EmailContainingIgnoreCase(String subemail);
}
```

Under the subpackage `services` create the interface `EmployeeService`

```java
package com.lambdaschool.sampleemps.services;

import com.lambdaschool.sampleemps.models.Employee;

import java.util.List;

public interface EmployeeService
{
    List<Employee> findAllEmployees();

    List<Employee> findEmployeeNameContaining(String subname);

    List<Employee> findEmployeeEmailContaining(String subemail);
}
```

Under the subpackage `services` implement the interface `EmployeeService` in the class EmployeeServiceImpl. You could try generating the override method headers and then fill in the rest of the code.

```java
package com.lambdaschool.sampleemps.services;

import com.lambdaschool.sampleemps.models.Employee;
import com.lambdaschool.sampleemps.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service(value = "employeeSerivce") // needed to name this implementation as the service to use
public class EmployeeServiceImpl
    implements EmployeeService // notice the Impl for implementing a service
{
    @Autowired
    private EmployeeRepository employeerepos;

    @Override
    public List<Employee> findAllEmployees()
    {
        List<Employee> list = new ArrayList<>();
        /*
         * findAll returns an iterator set.
         * iterate over the iterator set and add each element to an array list.
         */
        employeerepos.findAll()
            .iterator()
            .forEachRemaining(list::add);
        return list;
    }

    @Override
    public List<Employee> findEmployeeNameContaining(String subname)
    {
        return employeerepos.findByNameContainingIgnoreCase(subname);
    }

    @Override
    public List<Employee> findEmployeeEmailContaining(String subemail)
    {
        return employeerepos.findByEmails_EmailContainingIgnoreCase(subemail);
    }
}
```

Now the sample employees application should work.
