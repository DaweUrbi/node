const bcrypt = require("bcrypt");
const { hashPassword } = require("../helpers/userHelper");
const users = require("../models/users.json");

const showLogin = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
  const receivedUsername = req.body.username;
  const receivedPassword = req.body.password;
  const user = users[receivedUsername];
  if (!user) return res.send("invalid username");
  const isMatch = await bcrypt.compare(receivedPassword, user.password);
  console.log("isMatch", isMatch);
  if (isMatch) {
    // res.cookie("username", user.username);
    req.session.username = user.username;
    return res.send("You are logged in");
  }
  res.send("invalid password");
};

const showRegister = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  console.log("body", req.body);
  const { name, username, password } = req.body;
  console.log("username", username);
  const hashedPassword = await hashPassword(password, 12);
  users[username] = { name, username, password: hashedPassword };

  console.log("users", users);
  res.cookie("username", username);
  res.send("user created");
};

const logoutUser = (req, res) => {
  // res.clearCookie("username");
  req.session = null;
  res.redirect("/login");
};

module.exports = {
  showLogin,
  loginUser,
  showRegister,
  registerUser,
  logoutUser,
};
