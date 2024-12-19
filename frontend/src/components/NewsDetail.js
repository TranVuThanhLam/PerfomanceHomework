import { useParams, useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const NewsDetail = () => {
  const [news, setNews] = useState([]);
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalNews, setOriginalNews] = useState([]); // Lưu trữ tin tức gốc

  useEffect(() => {
    console.time("thời gian tải detail: ");
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/news');
        setNews(response.data);
        setOriginalNews(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    console.timeEnd("thời gian tải detail: ");
    fetchNews();
  }, []);
  

  const newsItem = news ? news.find((item) => item.ID === parseInt(id)) : null; 

  const navigate = useNavigate(); 

  const handleBack = () => {
    navigate(-1); 
  };

  if (!newsItem) {
    return <div>Không tìm thấy tin tức.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleBack}
      className='btn btn-primary'
      >Trở về</button>
      <h2>{newsItem.Title}</h2>
      <p>ID: {newsItem.ID}</p>
      <p>{newsItem.Content}</p>
      <p>{newsItem.Description}</p>
    </div>
  );
};

export default NewsDetail;