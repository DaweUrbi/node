const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const users = {
  test: {
    name: "Test",
    username: "test",
    password: "1234",
  },
};

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { name, username, password } = req.body;
  users[username] = { name, username, password };

  console.log("users", users);
  res.cookie("username", username);
  res.send("user created");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const receivedUsername = req.body.username;
  const receivedPassword = req.body.password;
  const user = users[receivedUsername];
  if (!user) return res.send("invalid username");
  if (user.password === receivedPassword) {
    res.cookie("username", user.username);
    return res.redirect("/profile");
  }
  res.send("invalid password");
});

app.get("/profile", (req, res) => {
  const username = req.cookies.username;
  if (!username) return res.redirect("/login");
  const user = users[username];
  res.render("profile", { username: user.username, password: user.password });
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000, () => console.log("Server running at port 3000"));