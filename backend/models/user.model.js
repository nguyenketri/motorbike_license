const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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

// Giữ lại cái này để tự băm mật khẩu khi Register (Rất tiện)
// Bỏ tham số next ở hàm async function ()
userSchema.pre("save", async function () {
  // Nếu mật khẩu không bị chỉnh sửa thì thoát ra luôn (bằng return)
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // KHÔNG CẦN GỌI next() Ở ĐÂY NỮA
});

// tạo Model từ Schema và Export
const User = mongoose.model("User", userSchema);
// HÀM TIỆN ÍCH ĐỘC LẬP (Không nằm trong Schema.methods)
const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// EXPORT CẢ HAI ĐỐI TƯỢNG RA NGOÀI DƯỚI DẠNG OBJECT
module.exports = {
  User,
  comparePassword,
};
