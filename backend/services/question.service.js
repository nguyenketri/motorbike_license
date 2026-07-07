const questionRepository = require("../repositories/question.repository");

class QuestionService {
  async getAllQuestions() {
    return await questionRepository.getAllQuestions();
  }
  async createQuestion(dataCreate) {
    return await questionRepository.create(dataCreate);
  }
}

module.exports = new QuestionService();
