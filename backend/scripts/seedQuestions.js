// Script chèn dữ liệu câu hỏi mẫu (~30 câu) để có ngay dữ liệu test hệ thống.
// Chạy: node scripts/seedQuestions.js
// Lưu ý: script sẽ XOÁ toàn bộ câu hỏi cũ trước khi chèn lại, chỉ dùng cho môi trường dev/test.
require("dotenv").config();
const connectDB = require("../config/database");
const MotorQuestion = require("../models/motorQuestion.model");
const mongoose = require("mongoose");

const questions = [
  {
    title: "Biển báo hình tròn, viền đỏ, nền trắng thuộc nhóm biển báo nào?",
    answer: ["Biển báo cấm", "Biển báo nguy hiểm", "Biển hiệu lệnh", "Biển chỉ dẫn"],
    correctAnswer: 0,
    isCritical: false,
  },
  {
    title: "Khi gặp biển báo này, người điều khiển xe máy phải làm gì?",
    answer: [
      "Dừng lại hoàn toàn, quan sát an toàn mới được đi tiếp",
      "Giảm tốc độ, chú ý quan sát và nhường đường",
      "Tăng tốc để vượt qua nhanh",
      "Không cần chú ý vì không ảnh hưởng xe máy",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Người điều khiển xe máy đã uống rượu, bia có được phép lái xe không?",
    answer: [
      "Được phép nếu uống ít",
      "Được phép nếu đi đường ngắn, quen thuộc",
      "Tuyệt đối không được điều khiển xe khi trong máu hoặc hơi thở có nồng độ cồn",
      "Chỉ cấm vào buổi tối",
    ],
    correctAnswer: 2,
    isCritical: true,
  },
  {
    title: "Tốc độ tối đa cho phép của xe máy trong khu vực đông dân cư là bao nhiêu?",
    answer: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Khi điều khiển xe máy, người lái và người ngồi sau bắt buộc phải làm gì?",
    answer: [
      "Đội mũ bảo hiểm có cài quai đúng quy cách",
      "Đội mũ bảo hiểm nhưng không cần cài quai",
      "Chỉ người lái cần đội mũ bảo hiểm",
      "Không bắt buộc đội mũ bảo hiểm nếu đi đường gần",
    ],
    correctAnswer: 0,
    isCritical: true,
  },
  {
    title: "Khi thấy đèn tín hiệu giao thông chuyển sang màu vàng, người lái xe phải xử lý thế nào?",
    answer: [
      "Tăng tốc vượt qua ngay",
      "Dừng lại trước vạch dừng, trừ trường hợp đã đi quá vạch dừng thì tiếp tục đi",
      "Đi bình thường như đèn xanh",
      "Bấm còi liên tục rồi đi tiếp",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Xe máy có được đi vào đường cao tốc không?",
    answer: [
      "Được phép nếu đi sát làn dừng khẩn cấp",
      "Được phép vào ban đêm",
      "Không được phép, xe máy bị cấm đi vào đường cao tốc",
      "Được phép nếu tốc độ tối đa của xe trên 70 km/h",
    ],
    correctAnswer: 2,
    isCritical: true,
  },
  {
    title: "Khi muốn chuyển hướng (rẽ trái/phải), người điều khiển xe máy phải làm gì?",
    answer: [
      "Bật xi-nhan báo hướng rẽ và quan sát an toàn trước khi chuyển hướng",
      "Chỉ cần giảm tốc độ, không cần báo hiệu",
      "Bấm còi thay cho việc bật xi-nhan",
      "Không cần báo hiệu nếu đường vắng",
    ],
    correctAnswer: 0,
    isCritical: false,
  },
  {
    title: "Người đủ bao nhiêu tuổi thì được cấp giấy phép lái xe hạng A1 (xe máy dưới 175cm3)?",
    answer: ["Đủ 14 tuổi", "Đủ 16 tuổi", "Đủ 18 tuổi", "Đủ 20 tuổi"],
    correctAnswer: 2,
    isCritical: true,
  },
  {
    title: "Khi đến gần đường giao nhau có vòng xuyến (bùng binh) không có tín hiệu đèn, xe nào được ưu tiên đi trước?",
    answer: [
      "Xe đi từ bên trái tới",
      "Xe đi từ bên phải tới",
      "Xe nào đến trước đi trước, xe đến sau nhường xe đến trước",
      "Xe máy luôn được ưu tiên hơn ô tô",
    ],
    correctAnswer: 2,
    isCritical: false,
  },
  {
    title: "Khi tránh nhau (đi ngược chiều) trên đường hẹp, người lái xe phải nhường đường thế nào?",
    answer: [
      "Xe xuống dốc phải nhường đường cho xe đang lên dốc",
      "Xe lên dốc phải nhường đường cho xe đang xuống dốc",
      "Ai đến trước đi trước",
      "Xe to hơn được đi trước",
    ],
    correctAnswer: 0,
    isCritical: false,
  },
  {
    title: "Xe ưu tiên nào được quyền đi trước, các xe khác phải nhường đường (kể cả khi có tín hiệu đèn đỏ)?",
    answer: [
      "Xe taxi đang chở khách",
      "Xe cứu hỏa, cứu thương, công an, quân sự đang làm nhiệm vụ khẩn cấp",
      "Xe buýt",
      "Xe chở học sinh",
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    title: "Khi vượt xe khác, người điều khiển xe máy phải vượt về phía nào?",
    answer: [
      "Bên phải xe bị vượt",
      "Bên trái xe bị vượt (trừ trường hợp được phép vượt bên phải)",
      "Vượt bên nào cũng được, miễn nhanh",
      "Không được phép vượt xe khác",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Trong khu dân cư, người lái xe máy có được sử dụng còi hơi, còi có âm lượng lớn không?",
    answer: [
      "Được phép để cảnh báo",
      "Không được sử dụng vì gây ảnh hưởng đến sinh hoạt của người dân",
      "Chỉ được dùng vào ban ngày",
      "Chỉ được dùng khi đường đông",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Khi đi qua nơi đường bộ giao cắt đường sắt không có rào chắn, người lái xe phải làm gì?",
    answer: [
      "Tăng tốc vượt qua nhanh trước khi tàu tới",
      "Quan sát cả hai phía, nếu thấy tàu đang đến thì phải dừng lại cách rào chắn hoặc đường ray một khoảng cách an toàn",
      "Bấm còi rồi đi tiếp bình thường",
      "Không cần quan sát nếu không thấy rào chắn",
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    title: "Người điều khiển xe máy có được dùng ô (dù), điện thoại khi đang lái xe không?",
    answer: [
      "Được phép nếu trời mưa",
      "Không được phép vì mất khả năng quan sát và xử lý tình huống",
      "Được phép nếu đi tốc độ chậm",
      "Chỉ cấm dùng điện thoại, được phép dùng ô",
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    title: "Vạch kẻ đường màu trắng, nét đứt, có ý nghĩa gì?",
    answer: [
      "Vạch phân chia các làn xe cùng chiều, được phép chuyển làn",
      "Vạch cấm vượt",
      "Vạch dành riêng cho người đi bộ",
      "Vạch phân chia hai chiều xe ngược nhau, cấm vượt",
    ],
    correctAnswer: 0,
    isCritical: false,
  },
  {
    title: "Khi đỗ xe trên đường có vỉa hè, khoảng cách tối đa mép ngoài cùng của xe cách vỉa hè bao nhiêu?",
    answer: ["0,15 mét", "0,25 mét", "0,5 mét", "1 mét"],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Người ngồi trên xe máy có được mang vác vật cồng kềnh gây cản trở, mất an toàn giao thông không?",
    answer: [
      "Được phép nếu buộc chắc chắn",
      "Không được phép chở hàng hoá cồng kềnh gây mất an toàn, che khuất tầm nhìn",
      "Được phép vào buổi tối",
      "Chỉ cấm nếu đi trên đường cao tốc",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Khi tham gia giao thông, giấy tờ nào bắt buộc phải mang theo đối với người điều khiển xe máy?",
    answer: [
      "Chỉ cần chứng minh nhân dân",
      "Giấy phép lái xe phù hợp, giấy đăng ký xe, bảo hiểm trách nhiệm dân sự bắt buộc",
      "Chỉ cần giấy đăng ký xe",
      "Không bắt buộc mang theo giấy tờ gì",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Khi phía trước có đám tang hoặc đoàn xe tang đang di chuyển, người lái xe máy phải xử lý thế nào?",
    answer: [
      "Bấm còi xin vượt",
      "Giảm tốc độ và nhường đường",
      "Đi song song để quan sát",
      "Không cần chú ý, cứ đi bình thường",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Khoảng cách an toàn tối thiểu giữa các xe khi tham gia giao thông trên đường phụ thuộc chủ yếu vào yếu tố nào?",
    answer: [
      "Màu sơn của xe",
      "Tốc độ lưu hành và điều kiện mặt đường, thời tiết",
      "Loại nhiên liệu xe sử dụng",
      "Số lượng người trên xe",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Xe máy chở tối đa bao nhiêu người (không tính người lái) theo quy định, trừ trường hợp chở người bệnh cấp cứu hoặc trẻ em dưới 14 tuổi?",
    answer: ["1 người", "2 người", "3 người", "Không giới hạn"],
    correctAnswer: 0,
    isCritical: false,
  },
  {
    title: "Khi điều khiển xe máy trong điều kiện sương mù, tầm nhìn hạn chế, người lái cần làm gì?",
    answer: [
      "Bật đèn chiếu xa để nhìn rõ hơn",
      "Giảm tốc độ, bật đèn chiếu gần hoặc đèn sương mù, giữ khoảng cách an toàn lớn hơn",
      "Đi sát xe phía trước để theo đường",
      "Tắt hết đèn để tránh chói mắt",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Hành vi nào sau đây bị nghiêm cấm tuyệt đối vì gây nguy hiểm chết người khi lái xe máy?",
    answer: [
      "Đi đúng làn đường quy định",
      "Buông cả hai tay khi đang điều khiển xe, lạng lách, đánh võng, đua xe trái phép",
      "Bật xi-nhan khi chuyển làn",
      "Đội mũ bảo hiểm đạt chuẩn",
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    title: "Biển báo \"Cấm đi ngược chiều\" có hình dạng và màu sắc như thế nào?",
    answer: [
      "Hình tròn, nền đỏ, có gạch ngang trắng ở giữa",
      "Hình tam giác, viền đỏ, nền vàng",
      "Hình vuông, nền xanh",
      "Hình tròn, nền xanh, mũi tên trắng",
    ],
    correctAnswer: 0,
    isCritical: false,
  },
  {
    title: "Người lái xe máy cố tình đi ngược chiều trên đường một chiều, đường cao tốc có bị coi là hành vi đặc biệt nguy hiểm không?",
    answer: [
      "Không, chỉ là vi phạm nhẹ",
      "Có, đây là hành vi đặc biệt nguy hiểm, dễ gây tai nạn nghiêm trọng",
      "Chỉ nguy hiểm vào ban đêm",
      "Chỉ nguy hiểm khi trời mưa",
    ],
    correctAnswer: 1,
    isCritical: true,
  },
  {
    title: "Khi qua nơi có vạch kẻ đường dành cho người đi bộ mà không có đèn tín hiệu, người lái xe máy phải làm gì?",
    answer: [
      "Đi nhanh qua trước khi người đi bộ bước xuống",
      "Giảm tốc độ, nhường đường cho người đi bộ đang qua đường",
      "Bấm còi cho người đi bộ tránh",
      "Không cần nhường vì xe máy được ưu tiên",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Gương chiếu hậu, đèn chiếu sáng, đèn xi-nhan trên xe máy có vai trò gì?",
    answer: [
      "Chỉ mang tính trang trí",
      "Là các bộ phận bắt buộc để đảm bảo an toàn khi quan sát và báo hiệu hướng đi",
      "Không bắt buộc phải có",
      "Chỉ cần thiết khi đi ban đêm",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
  {
    title: "Khi xe máy bị hỏng phải dừng, đỗ trên đường vào ban đêm, người lái cần làm gì để đảm bảo an toàn?",
    answer: [
      "Để nguyên xe giữa đường và rời đi",
      "Đặt biển báo/tín hiệu cảnh báo, bật đèn cảnh báo và đưa xe vào vị trí an toàn nhất có thể",
      "Không cần làm gì vì trời tối sẽ không ai thấy",
      "Chỉ cần đứng gần xe vẫy tay",
    ],
    correctAnswer: 1,
    isCritical: false,
  },
];

async function seedQuestions() {
  await connectDB();

  await MotorQuestion.deleteMany({});
  const inserted = await MotorQuestion.insertMany(questions);

  console.log(`✅ Inserted ${inserted.length} questions`);
  await mongoose.connection.close();
}

seedQuestions().catch((error) => {
  console.error("❌ Lỗi khi seed questions:", error.message);
  process.exit(1);
});
