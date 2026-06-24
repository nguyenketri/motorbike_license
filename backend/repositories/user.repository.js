const { User } = require("../models/user.model");

class UserRepository {
  // Tìm user theo email (bao gồm cả password để phục vụ login)
  async findByEmailWithPassword(email) {
    return await User.findOne({ email }).select("+password");
  }

  // Tìm user theo email hoặc username (để check trùng khi register)
  async findByEmailOrUsername(email, username) {
    return await User.findOne({ $or: [{ email }, { username }] });
  }

  // Tạo mới 1 user
  async create(userData) {
    return await User.create(userData);
  }

  // Tìm theo ID (phục vụ cho middleware auth sau này)
  async findById(id) {
    return await User.findById(id);
  }
}

module.exports = new UserRepository();
