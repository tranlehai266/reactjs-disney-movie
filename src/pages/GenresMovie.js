import React, { useEffect, useState } from 'react'
import GlobalApi from '../app/GlobalApi'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function GenresMovie({genresID}) {
    const [genresMovie, setGenresMovie] = useState([])
    const navigate = useNavigate()
    
    const handleClickDetail = (id) => {
        navigate(`detail/${id}`)
    }

    useEffect(()=>{
        getGenresMovie()
    },[genresID])

    const getGenresMovie = async () => {
        try {
            const response = await GlobalApi.getMovies(genresID)
            console.log("genresID",response.data.results)
            setGenresMovie(response.data.results.slice(0,8))            
        } catch (error) {
            console.log(error)
        }        
    }

  return (
    <div className="genres-movie-container">
            <Box className="genres-movie-box">
                {genresMovie.map((item) => (
                    <div key={item.id} className="genres-movie-item">
                        <img  style={{cursor:"pointer"}} className="genres-movie-img" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title}
                        onClick={() => handleClickDetail(item.id)}
                         />
                        <div>
                            <p>{item.name}</p>
                        </div>
                    </div>
                ))}
            </Box>
    </div>
  )
}

export default GenresMovie
