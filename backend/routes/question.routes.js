const express = require("express");
const router = express.Router();

const questionController = require("../controllers/question.controller");
const { protect, authorizeAdmin } = require("../middlewares/auth.middleware");

// LƯU Ý: "/random" phải khai báo TRƯỚC "/:id", nếu không Express sẽ hiểu
// "random" chính là tham số :id và gọi nhầm sang getQuestionById
router.get("/random", protect, questionController.getRandomQuestions);

// API GET danh sách toàn bộ câu hỏi (dùng cho chế độ Ôn luyện + trang quản trị Admin)
router.get("/", protect, questionController.getAllQuestion);

// API GET chi tiết 1 câu hỏi
router.get("/:id", protect, questionController.getQuestionById);

// API POST / PUT / DELETE chỉ dành cho Admin
router.post("/", protect, authorizeAdmin, questionController.createQuestions);
router.put("/:id", protect, authorizeAdmin, questionController.updateQuestion);
router.delete(
  "/:id",
  protect,
  authorizeAdmin,
  questionController.deleteQuestion,
);

module.exports = router;
