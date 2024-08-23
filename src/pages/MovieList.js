import React, { useEffect, useState } from 'react'
import GlobalApi from '../app/GlobalApi'
import { Box, Button } from '@mui/material'
import GenresMovie from './GenresMovie'
import {  useNavigate } from 'react-router-dom'


function MovieList() {
    const [ movieList , setMovieList] = useState([])
    const navigate = useNavigate()
  

    const handleMovieList = (genreId) => {
        navigate(`/genre/${genreId}`);
      };

    useEffect(() => {
        getListVideo()
    },[])

    const getListVideo = async () => {
        try {
            const response = await GlobalApi.getListVideos()
            console.log("MovieList",response.data.genres)
            setMovieList(response.data.genres.slice(0,5))
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Box sx={{marginLeft:"50px"}}>
      {movieList.map((item,index) => (
        <div key={item.id}>
            <Button variant="text" sx={{color:"#fff", fontWeight:"bold"}} onClick={() => handleMovieList(item.id)}>
                {item.name}
            </Button>
            <GenresMovie genresID={item.id}/>
        </div>
      ))}
    </Box>
  )
}

export default MovieList
