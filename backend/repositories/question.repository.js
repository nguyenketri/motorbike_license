const MotorQuestion = require("../models/motorQuestion.model");

class QuestionRepository {
  // Lấy danh sách câu hỏi
  async getAllQuestions() {
    return await MotorQuestion.find();
  }

  // Lấy 1 câu hỏi theo Id
  async getById(id) {
    return await MotorQuestion.findById(id);
  }

  // Lấy nhiều câu hỏi theo danh sách Id (dùng để chấm bài thi)
  async getByIds(ids) {
    return await MotorQuestion.find({ _id: { $in: ids } });
  }

  // Lấy ngẫu nhiên `size` câu hỏi để tạo đề thi
  async getRandomQuestions(size) {
    return await MotorQuestion.aggregate([{ $sample: { size } }]);
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
