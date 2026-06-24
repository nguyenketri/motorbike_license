const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = require("../controllers/user.controller");

// Định nghĩa API đăng ký (POST)
router.post("/register", userController.register);

// Định nghĩa API login
router.post("/login", userController.login);

module.exports = router;
