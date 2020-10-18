import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, lastWeekRecapVideos } from '../../../constants'
import Skeleton from '@material-ui/lab/Skeleton';
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
                arrows={props.loader ? false : true}
                containerClass="partially-visible-carousel-container gallery-carousel"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {props.loader ? [0,1].map((item, index) => <div key={index} className="gallery-skeleton-wrapper">
                    <Skeleton variant="rect" height={170}/>
                </div>): lastWeekRecapVideos.filter(item => item.category == props.category).map((item, index) => <GalleryItem key={index} recap={item}/>)}
            </Carousel>
        </div>
    )
}

function GalleryItem(props){
    const { recap } = props
    return(
        <div className="gallery-item">
            <video height="164" poster={recap.img} controls className="custom-video">
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