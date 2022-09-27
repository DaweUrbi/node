# Relational Queries in SQL

So far, we've only SELECTed data from a single table, but in a real world database, things will rarely be this simple. We will usually need to SELECT data from multiple tables at the same time.

## Join tables

- **INNER JOIN**: Returns records that have matching values in both tables

```sql
SELECT column1, column2, column3
FROM table1
INNER JOIN table2
ON table1.column1 = table2.column1;
```

- **LEFT JOIN**: Returns all records from the left table, and the matched records from the right table

```sql
SELECT column1, column2, column3
FROM table1
LEFT JOIN table2
ON table1.column1 = table2.column1;
```

- **RIGHT JOIN**: Returns all records from the right table, and the matched records from the left table

```sql
SELECT column1, column2, column3
FROM table1
RIGHT JOIN table2
ON table1.column1 = table2.column1;
```

- **FULL JOIN**: Returns all records when there is a match in either left or right table

```sql
SELECT column1, column2, column3
FROM table1
FULL JOIN table2
ON table1.column1 = table2.column1;
```

![SQL Joins](https://www.securesolutions.no/wp-content/uploads/2014/07/joins-1.jpg)

## Modify data in SQL

### UPDATE

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### DELETE

```sql
DELETE FROM table_name
WHERE condition;
```

### ALTER

```sql
ALTER TABLE table_name
ADD column_name datatype;
```

### DROP

```sql
DROP TABLE table_name;
```

## Exercises

- [Relational queries in SQL](https://www.khanacademy.org/computing/computer-programming/sql/relational-queries-in-sql/)
- [Modify data in SQL](https://www.khanacademy.org/computing/computer-programming/sql/modify-data-in-sql)
- [SQL Zoo](https://sqlzoo.net/wiki/SQL_Tutorial) - 6 and 7

## Resources

[Visual explanation of SQL Joins](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/)