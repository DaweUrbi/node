var cookieSession = require("cookie-session");
var express = require("express");

var app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [
      /* secret keys */
      "key1",
      "key2",
    ],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.get("/", function (req, res, next) {
  // Update views
  //   res.cookie('username', 'bob');
  req.session.username = "bob";

  // Write response
  res.end(req.session.username + "  username");
});

app.listen(3000);