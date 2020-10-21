import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, instructorsData } from '../../../constants'
import { InstructorCard } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";

export default function ExpertInstructors(props){
    return(
        <div className="expert-instructors block">
            <h3 className="heading2 title">Expert instructors</h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={isMobile ? true: false}
                arrows={isMobile ? true: true }
                containerClass="partially-visible-carousel-container"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {
                    instructorsData.map((item, index) => index == 4 ? null : <InstructorCard key={index} instructor={item}/>)
                }
            </Carousel>
        </div>
    )
}