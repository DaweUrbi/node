// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

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

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(8080, () => console.log("server running 8080"));
