const users = require("../models/users.json");

const showUsers = (req, res) => {
  console.log("users", users);
  console.log("users array", Object.values(users));
  res.render("users", { users: Object.values(users) });
};

const createUser = (req, res) => {};

module.exports = { showUsers, createUser };
