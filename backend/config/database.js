const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Quá trình kết nối tới MongoDB
    // DÙng biến môi trường process.env.MONGO_URI
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/ProjectSDN",
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Error Database Connect: ${error.message}`);
    process.exist(1); // Dừng ứng dụng ngay khi lỗi kết nối DB
  }
};

module.exports = connectDB;
