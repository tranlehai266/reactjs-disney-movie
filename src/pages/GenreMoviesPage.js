import React, { useEffect, useState } from 'react';
import GlobalApi from '../app/GlobalApi';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GenreMoviesPage() {
    const { genreId } = useParams();  
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const navigate = useNavigate()

    const handleDetail = (id) => {
        navigate(`/detail/${id}`)
    }

    useEffect(() => {
        const getMoviesByGenre = async () => {
            try {
                const movieResponse = await GlobalApi.getMovies(genreId);
                console.log(movieResponse.data.results);
                setMovies(movieResponse.data.results);

                const genreResponse = await GlobalApi.getListVideos();
                const genres = genreResponse.data.genres;

                const genre = genres.find(g => g.id === parseInt(genreId));
                setGenreName(genre ? genre.name : 'Unknown Genre');

            } catch (error) {
                console.log(error);
            }
        };

        getMoviesByGenre();
    }, [genreId]);  // Chỉ cần genreId trong dependencies

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
                            marginBottom:"50px",
                            border:"3px solid #5c5c75",
                            overflow: 'hidden',
                            borderRadius: '10px',
                            width: "300px",
                            '&:hover .movie-info': {
                                opacity: 1,
                                visibility: 'visible'
                            }
                        }}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            onClick={() => handleDetail(`${movie.id}`)}
                            style={{
                                height: '100%',
                                transition: 'transform 0.3s ease',
                                marginBottom:"10px",
                                cursor:"pointer"
                            }}
                            
                        />
                        <Box className="movie-info" sx={{
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
                        }}>
                            <Typography variant="subtitle1">{movie.title}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default GenreMoviesPage;
