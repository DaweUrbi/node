const express = require("express");
const {
  showLogin,
  loginUser,
  showRegister,
  registerUser,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.get("/login", showLogin);

router.post("/login", loginUser);

router.get("/register", showRegister);

router.post("/register", registerUser);

router.post("/logout", logoutUser);

module.exports = router;
