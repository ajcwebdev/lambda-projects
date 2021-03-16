# Relational Database

A Rest API Backend system consists of two main parts:
1. A database to persistently store data
2. An API application to access that stored data

Each of these should be able to stand alone:
1. Different APIs should be able to access your database
2. Your API should be able to access different databases

### RDBMS

RDBMS stands for Relational Database Management System. A RDBMS is a server that manages 1 or more databases. An RDBMS might manage:
* Dogs Database
* Cats Database
* Rabbits Database

Often we will see only 1 database per RDBMS, but databases are not the same thing as database management systems. The RDBMS is like a server while the databases are applications found on that server.

Popular RDBMS include:
* PostgresSQL
* MySQL
* SQLite
* Oracle
* MS SQL Server

We interact mostly with the databases and that interaction is managed by the RDBMS.

## The Database

A Database is a collection of data organized for easy retrieval and manipulation. A person who manages a database is called a Database Administrator (DBA).

Relational Databases are a special type of database and are the most common.
* Based on Relational Algebra
* Contains a collections of tables containing columns and rows
* Accessed through SQL

Below is a sample of a table called bunnies:

|Id|Name|Weight|
|--|----|------|
|1|BarnBarn|10.5|
|2|Cinnamon|11.0|

Columns are
* Id
* Name
* Weight

Each column represents a field or attribute that is common to all row, records. Columns should have a descriptive name and a data type appropriate for the attribute it represents.

Rows are
* 1 BarnBarn 10.5
* 2 Cinnamon 11.0

Each row in a table represents one distinct record. Tables normally have more rows than columns. Tables have Primary Keys that uniquely identify each row. The id field in the example is the primary key.

Relationships with other tables are represented by Foreign Keys. That is when we include the primary key from another table in our table to show which rows are related to each other.
* bunnyid is a foreign key to the bunny table
* BarnBarn (bunnyid 1) has the colors white and brown
* Cinnamon (bunnyid 2) has the color brown.
* We get the names BarnBarn and Cinnamon by looking them up in the bunny table using the bunnyid

|Id|color|bunnyid|
|--|-----|-------|
|1|white|1|
|2|brown|2|
|3|brown|1|

The chart below shows what terms are used for what in each discipline.

|RDBMS|Relational Algebra|Java|
|-----|------------------|----|
|Table|Relation|Class|
|Column|Attribute|Field|
|Row|Tuple|Object|

Indexes are special database object used to speed up data searching.
* If you normally do searches using a particular piece of data, you would normally index that data. How to index is very specific to the RDBMS or programming language, framework you are using.
* In most cases, we will allow Spring Data to generate indexes for us.

Views are special database objects that looks and feels like a table but do not store data. These are special queries that combine, filter, sort table data.
* Note a query is simply a request for information from a database NB: Is this the first time they’re seeing the word query? Might be worth additional explanation in this context
* Can be queried like a table.
* Can combine data from two or more tables.
* Use to simplify data access

Stored Procedures or Functions are written in a form of SQL to perform a series of operations.
* Stored in the database under a unique name and can be called like built in functions.
* Often used to perform data intensive operations and return only the result to clients.

Triggers are a special type of store procedure.
* Executes automatically in response to events like inserting/updating/deleting data.

# SQL

SQL stands for Structured Query Language. It is used to communicate with a database inside the RDBMS.

Advantages of SQL
* High speed
* No coding needed
* Well defined standards – ISO and ANSI
* Portability
* Interactive language
* Multiple Data Views possible

SQL can be divided into different types:
* DML (DATA MANIPULATION LANGUAGE)
  * SELECT, INSERT, UPDATE, DELETE
* DDL (DATA DEFINITION LANGUAGE)
  * CREATE, ALTER, DROP
* DCL (DATA CONTROL LANGUAGE)
  * GRANT, REVOKE
* TCL (TRANSACTION CONTROL LANGUAGE)
  * BEGIN, TRAN, COMMIT, ROLLBACK

We will be using DML to query our data and DDL to manage the schema, or structure, of our tables.

Some of the most common SQL statements or keywords:
* `SELECT` - extracts data from a database
* `UPDATE` - updates data in a database
* `DELETE` - deletes data from a database
* `INSERT INTO` - inserts new data into a database
* `CREATE DATABASE` - creates a new database
* `ALTER DATABASE` - modifies a database
* `CREATE TABLE` - creates a new table
* `ALTER TABLE` - modifies a table
* `DROP TABLE` - deletes a table
* `CREATE INDEX` - creates an index (search key)
* `DROP INDEX` - deletes an index

### Examples of DML

Select all the rows with all their columns from a customer table:

Notice the keywords `SELECT` and `FROM` are in uppercase and the data, table, name `customers` is lowercase. This is a common convention but SQL is generally case insensitive. `SELECT` tells us what columns we want. The `*` is a wild card in case meaning all available columns. `FROM` tells us from which table to get the data.

```SQL
SELECT *
FROM customers
```

Join, combine, the orders and customer table based on the primary key for customer. Return the results ordered by customer’s first name and include only the columns order number, total amount, first name, and last name in the results

SELECT tells us what columns we want
* o.orderid - the order id column from the o table which is the orders table
* c.customername - the customer name column from the c table which is the customers table
* c.contactname - the contact name column from the c table which is the customers table

FROM tells us from which tables to get the data
* orders which we give the alias o. Normally when we give a table an alias, or nickname to use elsewhere in the query, we use the first letter of the table.
* customers which we give the alias c.

ON tells us how are tables are related and on what columns the tables are to be joined, combined
* o.CustomerId the foreign key to the customer table found in the orders table
* c.CustomerId the primary key of the customer table
* The columns do NOT have to have the same name but must be the same data type!

ORDER BY tells us how to order our returned data. By default the data is returned unordered. By default we cannot know what the order will be!
* c.customername - order by the customername column in the c table which is the customers table

```SQL
SELECT o.orderid, c.customername, c.contactname
FROM orders o JOIN customers c
ON o.customerid = c.customerid
ORDER BY c.customername
```

## Query a Single Table

## Join
