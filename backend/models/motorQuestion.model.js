const mongoose = require("mongoose");

// 1. Định nghĩa Schema (Cấu trúc của bảng Question)
const motorQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Nên thêm trim để tự động xóa khoảng trắng thừa ở 2 đầu
  },
  answer: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true, // Câu hỏi trắc nghiệm thì nên bắt buộc phải có đáp án đúng
    min: 0,
  },
  image: {
    type: String, // lưu URL của ảnh biển
    default: null,
  },
  isCritical: {
    type: Boolean, // Câu hỏi điểm liệt : true/false
    default: false,
  },
});

// Creat Model and Exports
const MotorQuestion = mongoose.model("MotorQuestion", motorQuestionSchema);
module.exports = MotorQuestion;
