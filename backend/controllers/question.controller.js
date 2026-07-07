const questionService = require("../services/question.service");

class QuestionController {
  async getAllQuestion(req, res) {
    const result = await questionService.getAllQuestions();
    res.status(200).json({
      message: "Get all Question",
      data: result,
    });
  }

  async createQuestions(req, res) {
    try {
      const { title, answer, correctAnswer, image, isCritical } = req.body;
      // 1. Sửa logic check validation (Chỉ check undefined hoặc rỗng thực sự)
      if (
        !title ||
        !answer ||
        correctAnswer === undefined ||
        isCritical === undefined
      ) {
        return res.status(400).json({
          // Thêm `return` ở đây để DỪNG HÀM LUÔN nếu thiếu data
          message:
            "title, answer, correctAnswer, or isCritical is required and cannot be empty",
        });
      }
      const result = await questionService.createQuestion(req.body);
      return res.status(201).json({
        message: "Create Success",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new QuestionController();
