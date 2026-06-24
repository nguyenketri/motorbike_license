const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const protect = async (req, res, next) => {
  let token;

  // 1. Kiểm tra xem token có nằm trong header(Authorzation: Bearer <token>) ) ko?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2, lấy token ra khỏi chuỗi "Bearer <token>"

      token = req.headers.authorization.split(" ")[1];

      // 3. Giải mã token để lấy UserId (lúc đăng nhập đã mã hóa id vào đây);
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "bi_mat_xyz");

      // 4. Tìm User từ DB thông qua Repository và gắn vào viến req.user
      // Nhờ vậy, tất cả các Controller phía sau chỉ cần gọi req.user là có đủ thông tin
      req.user = await userRepository.findById(decoded.id);

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Người dùng không tồn tại trên hệ thống" });
      }

      // 5. Hợp lệ hoàn toàn, cho phép đi tiếp sang Controller
      next();
    } catch (error) {
      console.error("Lỗi xác thực token:", error.message);
      return res
        .status(401)
        .json({ message: "Token không hợp lệ hoặc hết hạn" });
    }
  }
  // Nếu hoàn toàn không có token gửi lên
  if (!token) {
    return res
      .status(401)
      .json({ message: "Bạn không có quyền truy cập, thiếu Token!" });
  }

  // Middleware phân quyền nâng cao: Chặn người dùng thường, chỉ cho phép Admin vào (Ví dụ: API thêm câu hỏi)
};

// Middleware phân quyền nâng cao: Chặn người dùng thường, chỉ cho phép Admin vào (Ví dụ: API thêm câu hỏi)
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Quyền truy cập bị từ chối! Bạn không phải Admin." });
  }
};

module.exports = { protect, authorizeAdmin };
