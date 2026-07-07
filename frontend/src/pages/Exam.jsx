import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import questionApi from "../api/question.api";
import historyApi from "../api/history.api";
import Countdown from "../components/Countdown";
import QuestionReview from "../components/QuestionReview";

// Thời gian làm bài thi thử: 19 phút, đúng theo chuẩn đề thi sát hạch A1 thật
const EXAM_DURATION_SECONDS = 19 * 60;

// Các màn hình (screen) của trang Exam, chuyển đổi qua lại bằng state cục bộ
// thay vì tạo nhiều route riêng, vì chúng dùng chung 1 luồng dữ liệu câu hỏi
const SCREENS = {
  SELECT: "select", // chọn chế độ Ôn luyện / Thi thử
  PRACTICE: "practice", // chế độ ôn luyện tự do
  EXAM_TAKING: "exam-taking", // đang làm bài thi thử có tính giờ
  EXAM_RESULT: "exam-result", // xem kết quả sau khi nộp bài
};

export default function Exam() {
  const [screen, setScreen] = useState(SCREENS.SELECT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dữ liệu câu hỏi dùng chung cho cả Ôn luyện và Thi thử
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // answers: map { [questionId]: selectedAnswerIndex }
  const [answers, setAnswers] = useState({});

  const [remainingSeconds, setRemainingSeconds] = useState(EXAM_DURATION_SECONDS);
  const [examResult, setExamResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  // Dùng ref để chặn việc auto-submit bị gọi lặp lại nhiều lần khi hết giờ
  const hasSubmittedRef = useRef(false);

  const currentQuestion = questions[currentIndex];

  // ----- Bắt đầu chế độ Ôn luyện: tải toàn bộ ngân hàng câu hỏi -----
  const startPractice = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await questionApi.getAll();
      setQuestions(res.data.data);
      setCurrentIndex(0);
      setAnswers({});
      setScreen(SCREENS.PRACTICE);
    } catch (err) {
      setError(err.response?.data?.message || "Không tải được câu hỏi");
    } finally {
      setLoading(false);
    }
  };

  // ----- Bắt đầu Thi thử: tải đề 25 câu ngẫu nhiên + khởi động đồng hồ đếm ngược -----
  const startExam = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await questionApi.getRandomExamSet();
      setQuestions(res.data.data);
      setCurrentIndex(0);
      setAnswers({});
      setRemainingSeconds(EXAM_DURATION_SECONDS);
      hasSubmittedRef.current = false;
      setScreen(SCREENS.EXAM_TAKING);
    } catch (err) {
      setError(err.response?.data?.message || "Không tải được đề thi");
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  // Nộp bài thi: gửi toàn bộ đáp án đã chọn lên Backend để chấm điểm chính thức
  // (điểm số luôn được tính lại ở BE, FE chỉ hiển thị kết quả trả về)
  const submitExam = async () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setSubmitting(true);
    try {
      const payload = {
        answers: questions.map((q) => ({
          questionId: q._id,
          selectedAnswer: answers[q._id] ?? -1,
        })),
        durationSeconds: EXAM_DURATION_SECONDS - remainingSeconds,
      };
      const res = await historyApi.submit(payload);
      setExamResult(res.data.data);
      setScreen(SCREENS.EXAM_RESULT);
    } catch (err) {
      setError(err.response?.data?.message || "Nộp bài thất bại, vui lòng thử lại");
      hasSubmittedRef.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  // Đồng hồ đếm ngược: chỉ chạy khi đang ở màn thi thử, tự động nộp bài khi về 0
  useEffect(() => {
    if (screen !== SCREENS.EXAM_TAKING) return undefined;

    if (remainingSeconds <= 0) {
      submitExam();
      return undefined;
    }

    const timerId = setTimeout(() => setRemainingSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, remainingSeconds]);

  const backToSelect = () => {
    setScreen(SCREENS.SELECT);
    setQuestions([]);
    setAnswers({});
    setExamResult(null);
  };

  const answeredCount = Object.keys(answers).length;

  // ================= MÀN CHỌN CHẾ ĐỘ =================
  if (screen === SCREENS.SELECT) {
    return (
      <div>
        <h2 className="section-title">Chọn chế độ luyện tập</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="mode-grid">
          <div className="card mode-card">
            <div className="feature-icon">📖</div>
            <h3>Ôn luyện</h3>
            <p>
              Làm toàn bộ ngân hàng câu hỏi, biết đúng/sai ngay khi chọn, không
              giới hạn thời gian.
            </p>
            <button className="btn btn-secondary" onClick={startPractice} disabled={loading}>
              {loading ? "Đang tải..." : "Bắt đầu ôn luyện"}
            </button>
          </div>

          <div className="card mode-card">
            <div className="feature-icon">⏱️</div>
            <h3>Thi thử</h3>
            <p>25 câu hỏi ngẫu nhiên, 19 phút, chấm điểm theo chuẩn thi A1 thật.</p>
            <button className="btn btn-primary" onClick={startExam} disabled={loading}>
              {loading ? "Đang tải..." : "Bắt đầu thi thử"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= MÀN KẾT QUẢ THI =================
  if (screen === SCREENS.EXAM_RESULT && examResult) {
    return (
      <div>
        <div className={`card result-banner ${examResult.isPassed ? "result-pass" : "result-fail"}`}>
          <h2>{examResult.isPassed ? "🎉 Chúc mừng, bạn đã ĐẬU!" : "😢 Rất tiếc, bạn đã RỚT"}</h2>
          <p className="result-score">
            {examResult.correctCount}/{examResult.totalQuestions} câu đúng ({examResult.score}%)
          </p>
          {examResult.failedCritical && (
            <p className="alert alert-warning">
              ⚠️ Bạn đã trả lời sai câu điểm liệt - đây là lý do bắt buộc rớt bài thi dù điểm tổng vẫn đủ.
            </p>
          )}
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: 16 }}>
            <button className="btn btn-primary btn-inline" onClick={backToSelect}>
              Làm lại
            </button>
            <Link to="/history" className="btn btn-secondary btn-inline">
              Xem lịch sử thi
            </Link>
          </div>
        </div>

        <h3 className="section-title">Xem lại chi tiết bài làm</h3>
        <div className="review-list">
          {examResult.review.map((item, idx) => (
            <QuestionReview item={item} index={idx} key={item.questionId} />
          ))}
        </div>
      </div>
    );
  }

  // ================= MÀN ÔN LUYỆN / THI THỬ (đang làm bài) =================
  if (!currentQuestion) {
    return <div className="card">Đang tải câu hỏi...</div>;
  }

  const isExamMode = screen === SCREENS.EXAM_TAKING;
  const selected = answers[currentQuestion._id];
  const hasAnswered = selected !== undefined;
  // Ở chế độ ôn luyện, biết đúng/sai ngay khi chọn - so trực tiếp với correctAnswer trả về từ API
  const isCorrectPractice = hasAnswered && selected === currentQuestion.correctAnswer;

  return (
    <div>
      <div className="exam-toolbar">
        <button className="btn btn-secondary btn-inline" onClick={backToSelect}>
          ← Thoát
        </button>
        <span className="exam-progress">
          Câu {currentIndex + 1}/{questions.length} • Đã làm {answeredCount}/{questions.length}
        </span>
        {isExamMode && <Countdown seconds={remainingSeconds} />}
      </div>

      {/* Lưới điều hướng nhanh tới từng câu hỏi */}
      <div className="question-nav">
        {questions.map((q, idx) => {
          const answered = answers[q._id] !== undefined;
          let cls = "question-nav-item";
          if (idx === currentIndex) cls += " nav-current";
          else if (answered) cls += " nav-answered";
          return (
            <button key={q._id} className={cls} onClick={() => setCurrentIndex(idx)}>
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="card question-card">
        {currentQuestion.isCritical && <span className="badge badge-critical">⚠️ Câu điểm liệt</span>}
        <p className="question-title">{currentQuestion.title}</p>
        {currentQuestion.image && (
          <img src={currentQuestion.image} alt="Biển báo" className="question-image" />
        )}

        <div className="option-list">
          {currentQuestion.answer.map((text, idx) => {
            let cls = "option-button";
            if (!isExamMode && hasAnswered) {
              // Ôn luyện: tô màu đúng/sai ngay lập tức
              if (idx === currentQuestion.correctAnswer) cls += " option-correct";
              else if (idx === selected) cls += " option-wrong";
            } else if (idx === selected) {
              cls += " option-selected";
            }

            return (
              <button
                key={idx}
                className={cls}
                onClick={() => selectAnswer(currentQuestion._id, idx)}
              >
                {text}
              </button>
            );
          })}
        </div>

        {!isExamMode && hasAnswered && (
          <p className={isCorrectPractice ? "alert alert-success" : "alert alert-error"}>
            {isCorrectPractice ? "✔️ Chính xác!" : "❌ Chưa đúng, đáp án đúng đã được tô xanh."}
          </p>
        )}
      </div>

      <div className="exam-toolbar">
        <button
          className="btn btn-secondary btn-inline"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
        >
          ← Câu trước
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            className="btn btn-secondary btn-inline"
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
          >
            Câu tiếp →
          </button>
        ) : (
          !isExamMode && <span />
        )}

        {isExamMode && (
          <button className="btn btn-primary btn-inline" onClick={submitExam} disabled={submitting}>
            {submitting ? "Đang nộp bài..." : "Nộp bài thi"}
          </button>
        )}
      </div>
    </div>
  );
}
