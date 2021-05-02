import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, lastWeekRecapVideos } from '../../../constants'
import { RecapItem } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";
import { globalGetService } from '../../../utils/globalApiServices';

export default function LastWeekRecap(props){
    const [recapVideos, setRecapVideos] = useState([])
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        globalGetService(`danceClassRecap`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                setRecapVideos(response.data)
            }
        })
    }, [])
    return(
         <div className="last-week-recap block">
            <h3 className="heading2 title">Last month recap</h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={isMobile ? true : false}
                arrows={isMobile ? true : true }
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