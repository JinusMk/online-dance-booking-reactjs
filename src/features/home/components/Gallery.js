import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, lastWeekRecapVideos } from '../../../constants'
import "react-multi-carousel/lib/styles.css";

export default function Gallery(props){
    return(
        <div className="gallery block">
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={false}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={true}
                arrows={false}
                containerClass="partially-visible-carousel-container gallery-carousel"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {lastWeekRecapVideos.filter(item => item.category == "zumba").map((item, index) => <GalleryItem key={index} index={index+1} recap={item}/>)}
            </Carousel>
        </div>
    )
}

function GalleryItem(props){
    const { recap, index } = props
    return(
        <div className="gallery-item">
            <video height="164" poster={index == 1 ? recap.primaryImage: recap.img} controls className="custom-video">
                <source src={recap.media} type="video/mp4" />
                <source src={recap.media} type="video/ogg" />
                Your browser does not support the video tag.
            </video>
            <div className="class-info">
                <h3 className="heading3">{`${recap.category} dance for all levels`}</h3>
                <p className="paragraph">{`${recap.participants} dancers`}</p>
            </div>
        </div>
    )
}