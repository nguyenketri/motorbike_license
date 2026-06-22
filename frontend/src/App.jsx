import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Exam from "./pages/Exam";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import History from "./pages/History";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      {/* Thanh Menu xịn sò */}
      <nav className="navbar">
        <Link to="/" className="nav-link">
          🏠 Trang chủ
        </Link>

        {!token && (
          <Link to="/login" className="nav-link">
            🔑 Đăng nhập
          </Link>
        )}
        {!token && (
          <Link to="/register" className="nav-link">
            {" "}
            Đăng Ký
          </Link>
        )}

        {token && (
          <>
            <Link to="/exam" className="nav-link">
              🏍️ Vào thi
            </Link>
            <Link to="/history" className="nav-link">
              📈 Lịch sử
            </Link>
            {role === "admin" && (
              <Link to="/admin" className="nav-link admin">
                🛠️ Quản trị
              </Link>
            )}

            <button onClick={handleLogout} className="btn-logout">
              👋 Đăng xuất
            </button>
          </>
        )}
      </nav>

      {/* Khu vực chứa nội dung */}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
