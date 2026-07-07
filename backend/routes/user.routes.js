const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

// Định nghĩa API đăng ký (POST)
router.post("/register", userController.register);

// Định nghĩa API login
router.post("/login", userController.login);

// Lấy thông tin user hiện tại (cần đăng nhập)
router.get("/profile", protect, userController.getProfile);

module.exports = router;
