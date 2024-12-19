import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar'; 

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalNews, setOriginalNews] = useState([]);
  
  useEffect(() => {
    console.time("thời gian tải list: ");
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
    console.timeEnd("thời gian tải list: ");
    fetchNews();
  }, []);

  const handleSearch = (searchTerm) => { 
    if (!searchTerm) {
      setNews(originalNews); 
      return;
    }
    const filteredNews = originalNews.filter(item =>
      item.ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Description.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setNews(filteredNews);
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!news) return <p>Không có dữ liệu</p>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} /> 
      <ul>
      {console.log(news)}
        {news.map((item) => (
          <li key={item.ID}>
            <Link to={`/news/${item.ID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{item.ID} - {item.Title}</h3> 
              <p>{item.Description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;