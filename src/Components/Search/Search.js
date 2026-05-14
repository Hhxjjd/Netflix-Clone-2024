import React, { useState } from 'react';
import './search.css';
import axios from '../../Utils/axios';
import MovieCard from '../MovieCard/MovieCard';

const Search = ({ onTrailerSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const API_KEY = process.env.REACT_APP_API_KEY;
    const searchUrl = `/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}`;

    const handleSearch = async (query) => {
        setSearchQuery(query);

        if (query.length > 2) {
            try {
                const response = await axios.get(searchUrl.replace(searchQuery, query));
                setSearchResults(response.data.results.filter(item => item.media_type !== 'person').slice(0, 12));
            } catch (error) {
                console.log("Search error:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className="search-container">
            <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Search movies, shows, people..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                />
                {searchQuery && (
                    <button className="clear-btn" onClick={clearSearch}>
                        ✕
                    </button>
                )}
            </div>

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h2>Search Results ({searchResults.length})</h2>
                    <div className="search-grid">
                        {searchResults?.map((movie, index) => (
                            <div key={index} className="search-result-card">
                                <MovieCard movie={movie} isLargeRow={false} onTrailerSelect={onTrailerSelect} />
                                <div className="result-title">
                                    {movie?.title || movie?.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
