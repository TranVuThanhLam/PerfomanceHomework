const express = require('express');
const router = express.Router();

const executeQuery = async (req, res, query) => {
  try {
    const result = await req.pool.request().query(query);
    res.json(result.recordset); // Gửi kết quả về client
  } catch (error) {
    console.error("Lỗi truy vấn CSDL:", error);
    res.status(500).json({ error: "Lỗi truy vấn CSDL" });
  }
};

// Route lấy tất cả tin tức
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT ID, Title, Description FROM news';
    await executeQuery(req, res, query);
  } catch (error) {
    // Lỗi đã được xử lý trong executeQuery
  }
});

// Route tìm kiếm tin tức
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;

    if (!searchTerm) {
      return res.status(400).json({ message: "Vui lòng cung cấp từ khóa tìm kiếm." });
    }

    const query = `
      SELECT ID, Title, Description
      FROM News
      WHERE Title LIKE '%${searchTerm}%' OR Content LIKE '%${searchTerm}%' OR Description LIKE '%${searchTerm}%';
    `;

    await executeQuery(req, res, query);
  } catch (error) {
    // Lỗi đã được xử lý trong executeQuery
  }
});

module.exports = router;