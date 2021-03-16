# Data Modeling and Auditing Fields with custom querying

At the end of this module, you should be able to:
* add additional fields to a Many to Many Join Table
* add standard auditing fields to each table
* populate and display standard auditing fields
* use SQL, JPA and Hibernate to perform custom query operations on a RDBMS through a Spring Application
* use SQL, JPA and Hibernate to perform custom data manipulation operations on a RDBMS through a Spring Application
* implement default Swagger documentation
* print the default Swagger documentation

# Learn to add additional fields to a Many to Many Join Table

We have a new business rule. When an employee is added to a Job Title, we need to add the name of their manager for that Job Title. In other words, our Join Table needs an additional attribute, column. This is a very common situation so let’s do it!

First, we need to know that our `@ManyToMany` annotation does not allow us to add additional fields to the join table. If you look at the database diagram, you can see that our Many to Many relation gets implemented using two One to Many relations.

![](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%204%20-%20JX%20Java%20-%20Data%20Modeling%20and%20Auditing%20Fields%20with%20custom%20querying/assets/JX-SP11-M4-01.png)

* One Employee to Many employee, job titles combinations
* One Job title to Many employee, job titles combinations

We will make use of this construct to add our manager column.

The idea is to make changes to our database, allowing us to add this column. In making those changes, we want to impact our users, clients, as little as possible. So, we will keep our controllers the same. The data being sent to and from our application will have to change slightly to accommodate the new field. This is a great time to use the file comparison tool in IntelliJ (See the objective on IntelliJ Tips and Tricks from a previous module) -> comparing the these two applications

https://github.com/LambdaSchool/java-sampleemps/tree/master/sampleemps_create_delete_update
https://github.com/LambdaSchool/java-sampleemps/tree/master/sampleemps_data_modeling

do note that the second application has code from several different objectives for this module!

Let’s take the repo https://github.com/LambdaSchool/java-sampleemps.git/sampleemps_create_delete_update and transform it into the repo https://github.com/LambdaSchool/java-sampleemps.git/sampleemps_data_modeling step by step!

Create the join table class `models.Employeetitles` with the extra manager column. This is a brand new class. Much of the code is straightforward and commented below. However, we do have a new issue, a compound primary key. This is where more than 2 or more fields are combined to make the primary key. In our case, we are combining `employeeid` and `jobtitleid`.

Notice that each field has the @Id annotation signifying they are part of the primary key. Since we have a compound primary key, we must implement the interface `Serializable` to aid in generating JSON Objects of this class.
* When you implement Serializable, you also have to implement equals and hashCode. This is done in a method similar to adding Getters and Setters
* Right click in the class where you want to add the new code. Select `Generate...` -> `equals() and hashCode()`. In the dialog box:
  * Make sure `Use getters during code generation` is checked
  * Make sure `Accept subclasses as parameters to equals()` method is NOT checked
  
![](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%204%20-%20JX%20Java%20-%20Data%20Modeling%20and%20Auditing%20Fields%20with%20custom%20querying/assets/JX-SP11-M4-02.png)

In the next dialog box, check that all fields are included in the `equals()` method. This is the norm.

![](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%204%20-%20JX%20Java%20-%20Data%20Modeling%20and%20Auditing%20Fields%20with%20custom%20querying/assets/JX-SP11-M4-03.png)

In the next dialog box, check that all fields are included in the `hashCode()` method. This is the norm.

![](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%204%20-%20JX%20Java%20-%20Data%20Modeling%20and%20Auditing%20Fields%20with%20custom%20querying/assets/JX-SP11-M4-04.png)

The next dialog box requires some thought. You want to check all the fields that cannot be NULL. In our code, none of the fields can be NULL so I have checked all fields.

![](https://lambdaschool.github.io/java-curriculum-assets/Sprint%2011%20-%20Java%20with%20RDBMS%20and%20API%20Intros/Module%204%20-%20JX%20Java%20-%20Data%20Modeling%20and%20Auditing%20Fields%20with%20custom%20querying/assets/JX-SP11-M4-05.png)

Now click finished and see the code get generated for you!

Code for `models.EmployeeTitles`

```java
package com.lambdaschool.sampleemps.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
/*
 * Table enforces a unique constraint of the combination of employeeid and jobtitleid.
 * These two together form the primary key.
 *
 * Use of the uniqueConstraint at the class level is the best way to enforce a two or more column unique constraint.
 */
@Table(name = "employeetitles",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"employeeid", "jobtitleid"})})
/*
 * When you have a compound primary key, you must implement Serializable for Hibernate
 * When you implement Serializable you must implement equals and hash code
 */
public class EmployeeTitles implements Serializable
{
    /*
     * 1/2 of the primary key (long) for employeetitles.
     * Also is a foreign key into the Employee table
     */
    @Id
    @ManyToOne
    /*
     * Many of these records can point to a single Employee. In other words, an employee can have multiple job titles
     */
    @JoinColumn(name = "employeeid")
    @JsonIgnoreProperties(value = "jobnames",
        allowSetters = true)
    private Employee emp;

    /*
     * 1/2 of the primary key (long) for employeetitles.
     * Also is a foreign key into the JobTitle table
     */
    @Id
    /*
     * Many of these records can point to a single JobTitle. In other words, multiple employees can have the same job title
     */
    @ManyToOne
    @JoinColumn(name = "jobtitleid")
    @JsonIgnoreProperties(value = "empnames",
        allowSetters = true)
    private JobTitle jobname;

    /*
     * Our extra field - why we are going all this hassle!
     */
    @Column(nullable = false)
    private String manager;

    /*
     * JPA requires the default constructor
     */
    public EmployeeTitles()
    {
    }

    /*
     * Allows us to easily create a record given all the data
     */
    public EmployeeTitles(
        Employee emp,
        JobTitle jobname,
        String manager)
    {
        this.emp = emp;
        this.jobname = jobname;
        this.manager = manager;
    }

    /*
     * Our standard getters and setters
     */
    public Employee getEmp()
    {
        return emp;
    }

    public void setEmp(Employee emp)
    {
        this.emp = emp;
    }

    public JobTitle getJobname()
    {
        return jobname;
    }

    public void setJobname(JobTitle jobname)
    {
        this.jobname = jobname;
    }

    public String getManager()
    {
        return manager;
    }

    public void setManager(String manager)
    {
        this.manager = manager;
    }

    /*
     * Since we have implemented Serializable - required for the compound primary key,
     * We have also Override equals and hashCode. This is done through the same menu system
     * as generating getters and setters. We pick equals() and hashCode() from that context menu
     * and generate them.
     */
    @Override
    public boolean equals(Object o)
    {
        if (this == o)
        {
            return true;
        }
        if (o == null || getClass() != o.getClass())
        {
            return false;
        }
        EmployeeTitles that = (EmployeeTitles) o;
        return getEmp().equals(that.getEmp()) &&
            getJobname().equals(that.getJobname()) &&
            manager.equals(that.manager);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(getEmp(),
            getJobname(),
            manager);
    }
}
```

The Many To Many attributes in the Employee and JobTitle have to be replaced with One To Many relationships. Since we are changing the fields of the class, the Getters and Setters have to change. These changes are documented below.

Code changes for `models.Employee`:

Replace the following ManyToMany Relationship

```java
    @ManyToMany()
    /*
     * Note: JoinTable is the name of a table that will get created in the database combining the two primary keys making up this relationship
     *       joinColumn is the primary key of the main, driving, table
     *       inverseJoinColumns is the primary key of the other table in the relationship
     */
    @JoinTable(name = "employeetitles",
        joinColumns = @JoinColumn(name = "employeeid"),
        inverseJoinColumns = @JoinColumn(name = "jobtitleid"))
    @JsonIgnoreProperties(value = "employees",
        allowSetters = true)
    List jobtitles = new ArrayList<>();
```

With the OneToMany Relationship

```java
    /*
     * emp is the field from EmployeeTitles
     * CascadeType.ALL says that when we add, update, delete an Employee record, have that affect emp in EmployeeTitle.
     * Notice that in EmployeeTitle there is no cascade option. This way manipulating an Employee record only affects
     * the EmployeeTitle join table but does not affect the JobTitle table.
     */
    @OneToMany(mappedBy = "emp",
        cascade = CascadeType.ALL)
    /*
     * When displaying EmployeeTitles from the Employee class, do not display the employee again.
     * However do allow for data to be added to the emp field in EmployeeTitles
     */
    @JsonIgnoreProperties(value = "emp",
        allowSetters = true)
    /*
     * We know all of this works with EmployeeTitles because that is the class of the field name that making the One To Many relationship!
     * This array contains the list of EmployeeTitles assigned to this Employee
     */
    private List jobnames = new ArrayList<>();
```

Add this constructor to better work with Seed Data

```java
    public Employee(
        String name,
        double salary,
        List jobnames)
    {
        this.name = name;
        this.salary = salary;

        /*
         * Force the list of roles to be associated with this new employee object!
         */
        for (EmployeeTitles et : jobnames)
        {
            et.setEmp(this);
        }
        this.jobnames = jobnames;
    }
```

Replace these Getters and Setters and helper functions

```java
    public List getJobtitles()
    {
        return jobtitles;
    }

    public void setJobtitles(List jobtitles)
    {
        this.jobtitles = jobtitles;
    }

    public void addJobTitle(JobTitle jt)
    {
        jobtitles.add(jt);
        jt.getEmployees()
            .add(this);
    }

    public void removeJobTitle(JobTitle jt)
    {
        jobtitles.remove(jt);
        jt.getEmployees()
            .remove(this);
```

With ones that work with the new fields

```java
    /*
     * We need a getter for the new One To Many relations
     */
    public List getJobnames()
    {
        return jobnames;
    }

    /*
     * We need a setter for the new One To Many relations
     */
    public void setJobnames(List jobnames)
    {
        this.jobnames = jobnames;
    }

    /*
     * Due to the new One To Many relation, we need a new way to add a Job Title to the employee
     */
    public void addJobTitle(
        JobTitle jobTitle,
        String manager)
    {
        jobnames.add(new EmployeeTitles(this,
            jobTitle,
            manager));
    }
```

There is no new `removeJobTitle`

Full `models.Employee` class incorporating all changes

```java
package com.lambdaschool.sampleemps.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "employees")
@JsonIgnoreProperties(value = {"hasvalueforsalary"})
public class Employee
{
    @Id // The primary key
    @GeneratedValue(strategy = GenerationType.AUTO) // We will let the database decide how to generate it
    private long employeeid; // long so we can have many rows

    @Column(nullable = false,
        unique = true)
    private String name;

    /**
     * Used to determine if the field salary has been set or is NULL.
     */
    @Transient
    public boolean hasvalueforsalary = false;

    private double salary;

    /*
     * emp is the field from EmployeeTitles
     * CascadeType.ALL says that when we add, update, delete an Employee record, have that affect emp in EmployeeTitle.
     * Notice that in EmployeeTitle there is no cascade option. This way manipulating an Employee record only affects
     * the EmployeeTitle join table but does not affect the JobTitle table.
     */
    @OneToMany(mappedBy = "emp",
        cascade = CascadeType.ALL)
    /*
     * When displaying EmployeeTitles from the Employee class, do not display the employee again.
     * However do allow for data to be added to the emp field in EmployeeTitles
     */
    @JsonIgnoreProperties(value = "emp",
        allowSetters = true)
    /*
     * We know all of this works with EmployeeTitles because that is the class of the field name that making the One To Many relationship!
     * This array contains the list of EmployeeTitles assigned to this Employee
     */
    private List jobnames = new ArrayList<>();

    /*
     * This starts the One To Many relation of employee to emails
     */
    @OneToMany(mappedBy = "employee",
        cascade = CascadeType.ALL,
        // when adding, reading, updating, and delete, the operations should affect the emails table as well)
        orphanRemoval = true)
    // if we find a email that has a reference to an employee that does not exist, delete that email record
    @JsonIgnoreProperties(value = "employee",
        allowSetters = true)
    private List emails = new ArrayList<>();

    public Employee()
    {
        // the default constructor is required by the JPA
    }

    public Employee(
        String name,
        double salary,
        List jobnames)
    {
        this.name = name;
        this.salary = salary;

        /*
         * Force the list of roles to be associated with this new employee object!
         */
        for (EmployeeTitles et : jobnames)
        {
            et.setEmp(this);
        }
        this.jobnames = jobnames;
    }

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

    public double getSalary()
    {
        return salary;
    }

    public void setSalary(double salary)
    {
        hasvalueforsalary = true;
        this.salary = salary;
    }

    public List getEmails()
    {
        return emails;
    }

    public void setEmails(List emails)
    {
        this.emails = emails;
    }

    /*
     * We need a getter for the new One To Many relations
     */
    public List getJobnames()
    {
        return jobnames;
    }

    /*
     * We need a setter for the new One To Many relations
     */
    public void setJobnames(List jobnames)
    {
        this.jobnames = jobnames;
    }

    /*
     * Due to the new One To Many relation, we need a new way to add a Job Title to the employee
     */
    public void addJobTitle(
        JobTitle jobTitle,
        String manager)
    {
        jobnames.add(new EmployeeTitles(this,
            jobTitle,
            manager));
    }
}
```

We finished our work with the Employee model. Now to work with the other side, Job Titles. Since we have declared Employees to be our driving table, `JobTitles` is much easier

Code changes for `models.JobTitle`

Replace the following `ManyToMany` Relationship

```java
    @ManyToMany(mappedBy = "jobtitles")
    @JsonIgnoreProperties(value = "jobtitles",
        allowSetters = true)
    private List employees = new ArrayList<>();
```

With the `OneToMany` Relationship

```java
    /*
     * jobname is the field from EmployeeTitles
     * CascadeType.ALL says that when we add, update, delete an Job Title record, have that affect jobname in EmployeeTitle.
     * Notice that in EmployeeTitle there is no cascade option. This way manipulating an JobTitle record only affects
     * the EmployeeTitle join table but does not affect the Employee table.
     */
    @OneToMany(mappedBy = "jobname",
        cascade = CascadeType.ALL)
    /*
     * When displaying EmployeeTitles from the JobTitle class, do not display the Job Title again.
     * However do allow for data to be added to the jobname field in EmployeeTitles
     */
    @JsonIgnoreProperties(value = "jobname",
        allowSetters = true)
    /*
     * We know all of this works with EmployeeTitles because that is the class of the field name that making the One To Many relationship!
     * This array contains the list of EmployeeTitles assigned to this Job Title
     */
    private List empnames = new ArrayList<>();
```

Replace these Getters and Setters and helper functions

```java
    public List getEmployees()
    {
        return employees;
    }

    public void setEmployees(List employees)
    {
        this.employees = employees;
    }
```

With ones that work with the new fields

```java
    public List getEmpnames()
    {
        return empnames;
    }

    public void setEmpnames(List empnames)
    {
        this.empnames = empnames;
    }
```

The full `models.JobTitles` class incorporating all changes

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

    @Column(nullable = false,
        unique = true)
    private String title;

    /*
     * jobname is the field from EmployeeTitles
     * CascadeType.ALL says that when we add, update, delete an Job Title record, have that affect jobname in EmployeeTitle.
     * Notice that in EmployeeTitle there is no cascade option. This way manipulating an JobTitle record only affects
     * the EmployeeTitle join table but does not affect the Employee table.
     */
    @OneToMany(mappedBy = "jobname",
        cascade = CascadeType.ALL)
    /*
     * When displaying EmployeeTitles from the JobTitle class, do not display the Job Title again.
     * However do allow for data to be added to the jobname field in EmployeeTitles
     */
    @JsonIgnoreProperties(value = "jobname",
        allowSetters = true)
    /*
     * We know all of this works with EmployeeTitles because that is the class of the field name that making the One To Many relationship!
     * This array contains the list of EmployeeTitles assigned to this Job Title
     */
    private List empnames = new ArrayList<>();

    public JobTitle()
    {
        // the default constructor is required by the JPA
    }

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

    public List getEmpnames()
    {
        return empnames;
    }

    public void setEmpnames(List empnames)
    {
        this.empnames = empnames;
    }
}
```

We also have to make some changes to the `EmployeeServiceImpl`. Some of the updates require using custom SQL. These will be covered elsewhere. But for now, the save and update methods need to be updated. See code below. Comments marked with `/* */` describe changes.

Updated methods code for `services.EmployeeServiceImpl`

```java
    /******* THE SAVE METHOD ******/
    @Transactional
    @Override
    public Employee save(Employee employee)
    {
        Employee newEmployee = new Employee();

        if (employee.getEmployeeid() != 0)
        {
            Employee oldEmp = employeerepos.findById(employee.getEmployeeid())
                .orElseThrow(() -> new EntityNotFoundException("Employee " + employee.getEmployeeid() + " Not Found"));

            /* adding the following code */
            // delete the job titles for the old employee we are replacing
            for (EmployeeTitles et : oldEmp.getJobnames())
            {
                System.out.println("~~~~~~~~~~ Will be a Custom Query ~~~~~~~~~~");
            }
            /* adding the above code */

            newEmployee.setEmployeeid(employee.getEmployeeid());
        }
        newEmployee.setName(employee.getName());
        newEmployee.setSalary(employee.getSalary());

        /* changing Jobtitles to Jobnames */
        newEmployee.getJobnames()
            .clear();
        /* adding the if statement including the new else part */
        if (employee.getEmployeeid() == 0)
        {
            for (EmployeeTitles et : employee.getJobnames())
            {
                /* changing how we find the job title id due to changes in database structure */
                JobTitle newET = jtrepos.findById(et.getJobname()
                    .getJobtitleid())
                    .orElseThrow(() -> new EntityNotFoundException("JobTitle " + et.getJobname()
                        .getJobtitleid() + " Not Found"));

                /* adding manager to our list */
                newEmployee.addJobTitle(newET,
                    et.getManager());
            }
        } else
        {
            /* else is new */
            // add the new job titles for the employee we are replacing!
            for (EmployeeTitles et : employee.getJobnames())
            {
                System.out.println("~~~~~~~~~~ Will be a Custom Query ~~~~~~~~~~");
            }
        }

        newEmployee.getEmails()
            .clear();
        for (Email e : employee.getEmails())
        {
            Email newEmail = new Email();
            newEmail.setEmail(e.getEmail());
            newEmail.setEmployee(newEmployee);

            newEmployee.getEmails()
                .add(newEmail);
        }

        return employeerepos.save(newEmployee);
    }





    /******* THE UPDATE METHOD *******/
    @Transactional
    @Override
    public Employee update(
        Employee employee,
        long employeeid)
    {
        Employee currentEmployee = employeerepos.findById(employeeid)
            .orElseThrow(() -> new EntityNotFoundException("Employee " + employeeid + " Not Found"));

        if (employee.getName() != null)
        {
            currentEmployee.setName(employee.getName());
        }

        if (employee.hasvalueforsalary)
        {
            currentEmployee.setSalary(employee.getSalary());
        }

        /* replacing jobtitles with Jobnames */
        if (employee.getJobnames()
            .size() > 0)
        {
            /* replace the whole body of this if statement with the following */
            // delete the roles for the old employee we are replacing
            for (EmployeeTitles et : currentEmployee.getJobnames())
            {
                System.out.println("~~~~~~~~~~ Will be a Custom Query ~~~~~~~~~~");
            }

            // add the roles for the new employee we are replacing with
            for (EmployeeTitles et : employee.getJobnames())
            {
                System.out.println("~~~~~~~~~~ Will be a Custom Query ~~~~~~~~~~");
            }
        }

        if (employee.getEmails()
            .size() > 0)
        {
            currentEmployee.getEmails()
                .clear();
            for (Email e : employee.getEmails())
            {
                Email newEmail = new Email();
                newEmail.setEmail(e.getEmail());
                newEmail.setEmployee(currentEmployee);

                currentEmployee.getEmails()
                    .add(newEmail);
            }
        }

        return employeerepos.save(currentEmployee);
    }
```

The controllers do not change.

# Learn to add standard auditing fields to each table
