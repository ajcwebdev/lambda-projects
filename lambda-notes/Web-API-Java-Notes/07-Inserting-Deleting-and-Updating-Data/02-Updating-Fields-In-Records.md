# Learn to perform CRUD operations on an RDBMS JPA and Hibernate (Updating certain fields in records)

We have much to do to update in adding these CRUD functions. Find the code in the repo as it is mentioned in the objective! What if we do not want to replace the whole record but just certain fields. This is where PATCH comes in. Let’s implement PATCH.

## PATCH

This endpoint PATCH http://localhost:2019/employees/employee/15

Sent with this Request Body

```javascript
{
    "salary": 150000.00,
    "emails": [
    {
        "email": "home@local.com"
    }
    ]
}
```

Yields this output

```
No Body

Status Ok
```

We need an endpoint where our frontend client can access the PATCH method. This endpoint is similar to the PUT endpoint except:
* The primary key is sent to the Employee Service via a parameter instead of inside the Employee object. This is a personal preference.
* We do NOT verify that the Employee object is “valid”. A valid employee object would require a Name field. If we are not updating the name field, we won’t have one so the employee object would be registered as invalid. Not what we want.
* We call the update function as opposed to the save function from the Employee Service Class.

```java
    @PatchMapping(value = "/employee/{employeeid}",
        consumes = {"application/json"})
    public ResponseEntity<?> updateEmployee(
        @RequestBody
            Employee updateEmployee,
        @PathVariable
            long employeeid)
    {
        employeeService.update(updateEmployee,
            employeeid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
```

Now we need to make the update function available in the Employee Service class.

```java
    Employee update(Employee employee, long employeeid);
```

We need to implement the function in the Employee Service Implementation class. We are going to check if fields coming in from the frontend client are NULL, meaning that the frontend client did not send a new value for that field. Primitive data types have to handled differently. Remember that primitive data types are not objects so NULL has no meaning for them. Let’s address that first.

We need to make some changes to the employee model. We have added a field called salary to our model.
* If we checked is see if `salary` was NULL, meaning that during PATCH it did not come in from the frontend client, we have to check to see if `salary` is 0.00. Remember NULL has no meaning for doubles.
* If we check and salary is 0.00, is it 0.00 because the frontend client set it to 0.00 or is it 0.00 because it was not sent by the frontend client. Let’s fix that problem.

Let’s add another boolean field called `hasvalueforsalary`.
* Before the class we add the annotation `@JsonIgnoreProperties(value = {"hasvalueforsalary"})`. The `hasvalueforsalary` field will be used internally to the application to determine if a salary value came from the frontend client or should be treated as NULL. Do not ever send this value in JSON to the frontend client.
* Mark `hasvalueforsalary` as `@Transient`. This means the field will not be saved in the database and is just part of the Java object.
* Notice that we will be referencing `hasvalueforsalary` as a public field and not using a getter and setter. Personal preference again.

```java
@JsonIgnoreProperties(value = {"hasvalueforsalary"})
public class Employee
{
    @Transient
    public boolean hasvalueforsalary = false;

    private double salary;
```

Finally, let’s update the `setSalary` setter method. Setters are always used to make the conversion from the JSON received from the frontend client to Java objects. We take advantage of that fact by setting `hasvalueforsalary = true` in the setter for `salary`. If `salary` is not included in the JSON from the frontend client, `setSalary` is never called and `hasvalueforsalary` remains false.

```java
    public void setSalary(double salary)
    {
        hasvalueforsalary = true;
        this.salary = salary;
    }
```

Now back to our implementation of the Employee Service update function. The header includes the data to update and the primary key of the record to update. Of course, update will change data so make it `@Transactional`

```java
    @Transactional
    @Override
    public Employee update(
        Employee employee,
        long employeeid)
    {
```

Find the employee record referenced by the given primary key and create a new employee record with that data.

```java
        Employee currentEmployee = employeerepos.findById(employeeid)
            .orElseThrow(() -> new EntityNotFoundException("Employee " + employeeid + " Not Found"));
```

Check each non-list field in the employee object that was received from the frontend client. If the field is NULL, meaning that a value did not come in from the frontend client, just keep the old data. If a field is NOT NULL, the frontend client sent in new data and so replace in the object found above that new data.

```java
        if (employee.getName() != null)
        {
            currentEmployee.setName(employee.getName());
        }

        if (employee.hasvalueforsalary)
        {
            currentEmployee.setSalary(employee.getSalary());
        }
```

Relationships require a decision. How to deal with items sent by the frontend client that are part of a relationship?
* I have decided that if data is sent for the one to many or the many to many relationships, that data is meant to completely replace the data for the relationship.
* We address adding, deleting, and updating a single entry in a relation in Module 4 of this Sprint.

```java
        if (employee.getJobtitles().size() > 0)
        {
            currentEmployee.getJobtitles()
                .clear();
            for (JobTitle jt : employee.getJobtitles())
            {
                JobTitle newJT = jtrepos.findById(jt.getJobtitleid())
                    .orElseThrow(() -> new EntityNotFoundException("JobTitle " + jt.getJobtitleid() + " Not Found"));

                currentEmployee.addJobTitle(newJT);
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
```

Finally, save to the database and return a full employee record with all the updated data. This still does a replace in the database but the frontend client only has to send us the data it wants changed, not all the data as with a PUT.

```java
        return employeerepos.save(currentEmployee);
    }
```