import axiosClient from "./axiosClient";

// Gom các API liên quan tới Lịch sử thi
const historyApi = {
  submit(payload) {
    // payload: { answers: [{questionId, selectedAnswer}], durationSeconds }
    return axiosClient.post("/history/submit", payload);
  },
  getMine() {
    return axiosClient.get("/history/me");
  },
  getDetail(id) {
    return axiosClient.get(`/history/${id}`);
  },
};

export default historyApi;
