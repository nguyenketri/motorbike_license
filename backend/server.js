const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Bật các tính năng hỗ trợ
app.use(cors());
app.use(express.json()); // Giúp server đọc được dữ liệu JSON gửi lên

// Kết nối với cơ sở dữ liệu MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Đã kết nối thành công với MongoDB!"))
  .catch((err) => console.log("❌ Lỗi kết nối MongoDB:", err));

// Một API test thử để kiểm tra server có sống không
app.get("/", (req, res) => {
  res.send("Chào mừng đến với Backend Ôn thi GPLX!");
});

// Định tuyến (Routes)
app.use("/api/questions", require("./routes/question"));
app.use("/api/auth", require("./routes/auth"));
app.use("/", require("./routes/history"));

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
