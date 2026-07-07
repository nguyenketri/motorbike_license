import React from "react";

// Component thuần hiển thị (không tự đếm giờ) - nhận số giây còn lại từ component cha
// và format thành mm:ss. Đổi màu cảnh báo khi sắp hết giờ (< 60s).
export default function Countdown({ seconds }) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <div className={`timer-badge ${seconds <= 60 ? "timer-danger" : ""}`}>
      ⏱️ {display}
    </div>
  );
}
