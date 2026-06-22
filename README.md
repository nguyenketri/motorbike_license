# 📚 Ôn Thi Bằng Lái Xe Máy - Motorbike License Test System

Hệ thống web hoàn chỉnh cho phép người dùng ôn luyện và thi lý thuyết bằng lái xe máy, Admin có thể quản lý câu hỏi và xem thống kê kết quả.

## 🎯 Chức Năng Chính

### 👤 User (Người Dùng)

- ✅ Đăng ký, đăng nhập tài khoản
- ✅ Ôn luyện với các câu hỏi
- ✅ Tham gia thi chính thức (40 câu, 60 phút)
- ✅ Xem kết quả thi và điểm số
- ✅ Xem lịch sử thi của mình
- ✅ Xem giải thích chi tiết các câu hỏi

### 🔧 Admin (Quản Trị Viên)

- ✅ Thêm, sửa, xóa câu hỏi
- ✅ Phân loại câu hỏi theo chủ đề và độ khó
- ✅ Tạo và quản lý bài thi
- ✅ Xem thống kê kết quả thi của tất cả user
- ✅ Xem tỷ lệ đạt, điểm trung bình

## 🛠️ Công Nghệ Sử Dụng

### Backend

- **Node.js + Express** - Web server
- **MongoDB** - Database NoSQL
- **Mongoose** - ODM (Object Data Modeling)
- **bcryptjs** - Mã hóa mật khẩu
- **CORS** - Xử lý cross-origin requests

### Frontend

- **React.js** - UI framework
- **CSS3** - Styling (modern gradient design)
- **Fetch API** - API communication
- **localStorage** - Client-side session management

### Database Schema

```
User
├── username (String, unique)
├── password (String, hashed)
├── role (String: 'user', 'admin')

Question
├── questionText (String)
├── topic (String: 'An toàn', 'Pháp luật', 'Kỹ năng', 'Bảo dưỡng')
├── difficulty (String: 'Dễ', 'Trung bình', 'Khó')
├── options (Object: A, B, C, D)
├── correctAnswer (String: A|B|C|D)
├── explanation (String)
├── createdBy (ObjectId -> User)

Exam
├── title (String)
├── questionIds (Array of ObjectId -> Question)
├── duration (Number: phút)
├── passingScore (Number)
├── isActive (Boolean)

TestResult
├── userId (ObjectId -> User)
├── examId (ObjectId -> Exam)
├── answers (Array of answers)
├── correctAnswers (Number)
├── score (Number: 0-100)
├── passed (Boolean)
├── endTime (Date)
```

---

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống

- Node.js v14+
- MongoDB (local hoặc Atlas)
- npm hoặc yarn

### 1️⃣ Backend Setup

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env
echo "MONGO_URI=mongodb://127.0.0.1:27017/ProjectSDN" > .env
echo "PORT=8080" >> .env

# Chạy backend
npm start
# Hoặc chạy với nodemon (dev mode)
npm run dev
```

### 2️⃣ Frontend Setup

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Tạo file .env
echo "REACT_APP_API_URL=http://localhost:8080/api" > .env

# Chạy frontend
npm start
# App sẽ mở tại http://localhost:3000
```

---

## 🚀 Chạy Project

### Terminal 1 - Backend

```bash
cd backend
npm run dev
# Output: 🚀 Server đang chạy tại http://localhost:8080
```

### Terminal 2 - Seed Data (tuỳ chọn)

```bash
cd backend
node scripts/seedQuestions.js
# Output: ✅ Inserted 10 questions
```

### Terminal 3 - Frontend

```bash
cd frontend
npm start
# Output: Compiled successfully!
# http://localhost:3000 sẽ mở trên browser
```

---

## 📝 Hướng Dẫn Sử Dụng

### 🔐 Đăng Ký Tài Khoản

1. Nhấp vào "Đăng ký tại đây"
2. Nhập username và password
3. Xác nhận mật khẩu
4. Nhấp "Đăng Ký"

### 👥 Tạo Admin Account

Hiện tại, admin được tạo bằng cách thêm trực tiếp vào database:

```javascript
// Trong MongoDB shell hoặc MongoDB Compass
db.users.insertOne({
  username: "admin123",
  password: "hashed_password", // Dùng bcrypt để hash
  role: "admin",
});
```

Hoặc dùng script:

```bash
cd backend
node scripts/createAdmin.js
```

### 📖 Ôn Luyện

1. Đăng nhập với tài khoản user
2. Chọn tab "Ôn Luyện"
3. Chọn câu hỏi và đáp án
4. Nhấp "Kiểm Tra Đáp Án" để xem kết quả

### 📝 Thi Chính Thức

1. Chọn tab "Thi Chính Thức"
2. Xem thông tin bài thi
3. Nhấp "Bắt Đầu Làm Bài Thi"
4. Trả lời 40 câu trong 60 phút
5. Nhấp "Nộp Bài Thi" để kết thúc

### 📊 Xem Kết Quả

1. Chọn tab "Lịch Sử Thi"
2. Xem danh sách bài thi đã làm
3. Nhấp vào bài thi để xem chi tiết

### 🔧 Admin Quản Lý

1. Đăng nhập với tài khoản admin
2. Bạn sẽ nhìn thấy Dashboard Admin
3. **Quản Lý Câu Hỏi**: Thêm, sửa, xóa câu hỏi
4. **Quản Lý Bài Thi**: Tạo bài thi mới
5. **Thống Kê**: Xem kết quả và thống kê thi

---

## 🔌 API Endpoints

### Authentication

```
POST /api/auth/register          - Đăng ký
POST /api/auth/login             - Đăng nhập
GET  /api/auth/profile           - Lấy profile user
```

### Questions (Admin)

```
GET  /api/questions              - Lấy tất cả câu hỏi
GET  /api/questions/:id          - Lấy chi tiết câu hỏi
POST /api/questions              - Thêm câu hỏi (Admin)
PUT  /api/questions/:id          - Sửa câu hỏi (Admin)
DELETE /api/questions/:id        - Xóa câu hỏi (Admin)
```

### Exams

```
GET  /api/exams/active           - Lấy bài thi hiện hành
POST /api/exams                  - Tạo bài thi (Admin)
PUT  /api/exams/:id              - Sửa bài thi (Admin)
DELETE /api/exams/:id            - Xóa bài thi (Admin)
```

### Tests (User)

```
POST /api/tests/submit           - Nộp bài thi
GET  /api/tests/history          - Lấy lịch sử thi
GET  /api/tests/result/:id       - Lấy chi tiết kết quả
```

---

## 👥 Test Accounts

### User Account

```
Username: user1
Password: 123456
```

### Admin Account

```
Username: admin
Password: admin123
```

---

## 📂 Cấu Trúc Thư Mục

```
motorbike-license/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── question.controller.js
│   │   │   ├── exam.controller.js
│   │   │   └── test.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Question.js
│   │   │   ├── Exam.js
│   │   │   └── TestResult.js
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── question.js
│   │       ├── exam.js
│   │       └── test.js
│   ├── scripts/
│   │   └── seedQuestions.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── UserDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .env
│   └── public/
│       └── index.html
│
├── .gitignore
├── README.md
└── motorbike-license.json
```

---

## 🎨 Giao Diện

- **Modern Design**: Gradient background, smooth animations
- **Responsive**: Tối ưu cho mobile, tablet, desktop
- **User-Friendly**: Navigation dễ dàng, UI trực quan

---

## 🐛 Troubleshooting

### Backend không kết nối MongoDB

```
❌ Error: connect ECONNREFUSED 127.0.0.1:27017

Giải pháp:
1. Kiểm tra MongoDB có chạy không: mongod
2. Hoặc dùng MongoDB Atlas (cloud)
3. Update MONGO_URI trong .env
```

### Frontend không kết nối Backend

```
❌ Error: Failed to fetch from http://localhost:8080

Giải pháp:
1. Kiểm tra backend có chạy trên port 8080
2. Kiểm tra CORS được enable trong server.js
3. Update API_BASE_URL trong src/api/api.js
```

### Port đã được sử dụng

```
❌ Error: listen EADDRINUSE: address already in use :::8080

Giải pháp:
# Tìm process đang dùng port 8080
lsof -i :8080
# Hoặc thay đổi PORT trong .env
PORT=8081
```

---

## 📋 Checklist Hoàn Thành

- ✅ Backend APIs hoàn chỉnh
- ✅ Database Schema đầy đủ
- ✅ Frontend UI đẹp mắt
- ✅ Authentication & Authorization
- ✅ CRUD Câu Hỏi (Admin)
- ✅ Thi Chính Thức
- ✅ Xem Kết Quả & Lịch Sử Thi
- ✅ Thống Kê (Admin)
- ✅ Seed Data
- ✅ Responsive Design
- ✅ Error Handling

---

## 🤝 Đóng Góp

Nếu bạn muốn cải thiện project, hãy:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Project này được cấp phép dưới MIT License - xem file [LICENSE](LICENSE) để chi tiết.

---

## 👨‍💻 Tác Giả

Được xây dựng bởi **GitHub Copilot** ❤️

---

## 📞 Support

Nếu gặp vấn đề, vui lòng:

1. Kiểm tra README carefully
2. Xem troubleshooting section
3. Hoặc liên hệ admin

---

**Happy Learning! 🎓**
