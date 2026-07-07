// Import các thư viện cần thiết
const express = require("express");
const cors = require("cors"); // Thư viện cho phép FE gọi API tránh bị lỗi CORS
require("dotenv").config(); // Kích hoạt đọc file .env
const userRoutes = require("./routes/user.routes");
const questionRoutes = require("./routes/question.routes");
const historyRoutes = require("./routes/history.routes");
// 2. IMPORT các cấu hình và routes tự viết
const connectDB = require("./config/database");

// 3. Khởi tạo Ứng dụng Express
const app = express();

// 4. Kết nối Database
connectDB();

// 5 cấu hình Middleware toàn cục
app.use(cors()); // cho phép các ứng dụng khác React, Vue, Flutter gọi API
app.use(express.json()); // Cho phép Express đọc data từ JSON gửi lên req.body

// Endpoint kiểm tra nhanh server còn sống hay không (FE dùng để debug kết nối)
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server đang chạy" });
});

// 6. ĐỊnh nghĩa các đường dẫn API (ROUTES)
app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/history", historyRoutes);

//7. KHởi chạy SERVER (LISTEN PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`=========================================`);
});
