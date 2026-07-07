import axiosClient from "./axiosClient";

// Gom các API liên quan tới Câu hỏi (dùng cho cả Ôn luyện, Thi thử và trang Admin)
const questionApi = {
  getAll() {
    return axiosClient.get("/questions");
  },
  getRandomExamSet() {
    return axiosClient.get("/questions/random");
  },
  getById(id) {
    return axiosClient.get(`/questions/${id}`);
  },
  create(payload) {
    // payload: { title, answer: string[], correctAnswer, image, isCritical }
    return axiosClient.post("/questions", payload);
  },
  update(id, payload) {
    return axiosClient.put(`/questions/${id}`, payload);
  },
  remove(id) {
    return axiosClient.delete(`/questions/${id}`);
  },
};

export default questionApi;
