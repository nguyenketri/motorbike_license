const historyRepository = require("../repositories/history.repository");
const questionRepository = require("../repositories/question.repository");

// Chuẩn đậu bài thi A1 thật: đúng tối thiểu 21/25 câu.
// Tính theo tỉ lệ để vẫn đúng khi ngân hàng câu hỏi ít hơn 25 câu (đề thi random ra ít hơn).
const PASS_RATIO = 21 / 25;

class HistoryService {
  // Nộp bài thi: LUÔN tự chấm lại điểm dựa trên đáp án đúng lưu trong DB,
  // KHÔNG tin bất kỳ điểm/kết quả nào client tự gửi lên để tránh gian lận.
  async submitExam({ userId, answers, durationSeconds }) {
    if (!Array.isArray(answers) || answers.length === 0) {
      throw new Error("Danh sách câu trả lời không hợp lệ");
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await questionRepository.getByIds(questionIds);
    const questionMap = new Map(questions.map((q) => [String(q._id), q]));

    let correctCount = 0;
    let failedCritical = false;

    const gradedAnswers = answers.map(({ questionId, selectedAnswer }) => {
      const question = questionMap.get(String(questionId));
      // Nếu câu hỏi không còn tồn tại (đã bị Admin xoá giữa lúc đang thi) thì coi như sai
      const isCorrect = !!question && selectedAnswer === question.correctAnswer;

      if (isCorrect) {
        correctCount += 1;
      } else if (question?.isCritical) {
        failedCritical = true;
      }

      return {
        questionId,
        selectedAnswer: selectedAnswer ?? -1,
        isCorrect,
      };
    });

    const totalQuestions = answers.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const passThreshold = Math.ceil(totalQuestions * PASS_RATIO);
    const isPassed = correctCount >= passThreshold && !failedCritical;

    const created = await historyRepository.create({
      userId,
      answers: gradedAnswers,
      totalQuestions,
      correctCount,
      score,
      isPassed,
      failedCritical,
      durationSeconds: durationSeconds || 0,
    });

    return this._buildReview(created, questionMap);
  }

  async getUserHistory(userId) {
    return await historyRepository.findByUser(userId);
  }

  async getHistoryDetail(id, userId) {
    const history = await historyRepository.findByIdAndUser(id, userId);
    if (!history) {
      throw new Error("Không tìm thấy lịch sử thi hoặc bạn không có quyền xem");
    }

    // answers.questionId đã được populate thành object câu hỏi đầy đủ
    const questionMap = new Map(
      history.answers
        .filter((a) => a.questionId) // câu hỏi có thể đã bị Admin xoá sau khi thi
        .map((a) => [String(a.questionId._id), a.questionId]),
    );
    return this._buildReview(history, questionMap);
  }

  // Ghép kết quả vừa chấm với nội dung câu hỏi (đã có sẵn trong bộ nhớ) để trả về
  // ngay cho FE hiển thị màn kết quả, khỏi phải gọi thêm 1 API populate riêng
  _buildReview(historyDoc, questionMap) {
    const review = historyDoc.answers.map((a) => {
      // Trường hợp getHistoryDetail: a.questionId đã được Mongoose populate thành object câu hỏi
      // Trường hợp submitExam: a.questionId vẫn chỉ là Id thô
      const rawId = a.questionId && a.questionId._id ? a.questionId._id : a.questionId;
      const question = questionMap.get(String(rawId));
      return {
        questionId: rawId,
        title: question?.title,
        answer: question?.answer,
        correctAnswer: question?.correctAnswer,
        isCritical: question?.isCritical,
        image: question?.image,
        selectedAnswer: a.selectedAnswer,
        isCorrect: a.isCorrect,
      };
    });

    return {
      _id: historyDoc._id,
      totalQuestions: historyDoc.totalQuestions,
      correctCount: historyDoc.correctCount,
      score: historyDoc.score,
      isPassed: historyDoc.isPassed,
      failedCritical: historyDoc.failedCritical,
      durationSeconds: historyDoc.durationSeconds,
      createdAt: historyDoc.createdAt,
      review,
    };
  }
}

module.exports = new HistoryService();
