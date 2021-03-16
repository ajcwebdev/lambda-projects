# Learn to perform CRUD operations on an RDBMS JPA and Hibernate (Creating and Updating Records)

Previously we used the following annotation to say not to display certain fields. This prevented us from getting into an endless loop where we would displaying data. However, we do have to allow the data coming from the client to be saved, updated. In other words, we do not want to use Getters on certain data but do want to use Setters. Each `@JsonIgnoreProperty` for a field needs to be updated with `allowSetters = true` as in the following example from models.

In the Employee class:

```java
@JsonIgnoreProperties(value = "employees",
    allowSetters = true)
List<JobTitle> jobtitles = new ArrayList<>();
```

I am going to add a double field for salary to our Employee model. Primitive data types in Java do not have NULL values and we will need to adjust for those. These include byte, short, int, long, float, double, boolean, char. They are not objects so NULL has no meaning for them. In CRUD applications, certain operations require us to handle these separately. I wanted such a field to use as an example.

## POST

Let’s first add an employee record to our database. We will then update that record by completely replacing it with new data.

This endpoint:
POST http://localhost:2019/employees/employee

Sent with this Request Body:

```javascript
{
    "jobtitles": [
        {
            "jobtitleid": 2,
            "title": "Wizard" // here the title of the job is optional!
        }
    ],
    "name": "Mojo",
    "salary": 100000.00,
    "emails": [
        {
            "email": "mojo@local.com"
        },
        {
            "email": "corgi@home.local"
        }
    ]
}
```

Yields this output:

```
No Body

Location Header: http://localhost:2019/employees/employee/15
Status 201 Created
```

Do note that in the Employee model, we have a column constraint on name that affects what data can be added, changed in the employee table.

```java
@Column(nullable = false, unique = true)
private String name;
```

This means that the name of the employee must be present and must be unique. Every employee must have a name and have their own name! Now, Add the necessary endpoint to the Employee Controller. Notice that a create in CRUD is a POST HTTP Method.

```java
@PostMapping(value = "/employee",
    consumes = {"application/json"})
public ResponseEntity<?> addNewEmployee(
    @Valid
    @RequestBody
        Employee newEmployee)
{
```

We “nullify” any id sent in the request body. We save the record to the database by calling the appropriate method in the Employee Service.

```java
    // ids are not recognized by the Post method
    newEmployee.setEmployeeid(0);
    newEmployee = EmployeeService.save(newEmployee);
```

We create the location header.

```java
    // set the location header for the newly created resource
    HttpHeaders responseHeaders = new HttpHeaders();
    URI newEmployeeURI = ServletUriComponentsBuilder.fromCurrentRequest() // get the URI for this request
        .path("/{employeeid}") // add to it a path variable
        .buildAndExpand(newEmployee.getEmployeeid()) // populate that path variable with the newly created restaurant id
        .toUri(); // convert that work into a human readable URI
    responseHeaders.setLocation(newEmployeeURI); // in the header, set the location location to that URI
```

We return the location header and with a status of created.

```java
    return new ResponseEntity<>(null,
        responseHeaders,
        HttpStatus.CREATED);
}
```

Now, let’s update the Employee Service. Add the appropriate method to the Employee Service Interface.

```java
public interface EmployeeService
{
    Employee save(Employee employee);
}
```

Implement that method in the Employee Service Implementation. Implement the method header. Since this method will be changing data, we want to make the method transactional. Any method that changes data should be made transactional. We are using the `@Transactional` from the import `org.springframework.transaction.annotation.Transactional`. Yes, there are other choices but let’s use this one.

```java
@Transactional
@Override
public Employee save(Employee employee)
{
```

Create a new employee record in case we need to do some additional data manipulations and so we can add in data for associated tables.

```java
Employee newEmployee = new Employee();
```

Set the single value fields

```java
    newEmployee.setName(employee.getName());
    newEmployee.setSalary(employee.getSalary());
```

Handle the many to many relationship. In order to have the actual data from the associated table, and not just a pointer to the data, we have to loop through what job titles we want and add them to this employee. Just adding the object pointer is not enough. We need the actual data.

```java
        newEmployee.getJobtitles()
            .clear();
        for (JobTitle jt : employee.getJobtitles())
        {
            JobTitle newJT = jtrepos.findById(jt.getJobtitleid())
                .orElseThrow(() -> new EntityNotFoundException("JobTitle " + jt.getJobtitleid() + " Not Found"));
                
            newEmployee.addJobTitle(newJT);
        }
```

Handle the one to many relationship. The same idea about needing the actual data works for the emails as well.

```java
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
```

Save the record and return the new record along with the newly generated id number.

```java
    return employeerepos.save(newEmployee);
```

The many to many relationship takes advantage of a method to add a single job title to the list of job titles for an employee. We need to add this method to Employee model. Note this is ONLY needed for the many to many relationship.
Remember these are ArrayList. We take advantage of the add function for ArrayLists.

```java
public void addJobTitle(JobTitle jt)
{
    jobtitles.add(jt);
    jt.getEmployees().add(this);
}
```

Since we now have an add job title, we need a remove job title, again inside the Employee model.

```java
public void removeJobTitle(JobTitle jt)
{
    jobtitles.remove(jt);
    jt.getEmployees().remove(this);
}
```

## PUT

This endpoint:
PUT http://localhost:2019/employees/employee/15

Sent with this Request Body

```javascript
{
    "name": "Mojo",
    "salary": 80000.00,
    "emails": [
        {
            "email": "corgie@local.com"
        }
    ]
}
```

Yields this output:

```
No Body

Status Ok
```

Now let’s completely replace the record with new data. The HTTP method PUT completely replaces the referenced employee, referenced by a given employee primary key. The employee record and all associated records are replaced in the database, whether they need to be updated or not. Thus PUT endpoint takes a full employee record, just like POST does! If you want to update just certain fields while leaving the rest untouched, use the PATCH method.

Do note that with one to many relationships, the id number of the many part of the relationship changes with each PUT! That is the ONLY data changes with each PUT. Otherwise, you can run a given PUT as many times as you wish, yielding the same result.

* We need an endpoint in the Employee Controller
* No Location Header is returned because the id of the Employee is already known.
* The final status is OK since no employee record gets created, just replaced.

```java
    @PutMapping(value = "/employee/{employeeid}",
        consumes = {"application/json"})
    public ResponseEntity<?> updateFullEmployee(
        @Valid // verifies the give employee record is valid
        @RequestBody
            Employee updateEmployee, // the Jackson dependency converts from JSON to Java Objects
        @PathVariable
            long employeeid) // the primary key of the employee record to replace
    {
        updateEmployee.setEmployeeid(employeeid); // set the primary key to the one from the path variable
        employeeService.save(updateEmployee);

        return new ResponseEntity<>(HttpStatus.OK);
    }
```

Now we need to update the Employee Service Implementation. If we have a non-zero primary key, see if it exists. If it does, great! We will replace that Employee record. If the primary key does not exist, throw an exception and stop the process. This gives us the complete SAVE method:

```java
    public Employee save(Employee employee)
    {
        Employee newEmployee = new Employee();

        if (employee.getEmployeeid() != 0)
        {
            employeerepos.findById(employee.getEmployeeid())
                .orElseThrow(() -> new EntityNotFoundException("Employee " + employee.getEmployeeid() + " Not Found"));

            newEmployee.setEmployeeid(employee.getEmployeeid());
        }
        newEmployee.setName(employee.getName());
        newEmployee.setSalary(employee.getSalary());

        newEmployee.getJobtitles()
            .clear();
        for (JobTitle jt : employee.getJobtitles())
        {
            JobTitle newJT = jtrepos.findById(jt.getJobtitleid())
                .orElseThrow(() -> new EntityNotFoundException("JobTitle " + jt.getJobtitleid() + " Not Found"));

            newEmployee.addJobTitle(newJT);
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
```