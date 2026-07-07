const express = require("express");
const router = express.Router();

const historyController = require("../controllers/history.controller");
const { protect } = require("../middlewares/auth.middleware");

// Tất cả API lịch sử thi đều yêu cầu đăng nhập, và chỉ thao tác trên dữ liệu của chính user đó
router.post("/submit", protect, historyController.submitExam);
router.get("/me", protect, historyController.getMyHistory);
router.get("/:id", protect, historyController.getHistoryDetail);

module.exports = router;
