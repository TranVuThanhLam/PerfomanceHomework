// server.js (Backend - giữ nguyên phần kết nối database)
var express = require('express');
var app = express();
var sql = require("mssql");
const cors = require('cors'); // Import cors

app.use(cors()); // Enable CORS for all routes

// config for your database
var config = {
    user: 'lam',
    password: 'lamlam',
    server: 'localhost',
    database: 'perfomance',
    options: {
        trustServerCertificate: true
    }
};

app.get('/api/news', function (req, res) { // Đổi endpoint thành /api/news
    sql.connect(config, function (err) {
        if (err) {
            console.error("Database connection error:", err);
            return res.status(500).send({ error: "Database connection error" }); // Gửi lỗi 500
        }

        var request = new sql.Request();
        request.query('SELECT TOP 100 ID, Title, Content, Description from news', function (err, recordset) {
            if (err) {
                console.error("Query error:", err);
                return res.status(500).send({ error: "Query error" }); // Gửi lỗi 500
            }
            res.json(recordset.recordset); // Gửi dữ liệu JSON, chỉ lấy recordset
            sql.close(); // Đóng kết nối sau khi truy vấn
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running on port 5000..');
});


// client.js (Frontend - ví dụ sử dụng React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null); // State để lưu lỗi

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news'); // Gọi API backend
                setNews(response.data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news. Please try again later."); // Set lỗi
            }
        };

        fetchNews();
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // Hiển thị thông báo lỗi nếu có
    }

    if (!news) {
        return <div>Loading...</div>; // Hiển thị loading trong khi chờ dữ liệu
    }

    return (
        <div className="App">
            <h1>News</h1>
            <ul>
                {news.map(item => (
                    <li key={item.ID}>
                        <h2>{item.Title}</h2>
                        <p>{item.Description}</p>
                        {/* Hiển thị thêm Content nếu cần */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;