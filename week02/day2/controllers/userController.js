const users = require("../models/users.json");

const showProfile = (req, res) => {
  const username = req.session.username;
  if (!username) return res.redirect("/login");
  const user = users[username];
  res.render("profile", { username: user.username, password: user.password });
};

module.exports = { showProfile };
