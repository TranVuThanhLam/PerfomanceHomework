fetch('http://localhost:5000', { mode: 'no-cors' })
  .then(response => response.json())
  .then(data => {
    // Xử lý dữ liệu nhận được
    console.log(data);
    // Hiển thị dữ liệu lên trang web
    const newsList = document.getElementById('news-list');
    data.forEach(news => {
      const newsItem = document.createElement('li');
      newsItem.innerHTML = `
        <h2>${news.Title}</h2>
        <p>${news.Content}</p>
        <p>${news.Description}</p>
      `;
      newsList.appendChild(newsItem);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });