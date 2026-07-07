import React, { useEffect, useState } from "react";
import historyApi from "../api/history.api";
import QuestionReview from "../components/QuestionReview";

// Định dạng ngày giờ kiểu Việt Nam, dễ đọc cho người dùng
function formatDate(isoString) {
  return new Date(isoString).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function History() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Chi tiết 1 lần thi đang được xem (null = đang ở màn danh sách)
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    historyApi
      .getMine()
      .then((res) => setList(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Không tải được lịch sử thi"))
      .finally(() => setLoading(false));
  }, []);

  const openDetail = async (id) => {
    setDetailLoading(true);
    setError("");
    try {
      const res = await historyApi.getDetail(id);
      setDetail(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Không tải được chi tiết bài thi");
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading) {
    return <div className="card">Đang tải lịch sử thi...</div>;
  }

  // ================= MÀN CHI TIẾT 1 LẦN THI =================
  if (detail) {
    return (
      <div>
        <button className="btn btn-secondary btn-inline" onClick={() => setDetail(null)}>
          ← Quay lại danh sách
        </button>

        <div className={`card result-banner ${detail.isPassed ? "result-pass" : "result-fail"}`} style={{ marginTop: 16 }}>
          <h2>{detail.isPassed ? "🎉 Bài thi ĐẬU" : "😢 Bài thi RỚT"}</h2>
          <p className="result-score">
            {detail.correctCount}/{detail.totalQuestions} câu đúng ({detail.score}%)
          </p>
          <p style={{ color: "#718096", marginTop: 8 }}>{formatDate(detail.createdAt)}</p>
          {detail.failedCritical && (
            <p className="alert alert-warning">⚠️ Rớt vì trả lời sai câu điểm liệt</p>
          )}
        </div>

        <h3 className="section-title">Chi tiết từng câu</h3>
        <div className="review-list">
          {detail.review.map((item, idx) => (
            <QuestionReview item={item} index={idx} key={item.questionId} />
          ))}
        </div>
      </div>
    );
  }

  // ================= MÀN DANH SÁCH LỊCH SỬ =================
  return (
    <div>
      <h2 className="section-title">📈 Lịch sử thi của bạn</h2>
      {error && <div className="alert alert-error">{error}</div>}

      {list.length === 0 ? (
        <div className="card">
          <p>Bạn chưa có lần thi thử nào. Hãy vào mục "Vào thi" để bắt đầu!</p>
        </div>
      ) : (
        <div className="history-list">
          {list.map((h) => (
            <button
              key={h._id}
              className="card history-item"
              onClick={() => openDetail(h._id)}
              disabled={detailLoading}
            >
              <div>
                <p className="history-date">{formatDate(h.createdAt)}</p>
                <p className="history-score">
                  {h.correctCount}/{h.totalQuestions} câu đúng • {h.score}%
                </p>
              </div>
              <span className={`badge ${h.isPassed ? "badge-success" : "badge-danger"}`}>
                {h.isPassed ? "Đậu" : "Rớt"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
