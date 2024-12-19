import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className='input-group p-5'>
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm..."
        value={searchTerm}
        onChange={handleChange}
        className='form-control'
      />
      <button type="submit"
        style={{
          height: '40px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '5px 10px',
        }}
        className='btn btn-primary'
      >Tìm kiếm</button>
    </form>
  );
}

export default SearchBar;