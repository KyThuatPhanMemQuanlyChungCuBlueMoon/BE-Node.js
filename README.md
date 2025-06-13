# 🏢 Blue Moon Apartment Management System

Hệ thống quản lý chung cư Blue Moon - Dự án IT3180 Nhóm 7

## 📋 Mô tả dự án

Hệ thống quản lý chung cư toàn diện được xây dựng bằng MERN Stack (MongoDB, Express, Next.js, Node.js) để quản lý:
- Hộ gia đình và cư dân
- Các loại phí (quản lý, gửi xe, đóng góp)
- Thanh toán và doanh thu
- Báo cáo thống kê

## 📁 Cấu trúc thư mục

```
BE-Node.js/
├── controllers/         # Xử lý logic nghiệp vụ
├── middleware/         # Middleware xác thực và phân quyền
├── models/            # Schema và model MongoDB
├── routes/            # Định nghĩa các route API
├── scripts/           # Scripts tiện ích
├── seeders/           # Dữ liệu mẫu
├── .gitignore         # Cấu hình Git ignore
├── createAdminUser.js # Script tạo tài khoản admin
├── package.json       # Quản lý dependencies
├── package-lock.json  # Lock file cho dependencies
└── server.js          # File khởi động server
```

## 🚀 Tính năng chính

### 👤 Quản lý người dùng
- Đăng nhập/đăng xuất
- Phân quyền: Admin, Manager, Staff, Accountant
- Quản lý thông tin cá nhân

### 🏠 Quản lý hộ gia đình
- Thêm/sửa/xóa hộ gia đình
- Quản lý thông tin căn hộ
- Theo dõi cư dân

### 👥 Quản lý cư dân
- Đăng ký cư dân mới
- Cập nhật thông tin
- Quản lý tạm trú/tạm vắng

### 💰 Quản lý phí và thanh toán
- Tạo các loại phí: quản lý hàng tháng, gửi xe, đóng góp
- Ghi nhận thanh toán
- Hoàn tiền (Admin/Accountant)
- Tìm kiếm và lọc thanh toán theo trạng thái

### 📊 Báo cáo và thống kê
- Dashboard tổng quan
- Doanh thu theo tháng
- Biểu đồ xu hướng 6 tháng
- Thanh toán gần đây

## 🛠️ Công nghệ sử dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend

- **Next.js 14** - React Framework
- **TypeScript** - Ngôn ngữ lập trình
- **Tailwind CSS** - Framework CSS
- **Shadcn/ui** - Component library
- **React Context** - State management
- **Axios** - HTTP Client
- **React Query** - Data fetching
- **Chart.js** - Data visualization

## 📦 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (v17+)
- MongoDB (v4.5+)
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository
```bash
git clone [repository-url]
cd BE-Node.js
```

2. Cài đặt Backend
```bash
cd BE-Node.js
npm install
```

3. Cài đặt Frontend
```bash
cd ../FE-Next.js
npm install
```

4. Khởi động MongoDB
```bash
# Với Docker
docker run --name bluemoon-mongo -p 27017:27017 -d mongo

# Hoặc khởi động MongoDB service local
mongod
```

5. Cấu hình môi trường
Tạo file `.env` trong thư mục backend:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/bluemoon_apartment
JWT_SECRET=your_jwt_secret_here
```

6. Tạo dữ liệu mẫu (tùy chọn)
```bash
cd BE-Node.js
node createMassiveTestData.js
```

7. Chạy ứng dụng
```bash
# Backend (Port 5000)
cd BE-Node.js
npm run dev

# Frontend (Port 3000)
cd FE-Next.js
npm run dev
```

## 👤 Tài khoản mặc định
- Username: admin
- Password: admin123
- Role: admin

## 📊 Dữ liệu mẫu
Khi chạy script tạo dữ liệu, hệ thống sẽ có:
- 53 hộ gia đình
- 187 cư dân
- 1,040 thanh toán
- 4 loại phí khác nhau
- 6 người dùng với các quyền khác nhau

## 🔐 Phân quyền

| Vai trò | Quyền hạn |
|---------|-----------|
| Admin | Toàn quyền hệ thống |
| Manager | Quản lý hộ gia đình, cư dân |
| Staff | Xem thông tin, ghi nhận thanh toán |

## 📱 Giao diện
- Dashboard: Tổng quan hệ thống với biểu đồ
- Quản lý hộ gia đình: Danh sách và chi tiết hộ dân
- Quản lý thanh toán: Tìm kiếm, lọc theo trạng thái
- Báo cáo: Thống kê doanh thu và biểu đồ

## 🔧 API Endpoints

### Authentication
- `POST /api/users/login` - Đăng nhập
- `GET /api/users/profile` - Thông tin user

### Payments
- `GET /api/payments` - Danh sách thanh toán
- `GET /api/payments/:id` - Chi tiết thanh toán
- `GET /api/payments/search` - Tìm kiếm thanh toán

### Statistics
- `GET /api/statistics/dashboard` - Dữ liệu dashboard
- `GET /api/statistics/monthly-report` - Báo cáo tháng

## 📈 Dữ liệu thống kê
- Tổng doanh thu: 500,340,000 VND
- Doanh thu tháng hiện tại: 90,030,000 VND
- Tỷ lệ thanh toán: 95.55% đã thanh toán

### Trạng thái phân bố:
- Đã thanh toán: 892 (85.8%)
- Chưa thanh toán: 95 (9.1%)
- Quá hạn: 53 (5.1%)

## 🤝 Contributing

### Quy trình đóng góp

1. Clone project
```bash
https://github.com/KyThuatPhanMemQuanlyChungCuBlueMoon/BE-Node.js.git
```

2. Tạo feature branch
```bash
git checkout -b feature/TA
```

3. Add local repo
```bash
git add .
```

4. Commit changes theo format:
```bash
git commit -m "[type]: message"
```

Trong đó:
- **type**: Loại thay đổi
  - `create`: Tạo mới tính năng/file
  - `add`: Thêm code/tính năng vào file có sẵn
  - `update`: Cập nhật tính năng
  - `fix`: Sửa lỗi
  - `refactor`: Tối ưu code
  - `remove`: Xóa code/tính năng
- **message**: Mô tả ngắn gọn về thay đổi (tiếng Anh hoặc Việt)

Ví dụ:
```bash
git commit -m "[create]: Add user authentication"
git commit -m "[fix]: Sửa lỗi validate input"
git commit -m "[update]: Thêm middleware xác thực"
```

5. Push to branch
```bash
git push origin feature/TA
```

### ⚠️ Lưu ý quan trọng
- Luôn luôn `git pull` trước khi code
- Xử lý cẩn thận conflict
- Khi cần merge vào main thì sẽ trao đổi với team
