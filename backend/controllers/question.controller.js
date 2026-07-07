const questionService = require("../services/question.service");

class QuestionController {
  async getAllQuestion(req, res) {
    try {
      const result = await questionService.getAllQuestions();
      res.status(200).json({
        message: "Get all Question",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lấy đề thi thử: 25 câu hỏi ngẫu nhiên từ ngân hàng câu hỏi
  // Đặt route "/random" TRƯỚC "/:id" bên routes để tránh Express hiểu nhầm "random" là 1 Id
  async getRandomQuestions(req, res) {
    try {
      const result = await questionService.getRandomExamSet();
      res.status(200).json({
        message: "Get random exam set",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getQuestionById(req, res) {
    try {
      const result = await questionService.getQuestionById(req.params.id);
      res.status(200).json({
        message: "Get question by id",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
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

  // Sửa câu hỏi (Admin) - cho phép sửa 1 phần field, không bắt buộc gửi đủ như create
  async updateQuestion(req, res) {
    try {
      const result = await questionService.updateQuestion(
        req.params.id,
        req.body,
      );
      return res.status(200).json({
        message: "Update Success",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Xoá câu hỏi (Admin)
  async deleteQuestion(req, res) {
    try {
      await questionService.deleteQuestion(req.params.id);
      return res.status(200).json({
        message: "Delete Success",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new QuestionController();
