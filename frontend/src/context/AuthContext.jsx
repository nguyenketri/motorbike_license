import React, { createContext, useContext, useState, useCallback } from "react";
import authApi from "../api/auth.api";

// Context tập trung toàn bộ trạng thái đăng nhập của ứng dụng, để mọi trang
// (Navbar, ProtectedRoute, Exam, Admin...) đều lấy chung 1 nguồn dữ liệu
// thay vì mỗi nơi tự đọc localStorage riêng lẻ như trước.
const AuthContext = createContext(null);

// Đọc user hiện tại từ localStorage khi app khởi động (để giữ đăng nhập qua các lần F5)
function loadUserFromStorage() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return {
    token,
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    _id: localStorage.getItem("userId"),
  };
}

function persistUser(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.role);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email || "");
  localStorage.setItem("userId", data._id);
}

function clearStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUserFromStorage);

  const login = useCallback(async ({ email, password }) => {
    const res = await authApi.login({ email, password });
    const data = res.data.data;
    persistUser(data);
    setUser(data);
    return data;
  }, []);

  const register = useCallback(async ({ username, email, password }) => {
    const res = await authApi.register({ username, email, password });
    const data = res.data.data;
    persistUser(data);
    setUser(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    clearStorage();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user?.token,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }
  return ctx;
}
