import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Bọc quanh 1 <Route> để chặn truy cập nếu chưa đăng nhập.
// Truyền adminOnly=true để chặn thêm những route chỉ dành riêng cho Admin (VD: /admin)
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
