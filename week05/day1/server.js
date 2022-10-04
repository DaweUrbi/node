const express = require("express");
const http = require("http");
const { Pool } = require("pg");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbCredentials = {
	user: "dawe", //process.env.DB_USER,
	host: "localhost", //process.env.DB_HOST,
	database: "week_assignment", //proces s.env.DB_DATABASE,
	password: "postgres", //process.env.DB_PASSWORD,
	port: 5432, //process.env.DB_PORT,
};

app.get("/students", (req, res) => {
	const pool = new Pool(dbCredentials);

	pool
		.query("SELECT * FROM students")
		.then((result) => result.rows)
		.then((students) => res.json(students))
		.catch((err) => console.log(err))
		.finally(() => pool.end());
});

app.post("/students", (req, res) => {
	const { name, email, phone, github, start_date, end_date, class_id } =
		req.body;
	const pool = new Pool(dbCredentials);

	pool
		.query(
			"INSERT INTO students (name, email, phone, github) VALUES ($1, $2, $3, $4) RETURNING *",
			[name, email, phone, github]
		)
		.then((results) => results.row[0])
		.then((student) => res.send(student))
		.catch((err) => console.log(err))
		.finally(() => pool.end());
});

app.listen(3000, () => console.log("Server is listening on port 3000"));
