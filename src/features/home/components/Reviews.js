import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, reviewsData } from '../../../constants'
import { ReviewCard } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";

export default function Reviews(props){
    return(
        <div className="reviews block">
            <h3 className="heading2 title">Letzdancers speak</h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={isMobile ? true: false}
                arrows={isMobile ? true : true}
                containerClass="partially-visible-carousel-container reviews"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {
                    reviewsData.map((item, index) => <ReviewCard key={index} review={item}/>)
                }
            </Carousel>
        </div>
    )
}