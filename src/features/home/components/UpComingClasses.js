import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, imageBasePath } from '../../../constants'
import { DanceFormCard } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";

export default function UpComingClasses(props){
    const [classes, setClasses] = useState([
        {id: 1, img: require('../../../assets/images/zumba_logo.svg'), title: 'Zumba', rating: 4.5, ratingCount: 89, cost: '₹199', costOld: '₹99', instructor: 'Angel Bensy', duration: '1 hour', slots:[{time: '10:00 AM', status: 'ALMOST FULL'}, {time: '6:00 PM', status: 'FAST FILLING'}]},
        {id: 2, img: require('../../../assets/images/bollywood_logo.svg'), title: 'Bollywood', rating: 4.5, ratingCount: 89, cost: '₹149', costOld: '₹249', instructor: 'Manas', duration: '1 hour', slots:[{time: '10:00 AM', status: 'ALMOST FULL'}, {time: '3:00 PM', status: 'FAST FILLING'}, {time: '6:00 PM', status: 'FAST FILLING'}, {time: '9:00 PM', status: ''}]},
        {id: 3, img: require('../../../assets/images/zumba_logo.svg'), title: 'Zumba', rating: 4.5, ratingCount: 89, cost: '₹199', costOld: '₹99', instructor: 'Angel Bensy', duration: '1 hour', slots:[{time: '10:00 AM', status: 'ALMOST FULL'}, {time: '6:00 PM', status: 'FAST FILLING'}, {time: '9:00 PM', status: ''}]}
    ])
    return(
        <div className="upcoming-classes block">
            <h3 className="heading2 title">Upcoming dances <Link to="/schedule" className="see-all paragraph"><span>See all </span><img src={`${imageBasePath}right_arrow_icon.svg`} /></Link></h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={isMobile ? true : false}
                infinite={false}
                partialVisible={isMobile ? true : false}
                arrows={isMobile ? false: true }
                containerClass="partially-visible-carousel-container upcoming-classes"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {classes.map((item, index) => <DanceFormCard key={index} dance={item}/>)}
            </Carousel>
        </div>
    )
}