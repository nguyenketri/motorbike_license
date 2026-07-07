const ExamHistory = require("../models/examHistory.model");

class HistoryRepository {
  // Tạo mới 1 bản ghi lịch sử thi
  async create(historyData) {
    return await ExamHistory.create(historyData);
  }

  // Lấy danh sách lịch sử thi của 1 user, mới nhất lên đầu
  // Không cần populate answers ở đây vì list chỉ hiển thị tổng quan (điểm, ngày, đậu/rớt)
  async findByUser(userId) {
    return await ExamHistory.find({ userId }).sort({ createdAt: -1 });
  }

  // Lấy chi tiết 1 lần thi kèm thông tin câu hỏi để FE review lại từng câu
  async findByIdAndUser(id, userId) {
    return await ExamHistory.findOne({ _id: id, userId }).populate(
      "answers.questionId",
    );
  }
}

module.exports = new HistoryRepository();
