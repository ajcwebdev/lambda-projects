# Learn to perform CRUD operations on an RDBMS JPA and Hibernate (Deleting records)

To get rid of data in the database we delete it. This is the most straight forward of the CRUD operations. You say delete with the given employee primary key and that employee and all associated records are deleted.

Endpoint DELETE http://localhost:2019/employees/employee/15

Yields the Output

```
No Body

Status Ok
```

First we need an endpoint and from that endpoint we only need a primary key, so in the Employee Controller

```java
    @DeleteMapping(value = "/employee/{employeeid}")
    public ResponseEntity<?> deleteEmployeeById(
        @PathVariable
            long employeeid)
    {
        employeeService.delete(employeeid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
```

Now we need to add the delete method to the Employee Service interface. The return is void. Nothing gets returns; there is nothing to get returned.

```java
    void delete(long employeeid);
```

Now implement the delete method in the Employee Service Implementation. Notice that we first determine if we have the employee primary key in the database. If we do, great delete. If we do not, throw an exception.

```java
    @Transactional
    @Override
    public void delete(long employeeid)
    {
        if (employeerepos.findById(employeeid)
            .isPresent())
        {
            employeerepos.deleteById(employeeid);
        } else
        {
            throw new EntityNotFoundException("Employee " + employeeid + " Not Found");
        }
    }
```

Bye Bye employee. Enjoy your farewell cake!

When we delete an employee, associated email records get deleted. This is because we have CASCADE.ALL set on the One to Many relationship between employee and emails. The Many to Many relationship automatically deletes the joins between employees and jobtitles when employees is deleted. The actual job title table is left intact. Unfortunately the model does not work if we try to delete a job title. We have set the employee as our main Entity and thus have to do our deleting through employee. We will correct this issue in the future in Module 4 of this Sprint when we split the many to many relation into two one to many relationships!