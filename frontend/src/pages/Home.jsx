import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroImage from "../assets/hero.png";

// Trang chủ - giới thiệu hệ thống, CTA dẫn người dùng vào Ôn luyện/Đăng nhập
export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: "📖",
      title: "Ôn luyện không giới hạn",
      desc: "Làm quen với toàn bộ ngân hàng câu hỏi, biết đúng/sai ngay khi chọn đáp án, không giới hạn thời gian hay số lần làm lại.",
    },
    {
      icon: "⏱️",
      title: "Thi thử sát đề thật",
      desc: "25 câu hỏi ngẫu nhiên, 19 phút làm bài, tiêu chí đậu/rớt đúng theo chuẩn thi sát hạch A1 (kể cả câu điểm liệt).",
    },
    {
      icon: "📊",
      title: "Theo dõi lịch sử thi",
      desc: "Lưu lại toàn bộ kết quả các lần thi, xem lại chi tiết từng câu đã làm đúng hay sai để rút kinh nghiệm.",
    },
  ];

  return (
    <div>
      <section className="hero-section card">
        <div className="hero-text">
          <span className="hero-badge">🏍️ Ôn thi bằng lái xe máy A1</span>
          <h1>Tự tin thi đậu ngay lần đầu</h1>
          <p>
            Ôn luyện lý thuyết và làm bài thi thử được mô phỏng sát với đề thi
            sát hạch thật, giúp bạn nắm chắc kiến thức luật giao thông trước
            khi thi thật.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/exam" className="btn btn-primary btn-inline">
                🏍️ Bắt đầu ôn luyện
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary btn-inline">
                  🚀 Bắt đầu miễn phí
                </Link>
                <Link to="/login" className="btn btn-secondary btn-inline">
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
        <img src={heroImage} alt="Ôn thi bằng lái xe máy" className="hero-image" />
      </section>

      <section className="feature-grid">
        {features.map((f) => (
          <div className="feature-card card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
