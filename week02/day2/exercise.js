// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

const users = {
  test: {
    name: "Test",
    username: "test",
    password: "$2b$12$4rG6Hrijl8VYWVIMEORyruKrudrkviq2Kcbd9RxLZkWXizJPxXOXK",
  },
};

const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  // const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  console.log("username", username);
  const hashedPassword = await hashPassword(password, 12);
  users[username] = { name, username, password: hashedPassword };

  console.log("users", users);
  res.cookie("username", username);
  res.send("user created");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const receivedUsername = req.body.username;
  const receivedPassword = req.body.password;
  const user = users[receivedUsername];
  if (!user) return res.send("invalid username");
  const isMatch = await bcrypt.compare(receivedPassword, user.password);
  if (isMatch) {
    // res.cookie("username", user.username);
    req.session.username = user.username;
    return res.send("You are logged in");
  }
  res.send("invalid password");
});

app.get("/profile", (req, res) => {
  const username = req.session.username;
  if (!username) return res.redirect("/login");
  const user = users[username];
  res.render("profile", { username: user.username, password: user.password });
});

app.post("/logout", (req, res) => {
  // res.clearCookie("username");
  req.session = null;
  res.redirect("/login");
});

app.listen(8000, () => console.log("Server is running on port: 8000"));