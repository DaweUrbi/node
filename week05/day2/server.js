const express = require("express");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://DaweUrbi:mongo@cluster0.iryrzej.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/students-without-github", async (req, res) => {
	const collection = client.db("week_assignment").collection("students");
	const students = await collection
		.aggregate([
			{
				$match: { github: null },
			},
			{
				$project: {
					id: 1,
					name: 1,
					email: 1,
					class_id: 1,
				},
			},
		])
		.toArray();
	res.json(students);
});

app.get("/students-per-class", async (req, res) => {
	const collection = client.db("week_assignment").collection("students");
	const students = await collection
		.aggregate([
			{
				$match: {
					class_id: 1,
				},
			},
			{
				$project: {
					id: 1,
					name: 1,
				},
			},
			{
				$sort: {
					name: 1,
				},
			},
		])
		.toArray();
	res.json(students);
});

app.get("/students-first-3", async (req, res) => {
	const collection = client.db("week_assignment").collection("students");
	const students = await collection
		.aggregate([
			{
				$match: {
					class_id: {
						$in: [1, 2, 3],
					},
				},
			},
			{
				$count: "students",
			},
		])
		.toArray();
	res.json(students);
});

app.get("/students-without-email-and-phone", async (req, res) => {
	const collection = client.db("week_assignment").collection("students");
	const students = await collection
		.find({
			email: null,
			phone: null,
		})
		.toArray();
	res.json(students);
});

app.get("/students-without-gmail-and-phone", async (req, res) => {
	const collection = client.db("week_assignment").collection("students");
	const students = await collection
		.find({
			email: {
				$not: {
					$regex: /gmail.com/,
				},
			},
			phone: null,
		})
		.toArray();
	res.json(students);
});

app.get("/students-enrolled", async (req, res) => {
	const collection = client.db("week_assignment").collection("students");
	const students = await collection
		.aggregate([
			{
				$match: {
					end_date: null,
				},
			},
			{
				$project: {
					id: 1,
					name: 1,
					class_id: 1,
				},
			},
			{
				$sort: {
					class_id: 1,
				},
			},
		])
		.toArray();
	res.json(students);
});

app.get("/students-graduated-without-github", async (req, res) => {
	const collection = client.db("week_assignment").collection("students");
	const students = await collection
		.aggregate([
			{
				$match: {
					end_date: {
						$ne: null,
					},
					github: null,
				},
			},
			{
				$project: {
					email: 1,
					name: 1,
					phone: 1,
				},
			},
		])
		.toArray();
	res.json(students);
});

app.listen(3000, () => console.log("server running 3000"));
