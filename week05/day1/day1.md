# Node-Postgres Integration

## Review

- How a server works?
- What is a promise in JS?
- What are the possible results of a promise? What is the return value of a promise?
- PostgreSQL is a relational database management system (RDBMS)
- What is a query?

## Connecting Node with PostgreSQL

- pg is a Node.js module that allows us to connect to a PostgreSQL database
- We can install it with `npm install pg`

## Connecting to a Database

- We have 2 options for connecting to a database:

  - `pg.Client` - good for conversations (keep the connection open)
  - `pg.Pool` - good for transactions (single requests)

- We can connect to a database with the following code:

```js
const { Pool } = require("pg");

const pool = new Pool();

pool.query("SELECT NOW()", (err, res) => {
  console.log("err", err);
  console.log("res", res);
  pool.end();
});
```

If we try to run this code, we might get an error:

```bash
error: password authentication failed for user "<username>"
```

To fix that, we need to give the credentials to the `Pool` object:

```js
// This credentials are for the default user in PostgreSQL.
// You can change them to your own.

const dbCredentials = {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
};

const pool = new Pool(dbCredentials);
```

Now, if we run the code, we will get the following output:

```bash
err null
res Result {
  command: 'SELECT',
  rowCount: 1,
  oid: null,
  rows: [ anonymous { now: 2020-03-23T20:00:00.000Z } ],
  fields: [
    Field {
      name: 'now',
      tableID: 0,
      columnID: 0,
      dataTypeID: 1184,
      dataTypeSize: 8,
      dataTypeModifier: -1,
      format: 'text'
    }
  ],
  _parsers: [ [Function: parseDate] ],
  RowCtor: null,
  rowAsArray: false,
  _getTypeParser: [Function: bound ] { [Symbol(nodejs.util.inspect.custom)]: [Function: inspect] },
  _addRowMode: [Function: bound ],
  _binary: false
}
```

**SUCESS!** We have connected to our database. Our next step is to get 2 students from the database.

## Getting Data from the Database

- We can get data from the database with the following code:

```js
pool.query("SELECT * FROM students LIMIT 2 ", (err, res) => {
  console.log("err", err);
  console.log("res", res);
  pool.end();
});
```

If we run this code, our query should return 2 students from the `students` table.

We saw during our review that every request to the server is a promise, right?
Also, we saw that a query is a request, right?
So, can we say that a query is a promise?

Let's try to rewrite our code to use promises:

```js
pool
  .query("SELECT * FROM students LIMIT 2")
  .then((res) => {
    // If successful, we will get the result in the res variable
    console.log("res", res);
    pool.end();
  })
  .catch((err) => {
    // If any error happens, we will get the error in the err variable
    console.log("err", err);
    pool.end();
  });
```

We can still improve our code. In our result, we are getting a lot of information that we don't need. We only need the students, right? So, let's get only the students:

```js
pool
  .query("SELECT * FROM students LIMIT 2")
  .then((res) => res.rows)
  .then((students) => {
    console.log("students", students);
    pool.end();
  })
  .catch((err) => {
    console.log("err", err);
    pool.end();
  });
```

Just because we are doing some refactoring and refactoring is all about reducing duplication, take a look at the last code snippet and find the duplication. How can we remove it?

This the last refactoring, I promise!

In promises, we have a function called `finally`. This function will be executed no matter if the promise is successful or not. So, we can use it to close the connection to the database:

```js
pool
  .query("SELECT * FROM students LIMIT 2")
  .then((res) => res.rows)
  .then((students) => {
    console.log("students", students);
  })
  .catch((err) => {
    console.log("err", err);
  })
  .finally(() => {
    pool.end();
  });
```

And there you go! We have connected to our database and we have gotten some data from it.

## Inserting Data into the Database

Maybe, now you are thinking: "I know how to get data from the database then if I want to insert data into the database, I just need to change the query, right?"

Well, yes and no. We can insert data into the database with the following code:

```js
pool
  .query("INSERT INTO students (name, age) VALUES ('John', 20)")
  .then((res) => res.rows)
  .then((students) => {
    console.log("students", students);
  })
  .catch((err) => {
    console.log("err", err);
  })
  .finally(() => {
    pool.end();
  });
```

But that would insert the same student every time we run the code. We need to insert a new student every time we run the code. So, we need to get the student information from the user. We can do that with the following code:

```js
app.post("/students", (req, res) => {
  const { name, email } = req.body;
  const query = `INSERT INTO students (name, email) VALUES ('${name}', '${email}')`;
  pool
    .query(query)
    .then((dbRes) => dbRes.rows)
    .then((student) => {
      console.log("student", student);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
});
```

Now, if we run the code and try to insert a student, we might not get the result we want. Why?

When we insert data, res.rows will be empty. So, we need to change our code to get the student we just inserted:

```js
app.post("/students", (req, res) => {
  const { name, email } = req.body;

  // We added RETURNING * to the query
  const query = `INSERT INTO students (name, email) VALUES ('$1', '$2') RETURNING *`;

  pool
    .query(query)
    .then((dbRes) => dbRes.rows[0])
    .then((student) => {
      console.log("student", student);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
});
```

> With this change, we will get the student we just inserted.

So far, all good! Everything works but we are not validating the data we are getting from the user. What could possibly go wrong?

- What if the user doesn't send the name or email?
- What if the user send SQL code instead of the name or email?

We need to validate the data we are getting from the user. We can do that with the following code:

```js
app.post("/students", (req, res) => {
  const { name, email } = req.body;
  const query = `INSERT INTO students (name, email) VALUES ('$1', '$2') RETURNING *`;
  pool
    .query(query, [name, email])
    .then((dbRes) => dbRes.rows)
    .then((student) => {
      console.log("student", student);
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      pool.end();
    });
});
```

As you can see, we are using the second parameter of the query function to pass the values we want to insert into the query. This way, we are preventing SQL injection.

# Exercises

## Exercise 1

- Create an express server and connect it to your `week_assignment` database.
- Create a route that will get all the students from the database.
- Create a route that will insert a new student into the database and send it back to the client.

## Exercise 2

- Choose a team mate to pair with.
- Copy the `tests` folder, `package.json` and `testHelper.js` files from the `node_examples` repository. [Link](https://github.com/adlascio/node-examples)
- Paste into your `week_assignment` repository.
- In the terminal, run `npm install` to install the dependencies.
- Add `node_modules` to `.gitignore` file.
- Run `npm test` to run the tests.
- Fix the issues found by the tests.
- Work together to fix the issues.