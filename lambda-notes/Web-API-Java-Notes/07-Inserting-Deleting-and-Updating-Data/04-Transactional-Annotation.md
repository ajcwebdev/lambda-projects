# Learn to understand and implement @Transactional annotation

We have much to update in adding these CRUD functions. Find the Transactional code in the repo as it is mentioned in the objective!

## The `@Transactional` Annotation

Any method that changes data should be made transactional!

Two main libraries implement the `@Transactional` annotation. For most purposes these two implementations are interchangeable. In fact, the Spring Framework has its own version of each library. The two libraries are

* `org.springframework.transaction.annotation.Transactional`
* `javax.transaction`

So best practice - if you are using the Spring Framework, import the library `org.springframework.transaction.annotation.Transactional`. Otherwise, import the library javax.transaction

To make a method transactional, add the `@Transactional` annotation before the method name. For example:

```java
    @Transactional
    @Override
    public void delete(long employeeid)
    {
        ...
    }
```

If you make the class transactional, each method in the class is considered transactional. If you make both the class and method transactional, the annotation at the method level takes precedent. I like to make the methods transactional. I have experienced issues with just making a class transactional.

```java
@Transactional
@Service(value = "employeeSerivce") // needed to name this implementation as the service to use
public class EmployeeServiceImpl implements EmployeeService
{
    ...
}
```


Normally we use the transactional annotation to make manipulating data a single transaction. For example, look at delete.

Delete an employee records triggers
* Delete of 0 or more email records
* Delete of 0 or more Employee JobTitle records

For a transactional delete to succeed, all three deletes must succeed. If a problem is found during any of the deletes, the transactional initiates a rollback - all the data deleted is restored and the database is left in the same it was in before the failed delete was attempted. In this matter our database maintains referential integrity. We do not delete an employee while leaving emails of that employee in the emails table. Referential integrity can be defined as the accuracy and consistency of data within the various relationships.

Many times it is helpful to make a method work as a single transaction. The `@Transactional` annotation has a couple of useful options.

* `@Transactional(readOnly=true)` - method does not write to the database
* `@Transactional(timeout=XX)` - timeout in seconds. applies to both data manipulation and queries. I know of interviews where you are asked how to restrict how long a query can run before timing out. Here it is!