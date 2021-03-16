# Relational Database Core Components

A database is a collection of data organized for easy retrieval and manipulation. We’re concerned only with digital databases, those that run on computers or other electronic devices.

Digital databases have been around since the 1960s. Relational databases, those which store “related” data, are the oldest and most common type of database in use today.

## Data Persistence

A database is often necessary because our application or code requires data persistence. This term refers to data that is infrequently accessed and not likely to be modified. In less technical terms, the data is going to be safely stored and remain untouched unless intentionally modified. A familiar example of non-persistent data would be JS objects and arrays, which reset each time the code runs.

## Relational Databases

In relational databases, the data is stored in tabular format grouped into rows and columns (similar to spreadsheets). A collection of rows is called a table. Each row represents a single record in the table and is made up of one or more columns. These kinds of databases are called relational because a relation is a mathematical idea that is equivalent to a table. So relational databases are databases that store their data in tables.

### Tables

* Tables organize data in rows and columns.
* Each row on a table represents one distinct record.
* Each column represents a field or attribute that is common to all records.
* Fields should have a descriptive name and a data type appropriate for the attribute it represents.
* Tables usually have more rows than columns
* Tables have primary keys that uniquely identify each row.
* Foreign keys represent the relationships with other tables.

# SQL Advantages

Structured Query Language is the standard language used to manage databases and the data within them. It is the de facto way to interact with a database. As a query language, SQL is optimized for the sole purpose of querying data. This means not only optimization in writing queries, but optimization in terms of retrieving data, which is critical in the modern world of big data.

SQL is a standard language, which means that it almost certainly be supported, no matter how your database is managed. That said, be aware the SQL language can vary depending on database management tools. This lesson focuses on a set of core commands that never change. Learning the standard commands is an excellent introduction since the knowledge transfers between database products.

The syntax for SQL is English-like and requires fewer symbols than programming languages like C, Java, and JavaScript. It is declarative and concise, which means there is a lot less to learn to use it effectively.

When learning SQL it is helpful to understand that each command is designed for a different purpose. If we classify the commands by purpose we’ll end up with the following sub-categories of SQL:

### Data Definition Language (DDL)
Modify database objects.
* `CREATE TABLE`
* `ALTER TABLE`
* `DROP TABLE`

### Data Manipulation Language (DML)
Manipulate the data stored in the database.
* `INSERT`
* `UPDATE`
* `DELETE`

### Data Query Language (DQL)
Ask questions about the data stored in the database.
* `SELECT`

### Data Control Language (DCL)
Manage database security and user’s access to data and is the realm of Database Administrators.
* `GRANT`
* `REVOKE`

### Transaction Control Commands
Manage groups of statements that must execute as a unit or not execute at all.
* `COMMIT`
* `ROLLBACK`

# Query, insert, and modify data in SQL

Four critical SQL commands are:
* `SELECT`
* `INSERT`
* `UPDATE`
* `DELETE`

These SQL commands allow for basic querying, inserting, and modifying of data. They are necessary for performing CRUD operations on the database level.

## Query

A query is a SQL statement used to retrieve data from a database. The command used to write queries is `SELECT`, and it is one of the most used SQL commands.

```sql
SELECT <selection> from <table name>;
```

To see all the fields on a table we can use a `*` as the `selection`.

```sql
SELECT * from employees;
```

The preceding statement would show all the records and all the columns for each record for the table employees. To pick the fields we want to see, we list them separated by commas.

```sql
SELECT first_name, last_name, salary from employees;
```

The return of that statement would hold all records from the listed fields. We can extend the capabilities of the `SELECT` command using `clauses` for things like filtering, sorting, and pagination. It is possible to query multiple tables in a single query.

## Insert

To insert new data into a table, we’ll use the `INSERT` command.

```sql
INSERT into <table name> (<selection>) values (<values>)
```

Using this formula we can specify which values will be inserted into which fields.

```sql
INSERT into Customers (Country, CustomerName, ContactName, Address, City, PostalCode)
values ('USA', 'Lambda School', 'Austen Allred', '1 Lambda Court', 'Provo', '84601');
```

## Modify

Modifying a database consists of updating and removing records. For these operations we’ll use `UPDATE` and `DELETE` commands.

```sql
UPDATE <table name> set <field> = <value> WHERE <condition>;
```

```sql
DELETE from <table name> WHERE <condition>;
```

# Filtering results using WHERE clause
