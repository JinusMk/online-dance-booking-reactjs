import React from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel } from '../../../constants'
import { DanceFormCard } from './index'
import "react-multi-carousel/lib/styles.css";

export default function UpComingClasses(props){
    return(
        <div className="upcoming-classes-blk">
            <h3 className="heading2 title">Upcoming dances <a className="see-all paragraph"><span>See all </span><img src={require('../../../assets/images/right_arrow_icon.svg')} /></a></h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={true}
                arrows={false}
                containerClass="partially-visible-carousel-container upcoming-classes"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                
                <DanceFormCard />
                <DanceFormCard type="bollywood"/>
                <DanceFormCard />
            </Carousel>
        </div>
    )
}