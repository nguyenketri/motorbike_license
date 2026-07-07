const mongoose = require("mongoose");

// Schema lưu chi tiết 1 lần thi thử: giữ lại đáp án đã chọn của từng câu
// để trang Lịch sử có thể xem lại (review) chính xác bài đã làm
const examHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MotorQuestion",
          required: true,
        },
        selectedAnswer: {
          type: Number, // -1 nghĩa là bỏ trống, không chọn đáp án nào
          required: true,
          default: -1,
        },
        isCorrect: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctCount: {
      type: Number,
      required: true,
      default: 0,
    },
    score: {
      type: Number, // điểm theo thang % (correctCount / totalQuestions * 100)
      required: true,
      default: 0,
    },
    isPassed: {
      type: Boolean,
      required: true,
      default: false,
    },
    failedCritical: {
      type: Boolean, // true nếu rớt vì sai câu điểm liệt
      default: false,
    },
    durationSeconds: {
      type: Number, // thời gian làm bài thực tế (giây)
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const ExamHistory = mongoose.model("ExamHistory", examHistorySchema);
module.exports = ExamHistory;
