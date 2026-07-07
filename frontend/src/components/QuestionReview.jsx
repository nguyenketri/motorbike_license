import React from "react";

// Hiển thị lại 1 câu hỏi đã làm (chỉ xem, không cho chọn lại) - dùng chung cho
// màn Kết quả thi (ngay sau khi nộp bài) và trang Lịch sử (xem lại bài cũ)
export default function QuestionReview({ item, index }) {
  const { title, answer = [], correctAnswer, selectedAnswer, isCorrect, isCritical, image } = item;

  return (
    <div className={`review-item ${isCorrect ? "review-correct" : "review-wrong"}`}>
      <div className="review-header">
        <span className="review-index">Câu {index + 1}</span>
        {isCritical && <span className="badge badge-critical">Điểm liệt</span>}
        <span className={`badge ${isCorrect ? "badge-success" : "badge-danger"}`}>
          {isCorrect ? "Đúng" : "Sai"}
        </span>
      </div>

      <p className="review-title">{title}</p>
      {image && <img src={image} alt="Biển báo" className="review-image" />}

      <div className="review-options">
        {answer.map((text, idx) => {
          const isTheCorrectOne = idx === correctAnswer;
          const isTheSelectedOne = idx === selectedAnswer;
          let className = "review-option";
          if (isTheCorrectOne) className += " option-correct";
          else if (isTheSelectedOne && !isCorrect) className += " option-wrong";

          return (
            <div className={className} key={idx}>
              {isTheSelectedOne && <span className="option-mark">👉</span>}
              {text}
              {isTheCorrectOne && <span className="option-mark">✔️</span>}
            </div>
          );
        })}
        {selectedAnswer === -1 && (
          <p className="review-empty-note">Bạn đã bỏ trống câu này</p>
        )}
      </div>
    </div>
  );
}
