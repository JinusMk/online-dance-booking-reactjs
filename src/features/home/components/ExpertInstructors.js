import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel } from '../../../constants'
import { InstructorCard, InstructorVideo } from './index'
import { isMobile } from 'react-device-detect'
import { globalGetService } from '../../../utils/globalApiServices';
import "react-multi-carousel/lib/styles.css";

export default function ExpertInstructors(props){
    const [instructors, setInstructors] = useState([])
    const [openVideo, setOpenVideo] = useState(false)
    const [activeInstructor, setActiveInstructor] = useState({})
    const [publicLink, setPublicLink] = useState('')

    useEffect(() => {
        globalGetService(`instructorVideos`)
        .then(response => {
            if(response.success === true){
                setInstructors(response.data)
                setPublicLink(response?.publicLink)
            }
        })
    }, [])
    const handleInstructorClick = (instructor) => {
        if(instructor?.video){
            setOpenVideo(true)
            setActiveInstructor(instructor)
        }
    }
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
                    instructors.map((item, index) =>  <InstructorCard key={index} instructor={item} handleInstructorClick={handleInstructorClick}/>)
                }
            </Carousel>
            <InstructorVideo 
                open={openVideo}
                handleClose={() => setOpenVideo(false)}
                instructor={activeInstructor}
                publicLink={publicLink}
            />
        </div>
    )
}