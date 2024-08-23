import React, { useEffect, useState } from 'react';
import GlobalApi from '../app/GlobalApi';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function GenreMoviesPage() {
    const { genreId } = useParams();  
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMoviesAndGenre();
    }, [genreId]);

    const fetchMoviesAndGenre = async () => {
        try {
            const [movieResponse, genreResponse] = await Promise.all([
                GlobalApi.getMovies(genreId),
                GlobalApi.getListVideos()
            ]);

            setMovies(movieResponse.data.results);

            const genres = genreResponse.data.genres;
            const genre = genres.find(g => g.id === parseInt(genreId));
            setGenreName(genre ? genre.name : 'Unknown Genre');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDetail = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <Box sx={{ padding: "20px", marginLeft: "50px" }}>
            <Typography variant="h4" color="#fff">{genreName}</Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '10px',
                    marginTop: "10px"
                }}
            >
                {movies.map((movie) => (
                    <Box
                        key={movie.id}
                        sx={{
                            position: 'relative',
                            marginBottom: "50px",
                            border: "3px solid #5c5c75",
                            overflow: 'hidden',
                            borderRadius: '10px',
                            width: "300px",
                            cursor: "pointer",
                            '&:hover img': {
                                transform: 'scale(1.1)'
                            },
                            '&:hover .movie-info': {
                                opacity: 1,
                                visibility: 'visible'
                            }
                        }}
                        onClick={() => handleDetail(movie.id)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.3s ease'
                            }}
                        />
                        <Box
                            className="movie-info"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'rgba(0, 0, 0, 0.7)',
                                color: '#fff',
                                textAlign: 'center',
                                borderRadius: '10px',
                                opacity: 0,
                                visibility: 'hidden',
                                transition: 'opacity 0.3s ease, visibility 0.3s ease'
                            }}
                        >
                            <Typography variant="subtitle1">{movie.title}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default GenreMoviesPage;
