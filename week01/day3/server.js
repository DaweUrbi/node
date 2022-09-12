const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const server = express();

server.use(bodyParser.json());

const getUsers = async () => {
  const data = await fs.readFileSync("users.json", "utf-8");
  return JSON.parse(data).users;
};

const updateUsers = async (users) => {
  await fs.writeFileSync("users.json", JSON.stringify({ users: users }));
  return { message: "file updated" };
};

server.get("/users", async (request, response) => {
  const users = await getUsers();
  console.log("users", users);
  response.json(users);
});

server.post("/users", async (request, response) => {
  console.log("body", request.body);
  const body = request.body;
  const users = await getUsers();
  const newUser = { ...body, id: users.length + 1 };
  const updatedUsers = [...users, newUser];
  updateUsers(updatedUsers);

  response.json(newUser);
});

server.put("/users", async (request, response) => {
  const body = request.body;
  const users = await getUsers();
  const updatedUsers = users.map((user) => {
    if (user.id === body.id) {
      return { ...body };
    }
    return user;
  });
  updateUsers(updatedUsers);
  response.json({ message: "User updated" });
});

server.delete("/users", async (req, res) => {
  const body = req.body;
  const users = await getUsers();
  const updatedUsers = users.filter((user) => user.id !== body.id);
  const result = await updateUsers(updatedUsers);
  console.log("result", result);
  if (result.message === "file updated") {
    res.json({ message: "User deleted" });
  }
});

server.listen(3000, () => console.log("server is running on port 3000"));