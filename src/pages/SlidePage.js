import React, { useEffect, useState } from 'react';
import GlobalApi from "../app/GlobalApi";
import Slider from "react-slick";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function SlidePage() {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        getTrendingMovie();
    }, []);

    const getTrendingMovie = async () => {
        try {
            const response = await GlobalApi.getTrendingVideos();
            setMovieList(response.data.results);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching trending movies:', error);
        }
    };
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true, 
      };

    return (
            <Slider {...settings} >
                {movieList.map((item, index) => (
                    <div className='wrap-image'  key={item.id}>
                        <img  className='slide-image' src={IMAGE_BASE_URL + item.backdrop_path} alt={`Movie ${index}`} />
                        <div className="slide-overlay">
                            <h3 className="slide-title">{item.title}</h3>
                            <p className="slide-description">{item.release_date}</p>
                        </div>
                    </div>
                    
                ))}
            </Slider>

        
    );
}


export default SlidePage;
