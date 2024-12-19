import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsDetail from './components/NewsDetail';
import NewsList from './components/NewsList';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <h1 className='bg-info text-white p-5 shadow d-flex justify-content-center align-items-cente'>Tin Tức</h1>
            <div className="container">
                <Routes>
                    <Route path="/" element={<NewsList />} /> 
                    <Route path="/news/:id" element={<NewsDetail />} /> 
                </Routes>
            </div>
        </Router>
    );
}

export default App;