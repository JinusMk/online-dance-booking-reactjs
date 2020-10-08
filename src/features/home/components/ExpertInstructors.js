import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel } from '../../../constants'
import { InstructorCard } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";

export default function ExpertInstructors(props){
    const [instructors, setInstructors] = useState([
        {id: 1, img: require('../../../assets/images/instructor_1.svg'), name: 'Angel Bensy', rating: 4.5, ratingCount: 89, expert: 'Zumba expert', experience: '5 years', classes: 51 },
        {id: 2, img: require('../../../assets/images/instructor_1.svg'), name: 'Angel Bensy', rating: 4.5, ratingCount: 89, expert: 'Zumba expert', experience: '5 years', classes: 51 },
        {id: 3, img: require('../../../assets/images/instructor_1.svg'), name: 'Angel Bensy', rating: 4.5, ratingCount: 89, expert: 'Zumba expert', experience: '5 years', classes: 51 }
    ])
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
                arrows={false}
                containerClass="partially-visible-carousel-container last-week-recap"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {
                    instructors.map((item, index) => <InstructorCard key={item.id} instructor={item}/>)
                }
            </Carousel>
        </div>
    )
}