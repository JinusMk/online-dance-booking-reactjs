import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, lastWeekRecapVideos } from '../../../constants'
import { RecapItem } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";

export default function LastweekRecap(props){
    return(
         <div className="last-week-recap block">
            <h3 className="heading2 title">Last week recap</h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={isMobile ? true : false}
                arrows={isMobile ? false : true }
                containerClass="partially-visible-carousel-container last-week-recap"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {
                    lastWeekRecapVideos.map((item, index) => <RecapItem recap={item} key={index}/>)
                }
            </Carousel>
     </div>
    )
}