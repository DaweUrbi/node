const express = require("express");
const { showProfile } = require("../controllers/userController");
const router = express.Router();

router.get("/profile", showProfile);

module.exports = router;
