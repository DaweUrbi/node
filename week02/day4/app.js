const express = require("express");
const mainController = require("./controllers/MainController");
const { showUsers } = require("./controllers/UserController");
const userRouter = require("./routes/users");

// const { showHomePage } = mainController;

const app = express();
app.use("/users", userRouter);
app.set("view engine", "ejs");

app.get("/", mainController.showHomePage);

// class Object
// methods = functions
// values = function (object) => array of values
// keys = function (object) => array of keys [test, test2]
// {
//     keys:values
// }

app.get("/users", showUsers);
app.post("/users", showUsers);
app.put("/users", showUsers);
app.delete("/users", showUsers);

app.get("/posts", showUsers);
app.post("/posts", showUsers);
app.put("/posts", showUsers);
app.delete("/posts", showUsers);

app.listen(3300, () => console.log("Server is running at port 3300"));
