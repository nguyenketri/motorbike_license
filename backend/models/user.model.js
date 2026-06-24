const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, " User Name have more than 3 character"],
    },
    email: {
      type: String,
      required: [true, "Email is require"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không hợp lệ"],
    },
    password: {
      type: String,
      required: [true, "Password is require"],
      minlength: [6, "Password have to more than 6 character"],
      select: false, // Không tự động trả về mk khi query data
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Tự động tạo 2 trường: createdAt và updatedAt
  },
);

// tạo Model từ Schema và Export
const User = mongoose.model("User", userSchema);
module.exports = User;
