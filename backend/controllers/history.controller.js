const historyService = require("../services/history.service");

class HistoryController {
  // Nộp bài thi thử, trả về kết quả chấm điểm ngay lập tức
  async submitExam(req, res) {
    try {
      const { answers, durationSeconds } = req.body;
      if (!answers) {
        return res.status(400).json({ message: "Thiếu dữ liệu câu trả lời" });
      }

      const result = await historyService.submitExam({
        userId: req.user._id,
        answers,
        durationSeconds,
      });

      return res.status(201).json({
        message: "Nộp bài thành công",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lấy danh sách lịch sử thi của user đang đăng nhập
  async getMyHistory(req, res) {
    try {
      const result = await historyService.getUserHistory(req.user._id);
      return res.status(200).json({
        message: "Get history thành công",
        data: result,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Xem chi tiết 1 lần thi (review từng câu)
  async getHistoryDetail(req, res) {
    try {
      const result = await historyService.getHistoryDetail(
        req.params.id,
        req.user._id,
      );
      return res.status(200).json({
        message: "Get history detail thành công",
        data: result,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new HistoryController();
