import React, { useEffect, useState } from 'react';
import GlobalApi from '../app/GlobalApi';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Pagination } from '@mui/material';

function GenreMoviesPage() {
    const { genreId } = useParams();  
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
  
    const handleDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        const getMoviesByGenre = async () => {
            try {
                const movieResponse = await GlobalApi.getMovies(genreId, page);
                console.log(movieResponse.data.results);
                setMovies(movieResponse.data.results);
                setTotalPages(Math.min(movieResponse.data.total_pages, 500)); // API limit is 500 pages

                const genreResponse = await GlobalApi.getListVideos();
                const genres = genreResponse.data.genres;

                const genre = genres.find(g => g.id === parseInt(genreId));
                setGenreName(genre ? genre.name : 'Unknown Genre');

            } catch (error) {
                console.log(error);
            }
        };

        getMoviesByGenre();
    }, [genreId, page]);  

    return (
        <Box sx={{ padding: "20px", marginLeft: "50px" }}>
            <Typography variant="h4" color="#fff">{genreName}</Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: "20px",
                    marginBottom: "20px"
                }}
            >
                {movies.map((movie) => (
                    <Box
                        key={movie.id}
                        sx={{
                            position: 'relative',
                            border: "3px solid #5c5c75",
                            overflow: 'hidden',
                            borderRadius: '10px',
                            width:"300px",
                            height: '450px',
                            '&:hover' : {
                                border:"5px solid #fff"
                            },
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
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease',
                                cursor: "pointer"
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
                            padding: '10px',
                            borderRadius: '0 0 10px 10px',
                            opacity: 0,
                            visibility: 'hidden',
                            transition: 'opacity 0.3s ease, visibility 0.3s ease'
                        }}>
                            <Typography variant="subtitle1">{movie.title}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#fff',
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default GenreMoviesPage;