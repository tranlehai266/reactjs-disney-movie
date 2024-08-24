import React, { useEffect, useState } from 'react';
import GlobalApi from '../app/GlobalApi';
import { useParams } from 'react-router-dom';
import './SearchResult.css'; 

function SearchResult() {
    const { searchInput } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await GlobalApi.getSearchMovies(searchInput);
                setSearchResults(response.data.results);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchResults();
    }, [searchInput]);

    return (
        <div className="search-results">
            <h2 className="title">Search Results for "{searchInput}"</h2>
            <div className="results-container">
                {searchResults.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <p className="movie-title">{movie.title}</p>
                        <img className="movie-poster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResult;
