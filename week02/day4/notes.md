# MVC Pattern, Routing and Q&A

## MVC Pattern

- **M**odels (Data Structure)
- **V**iews (Information)
- **C**ontrollers (Data Manipulation)

### Data flow

![MVC Example](https://miro.medium.com/proxy/0*Qf1s2lG86MjX-Zcv.jpg)

### Benefits

- Helps to break up the frontend and the backend code into separated components.
- Easier to manage and make changes to either side without interfering with each other.

### MVC Frameworks

- KnockoutJS
- Django (Python)
- Ruby on Rails (Ruby)

### How to use it?

```
/root
    - /models
        - users.json (users data)
    - /controllers
        - UserController.js (user actions)
    - /views
        - users.ejs (users html)
    - app.js (server file)
```

## Routing in Express.js

### What is a Router?

Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

### How to use it?

```js
// in app.js
const express = require("express");
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);
```

```js
// in /routes/users
const express = require("express");
const router = express.Router();

// endpoint http://localhost:3000/users/
router.get("/", (req, res) => {
  res.send("Users route");
});

module.exports = router;
```
