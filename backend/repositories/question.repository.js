const MotorQuestion = require("../models/motorQuestion.model");

class QuestionRepository {
  // Lấy danh sách câu hỏi
  async getAllQuestions() {
    return await MotorQuestion.find();
  }

  // Create Question
  async create(questionData) {
    return await MotorQuestion.create(questionData);
  }

  // Update Question
  async updateById(id, updateData) {
    return await MotorQuestion.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  // Delete Question
  async deleteById(id) {
    return await MotorQuestion.findByIdAndDelete(id);
  }
}

module.exports = new QuestionRepository();
