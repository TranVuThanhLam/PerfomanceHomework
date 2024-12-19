import axios from 'axios';

const newsService = {
    getNews: async () => {
        try {
            const response = await axios.get('/api/news'); // proxy config
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu news:", error);
            throw error;
        }
    },
};

export default newsService;