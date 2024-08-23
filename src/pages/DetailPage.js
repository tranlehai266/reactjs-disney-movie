import React, { useEffect, useState, useCallback } from 'react';
import GlobalApi from '../app/GlobalApi';
import { useParams } from 'react-router-dom';
import { Box, Chip, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function DetailPage() {
    const { id } = useParams();  
    const [movieDetails, setMovieDetails] = useState(null);

    const detailResponse = useCallback(async () => {
        try {
            const response = await GlobalApi.getMovieDetails(id); 
            console.log(response.data);
            setMovieDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        detailResponse();
    }, [detailResponse]);

    if (!movieDetails) return <div>Loading...</div>;

    return (
        <Box
          sx={{
            position:"relative", 
            height:"100vh",
            borderRadius: 2,
            overflow:"hidden"
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
            style={{
              width:"100%",
              height:"100%",
            }}
          />

          <Box 
            sx={{
              position:'absolute',
              top:"32%",
              left:"5%"
            }}
          >
            <button style={{
              padding:"10px 20px",
              textAlign:"center",
              backgroundColor: "#fff",  
              color: "#000",
              border: "none",  
              borderRadius: "5px",  
              fontSize: "16px",  
              cursor: "pointer",  
              display: "flex", 
              alignItems: "center",  
              justifyContent: "center",  
              gap: "8px",  
              transition: "background-color 0.3s ease",   
            }}>
              <PlayArrowIcon />
              Play
            </button>
          </Box>
          <Box 
            sx={{
              position:'absolute',
              top:"32%",
              left:"12%"
            }}
          >
            <button style={{
              padding:"10px 20px",
              textAlign:"center",
              backgroundColor: "transparent",  
              color: "#fff",   
              border: "2px solid #fff", 
              borderRadius: "5px", 
              fontSize: "16px",  
              cursor: "pointer",  
              display: "flex", 
              alignItems: "center",  
              justifyContent: "center",  
              gap: "8px",  
              transition: "background-color 0.3s ease", 
              
            }}>
              <PlayArrowIcon />
              Trailer
            </button>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: "40%",
              left: "5%",
              gap: 2,
            }}
          >
            {movieDetails.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{
                  color: '#fff',
                  marginRight:"20px",
                  backgroundColor:"#676D77",
                  fontWeight:"bold"
                }}
              />
            ))}
            <Typography variant='h6' sx={{width:"450px", color:"#fff",marginTop:"15px",fontWeight:"bold" }}>{movieDetails.overview}</Typography>
          </Box>
        </Box>
      );
}

export default DetailPage;
