const authService = require("../services/auth.service");

class UserController {
  // 1. Logic xử lý đăng ký
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Kiểm tra data đầu vào cơ bản
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Vui lòng điền đầy đủ thông tin" });
      }

      // Gọi sang tầng Service để xử lúy nghiệp vụ
      const result = await authService.register({ username, email, password });

      // Trả kết quả thành công
      return res.status(201).json({
        message: "Đăng ký thành công",
        data: result,
      });
    } catch (error) {
      // Nếu Service ném ra lỗi (Trùng email/username...), Controller sẽ bắt được ở đây
      return res.status(400).json({ message: error.message });
    }
  }

  // 2. Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(401).json({ message: "EMail or Password is empty" });
      }

      const result = await authService.login({ email, password });

      if (result) {
        return res.status(200).json({
          message: "Đăng nhap thanh cong",
          data: result,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // 3. Lấy thông tin user đang đăng nhập (dùng để khôi phục session khi F5 trang)
  // req.user đã được middleware `protect` gắn sẵn nên không cần query lại DB
  async getProfile(req, res) {
    return res.status(200).json({
      message: "Get profile thành công",
      data: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
}

module.exports = new UserController();
