import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, instructorsData } from '../../../constants'
import { InstructorCard } from './index'
import { isMobile } from 'react-device-detect'
import { globalGetService } from '../../../utils/globalApiServices';
import "react-multi-carousel/lib/styles.css";

export default function ExpertInstructors(props){
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        globalGetService(`instructorVideos`)
        .then(response => {
            if(response.success === true){
                setInstructors(response.data)
            }
        })
    }, [])
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
                {/* {
                    instructorsData.filter(item => item.category != 'hiphop-kids').map((item, index) =>  <InstructorCard key={index} instructor={item}/>)
                } */}
                {
                    instructors.map((item, index) =>  <InstructorCard key={index} instructor={item}/>)
                }
            </Carousel>
        </div>
    )
}