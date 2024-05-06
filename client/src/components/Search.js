// Search.js
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
        setSearchTerm('');
    };

    return (
        <form onSubmit={handleSearch} className="search-container">
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="fa fa-search"></button>
        </form>
    );
};

export default Search;