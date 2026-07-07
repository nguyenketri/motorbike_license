import axiosClient from "./axiosClient";

// Gom các API liên quan tới Auth (đăng ký/đăng nhập/lấy thông tin cá nhân)
const authApi = {
  register(payload) {
    // payload: { username, email, password }
    return axiosClient.post("/user/register", payload);
  },
  login(payload) {
    // payload: { email, password }
    return axiosClient.post("/user/login", payload);
  },
  getProfile() {
    return axiosClient.get("/user/profile");
  },
};

export default authApi;
