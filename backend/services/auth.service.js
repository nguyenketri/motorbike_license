const userRepository = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../models/user.model");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "bi_mat_xyz", {
    expiresIn: "30d",
  });
};

class AuthService {
  // 1. Đăng ký
  async register({ username, email, password }) {
    // Gọi qua Repository
    const userExist = await userRepository.findByEmailOrUsername(
      email,
      username,
    );
    if (userExist) {
      throw new Error("Email or Username is Existed");
    }

    // gọi qua Repository
    const user = await userRepository.create({ username, email, password });

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    };
  }

  // 2. Dang nhap
  async login({ email, password }) {
    // Goi qua repository
    const user = await userRepository.findByEmailWithPassword(email);
    console.log(user);
    if (!user) {
      throw new Error("Email or Password not correct!");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Email or password not correct !");

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    };
  }
}
module.exports = new AuthService();
