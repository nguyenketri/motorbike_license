// Script tạo tài khoản Admin đầu tiên cho hệ thống.
// Cần thiết vì API POST /api/user/register luôn gán role mặc định là "user",
// không có cách nào tạo admin qua API công khai (đúng nguyên tắc bảo mật).
// Chạy: node scripts/seedAdmin.js
require("dotenv").config();
const connectDB = require("../config/database");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");

const ADMIN_ACCOUNT = {
  username: "admin",
  email: "admin@motorbike-license.local",
  password: "admin123",
  role: "admin",
};

async function seedAdmin() {
  await connectDB();

  const existed = await User.findOne({ username: ADMIN_ACCOUNT.username });
  if (existed) {
    console.log("⚠️  Tài khoản admin đã tồn tại, bỏ qua bước tạo mới.");
  } else {
    // Không gọi User.create trực tiếp bằng insertMany để đảm bảo hook
    // pre("save") băm mật khẩu vẫn chạy
    const admin = new User(ADMIN_ACCOUNT);
    await admin.save();
    console.log("✅ Tạo tài khoản admin thành công!");
    console.log(`   Username: ${ADMIN_ACCOUNT.username}`);
    console.log(`   Password: ${ADMIN_ACCOUNT.password}`);
  }

  await mongoose.connection.close();
}

seedAdmin().catch((error) => {
  console.error("❌ Lỗi khi seed admin:", error.message);
  process.exit(1);
});
