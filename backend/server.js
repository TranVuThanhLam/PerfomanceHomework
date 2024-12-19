const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const newsRoutes = require('./routes/news');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Cấu hình kết nối database (với connection pooling)
const config = {
  user: 'lam',
  password: 'lamlam',
  server: 'localhost',
  database: 'perfomance',
  options: {
    trustServerCertificate: true,
  },
  pool: {
    max: 10, // Tối đa 10 kết nối trong pool
    min: 0, // Tối thiểu 0 kết nối
    idleTimeoutMillis: 30000, // Thời gian chờ kết nối nhàn rỗi (30 giây)
  },
};

// Tạo connection pool một lần duy nhất khi khởi động server
const pool = new sql.ConnectionPool(config);

// Middleware kết nối database (sử dụng pool)
const connectToDatabase = async (req, res, next) => {
  try {
    req.pool = await pool.connect(); // Lấy kết nối từ pool
    next();
  } catch (err) {
    console.error("Lỗi kết nối CSDL:", err);
    return res.status(500).json({ error: "Lỗi kết nối CSDL" });
  }
};

app.get('/', (req, res) => {
  res.send('Chào mừng đến với API!');
});

app.use('/api/news', connectToDatabase, newsRoutes);

// Xử lý lỗi kết nối pool
pool.on('error', (err) => {
  console.error('Lỗi pool:', err);
});

app.listen(port, () => {
  console.log(`Server đang chạy trên port ${port}`);
});