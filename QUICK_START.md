# 🚀 QUICK START - Ôn Thi Bằng Lái Xe Máy

Chạy project trong **5 phút** với hướng dẫn này!

## 📋 Điều Kiện Tiên Quyết

- ✅ Node.js v14+
- ✅ MongoDB chạy trên `localhost:27017`
- ✅ npm hoặc yarn

---

## ⚡ Bước 1: Backend Setup (2 phút)

```bash
# Mở Terminal 1
cd backend

# Cài đặt dependencies
npm install

# Chạy backend
npm run dev

# Expected output:
# ✅ MongoDB Connected
# 🚀 Server đang chạy tại http://localhost:8080
```

---

## ⚡ Bước 2: Tạo Admin Account

```bash
# Mở Terminal 2 (trong thư mục backend)
node scripts/createAdmin.js

# Expected output:
# ✅ Admin account created successfully!
# 📝 Credentials:
#    Username: admin
#    Password: admin123
```

---

## ⚡ Bước 3: Seed Sample Data

```bash
# Tiếp tục trong Terminal 2
node scripts/seedQuestions.js

# Expected output:
# ✅ Inserted 10 questions
```

---

## ⚡ Bước 4: Frontend Setup (2 phút)

```bash
# Mở Terminal 3
cd frontend

# Cài đặt dependencies
npm install

# Chạy frontend
npm start

# Expected:
# Compiled successfully!
# Local: http://localhost:3000
```

---

## 🎯 Test Accounts

### User Account

```
Username: user1
Password: 123456
```

**Chú ý**: Bạn cần tự đăng ký hoặc tạo tài khoản này qua API

### Admin Account

```
Username: admin
Password: admin123
```

---

## 📝 Test Flow

### 1. Đăng Ký User Mới

- Truy cập http://localhost:3000
- Chọn "Đăng ký tại đây"
- Nhập: username=`user1`, password=`123456`
- Nhấp "Đăng Ký"

### 2. Đăng Nhập & Ôn Luyện

- Nhập: username=`user1`, password=`123456`
- Chọn tab "Ôn Luyện"
- Trả lời câu hỏi

### 3. Thi Chính Thức

- Chọn tab "Thi Chính Thức"
- Nhấp "Bắt Đầu Làm Bài Thi"
- Trả lời 40 câu trong 60 phút
- Nhấp "Nộp Bài Thi"

### 4. Xem Kết Quả

- Chọn tab "Lịch Sử Thi"
- Xem bảng danh sách kết quả

### 5. Admin Test

- Đăng Xuất từ user1
- Đăng nhập với admin account (admin/admin123)
- Bạn sẽ thấy Admin Dashboard
- Test: Thêm câu hỏi → Quản Lý Bài Thi → Thống Kê

---

## 🆘 Troubleshooting

| Problem                        | Solution                                        |
| ------------------------------ | ----------------------------------------------- |
| `ECONNREFUSED` (MongoDB)       | Chạy `mongod` hoặc dùng MongoDB Atlas           |
| `EADDRINUSE` port 8080         | Thay PORT trong backend/.env                    |
| Frontend không kết nối Backend | Kiểm tra `.env` file của Frontend               |
| Lỗi CORS                       | Kiểm tra backend server.js có `app.use(cors())` |

---

## 📊 Status Check

```bash
# Kiểm tra Backend API
curl http://localhost:8080/api/health
# Output: {"status":"Server đang chạy"}

# Kiểm tra Frontend
# Truy cập http://localhost:3000
# Nếu thấy trang đăng nhập = OK!
```

---

## 🎨 Tính Năng Chính

| Feature           | User | Admin |
| ----------------- | ---- | ----- |
| Đăng Ký/Đăng Nhập | ✅   | ✅    |
| Ôn Luyện Câu Hỏi  | ✅   | -     |
| Thi Chính Thức    | ✅   | -     |
| Xem Kết Quả       | ✅   | ✅    |
| Quản Lý Câu Hỏi   | -    | ✅    |
| Quản Lý Bài Thi   | -    | ✅    |
| Thống Kê Kết Quả  | -    | ✅    |

---

## 📚 Docs

Tham khảo [README.md](README.md) để chi tiết đầy đủ

---

**Chúc bạn thử nghiệm thành công! 🎉**
