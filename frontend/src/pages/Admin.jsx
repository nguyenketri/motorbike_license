import React, { useEffect, useState } from "react";
import questionApi from "../api/question.api";

const EMPTY_FORM = {
  title: "",
  answer: ["", ""],
  correctAnswer: 0,
  image: "",
  isCritical: false,
};

export default function Admin() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // formOpen = đang mở panel thêm/sửa; editingId = null nghĩa là đang Thêm mới,
  // khác null nghĩa là đang Sửa câu hỏi có Id tương ứng
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadQuestions = () => {
    setLoading(true);
    questionApi
      .getAll()
      .then((res) => setQuestions(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Không tải được danh sách câu hỏi"))
      .finally(() => setLoading(false));
  };

  useEffect(loadQuestions, []);

  const openCreateForm = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEditForm = (q) => {
    setEditingId(q._id);
    setFormData({
      title: q.title,
      answer: [...q.answer],
      correctAnswer: q.correctAnswer,
      image: q.image || "",
      isCritical: q.isCritical,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleAnswerChange = (idx, value) => {
    const next = [...formData.answer];
    next[idx] = value;
    setFormData({ ...formData, answer: next });
  };

  const addOption = () => {
    if (formData.answer.length >= 6) return;
    setFormData({ ...formData, answer: [...formData.answer, ""] });
  };

  const removeOption = (idx) => {
    if (formData.answer.length <= 2) return; // luôn giữ tối thiểu 2 đáp án
    const next = formData.answer.filter((_, i) => i !== idx);
    // Nếu xoá đúng đáp án đang được đánh dấu đúng, mặc định trỏ về đáp án đầu tiên
    const nextCorrect = formData.correctAnswer >= next.length ? 0 : formData.correctAnswer;
    setFormData({ ...formData, answer: next, correctAnswer: nextCorrect });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || formData.answer.some((a) => !a.trim())) {
      setError("Vui lòng nhập đầy đủ nội dung câu hỏi và các đáp án");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: formData.title.trim(),
        answer: formData.answer.map((a) => a.trim()),
        correctAnswer: Number(formData.correctAnswer),
        image: formData.image.trim() || null,
        isCritical: formData.isCritical,
      };

      if (editingId) {
        await questionApi.update(editingId, payload);
        setNotice("Cập nhật câu hỏi thành công");
      } else {
        await questionApi.create(payload);
        setNotice("Thêm câu hỏi mới thành công");
      }

      closeForm();
      loadQuestions();
    } catch (err) {
      setError(err.response?.data?.message || "Lưu câu hỏi thất bại");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá câu hỏi này?")) return;
    setDeletingId(id);
    setError("");
    try {
      await questionApi.remove(id);
      setNotice("Đã xoá câu hỏi");
      loadQuestions();
    } catch (err) {
      setError(err.response?.data?.message || "Xoá câu hỏi thất bại");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="exam-toolbar">
        <h2 className="section-title">🛠️ Quản trị câu hỏi ({questions.length})</h2>
        <button className="btn btn-primary btn-inline" onClick={openCreateForm}>
          + Thêm câu hỏi
        </button>
      </div>

      {notice && <div className="alert alert-success">{notice}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {formOpen && (
        <div className="card admin-form-panel">
          <h3 className="section-title">{editingId ? "Sửa câu hỏi" : "Thêm câu hỏi mới"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nội dung câu hỏi</label>
              <textarea
                className="input-field"
                rows={3}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Ảnh biển báo (URL, có thể để trống)</label>
              <input
                type="text"
                className="input-field"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="input-group">
              <label>Các đáp án (chọn radio để đánh dấu đáp án đúng)</label>
              {formData.answer.map((text, idx) => (
                <div className="option-input-row" key={idx}>
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === idx}
                    onChange={() => setFormData({ ...formData, correctAnswer: idx })}
                  />
                  <input
                    type="text"
                    className="input-field"
                    value={text}
                    onChange={(e) => handleAnswerChange(idx, e.target.value)}
                    placeholder={`Đáp án ${idx + 1}`}
                    required
                  />
                  {formData.answer.length > 2 && (
                    <button
                      type="button"
                      className="btn-icon-remove"
                      onClick={() => removeOption(idx)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {formData.answer.length < 6 && (
                <button type="button" className="btn btn-secondary btn-inline" onClick={addOption}>
                  + Thêm đáp án
                </button>
              )}
            </div>

            <div className="input-group checkbox-row">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isCritical}
                  onChange={(e) => setFormData({ ...formData, isCritical: e.target.checked })}
                />{" "}
                Đây là câu hỏi điểm liệt
              </label>
            </div>

            <div className="hero-actions">
              <button type="submit" className="btn btn-primary btn-inline" disabled={saving}>
                {saving ? "Đang lưu..." : "Lưu câu hỏi"}
              </button>
              <button type="button" className="btn btn-secondary btn-inline" onClick={closeForm}>
                Huỷ
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="card">Đang tải danh sách câu hỏi...</div>
      ) : (
        <div className="admin-table-wrapper card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Câu hỏi</th>
                <th>Số đáp án</th>
                <th>Điểm liệt</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q._id}>
                  <td className="admin-table-title">{q.title}</td>
                  <td>{q.answer.length}</td>
                  <td>{q.isCritical && <span className="badge badge-critical">Điểm liệt</span>}</td>
                  <td className="admin-table-actions">
                    <button className="btn btn-secondary btn-inline" onClick={() => openEditForm(q)}>
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger btn-inline"
                      onClick={() => handleDelete(q._id)}
                      disabled={deletingId === q._id}
                    >
                      {deletingId === q._id ? "Đang xoá..." : "Xoá"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
