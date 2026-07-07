const questionRepository = require("../repositories/question.repository");

// Số câu hỏi trong 1 đề thi thử, theo đúng chuẩn đề thi sát hạch A1 thật
const EXAM_QUESTION_COUNT = 25;

class QuestionService {
  async getAllQuestions() {
    return await questionRepository.getAllQuestions();
  }

  async getQuestionById(id) {
    const question = await questionRepository.getById(id);
    if (!question) {
      throw new Error("Không tìm thấy câu hỏi");
    }
    return question;
  }

  async createQuestion(dataCreate) {
    return await questionRepository.create(dataCreate);
  }

  async updateQuestion(id, updateData) {
    const updated = await questionRepository.updateById(id, updateData);
    if (!updated) {
      throw new Error("Không tìm thấy câu hỏi để cập nhật");
    }
    return updated;
  }

  async deleteQuestion(id) {
    const deleted = await questionRepository.deleteById(id);
    if (!deleted) {
      throw new Error("Không tìm thấy câu hỏi để xoá");
    }
    return deleted;
  }

  // Tạo 1 đề thi thử gồm 25 câu ngẫu nhiên (hoặc ít hơn nếu ngân hàng câu hỏi chưa đủ 25 câu)
  async getRandomExamSet() {
    return await questionRepository.getRandomQuestions(EXAM_QUESTION_COUNT);
  }
}

module.exports = new QuestionService();
