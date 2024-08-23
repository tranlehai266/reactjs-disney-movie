import { Container } from '@mui/material'
import React from 'react'
import disney from "../viewers-disney.png"
import marvel from "../viewers-marvel.png"
import national from "../viewers-national.png"
import pixar from "../viewers-pixar.png"
import starwars from "../viewers-starwars.png"

import disneyV from "../video/disney.mp4"
import marvelV from "../video/marvel.mp4"
import nationalV from "../video/national.mp4"
import pixarV from "../video/pixar.mp4"
import starwarsV from "../video/starwars.mp4"


function CardPage() {
    const productionHouseList=[
        {
            id:1,
            image:disney,
            video:disneyV
        },
        {
            id:2,
            image:pixar,
            video:pixarV
        },
        {
            id:3,
            image:marvel,
            video:marvelV
        },
        {
            id:4,
            image:starwars,
            video:starwarsV
        },
        {
            id:5,
            image:national,
            video:nationalV
        },

    ]
    return (
        <div className="production-house-container">
            {productionHouseList.map((item) => (
                <div className="production-house-item" key={item.id}>
                    <img src={item.image} alt="Production House" className="production-house-image" />
                    <video
                        src={item.video}
                        autoPlay
                        loop
                        playsInline
                        muted
                        className="production-house-video"
                    ></video>
                </div>
            ))}
        </div>
    )
}

export default CardPage
