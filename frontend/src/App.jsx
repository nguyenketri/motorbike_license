import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Exam from "./pages/Exam";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import History from "./pages/History";

// Thanh điều hướng chính - đọc trạng thái đăng nhập từ AuthContext
// thay vì đọc trực tiếp localStorage như trước, để luôn đồng bộ real-time
// mỗi khi user đăng nhập/đăng xuất mà không cần load lại trang.
function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        🏠 Trang chủ
      </Link>

      {!isAuthenticated && (
        <Link to="/login" className="nav-link">
          🔑 Đăng nhập
        </Link>
      )}
      {!isAuthenticated && (
        <Link to="/register" className="nav-link">
          📝 Đăng Ký
        </Link>
      )}

      {isAuthenticated && (
        <>
          <Link to="/exam" className="nav-link">
            🏍️ Vào thi
          </Link>
          <Link to="/history" className="nav-link">
            📈 Lịch sử
          </Link>
          {isAdmin && (
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
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        {/* Khu vực chứa nội dung */}
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/exam"
              element={
                <ProtectedRoute>
                  <Exam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
