const express = require("express");

const router = express.Router();

// http://localhost:3001/users/
router.get("/", (req, res) => {
  res.send("Users route");
});

// http://localhost:3001/users/:id
router.get("/:id", (req, res) => {
  res.send("User id route");
});

module.exports = router;
