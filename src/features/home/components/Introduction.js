import React from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel } from '../../../constants'
import "react-multi-carousel/lib/styles.css";

export default function Introduction(props){
    return(
        <div className="introduction-blk">
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                containerClass="carousel-container home"
            >
                <div className="carousel-item">
                    <img src={require('../../../assets/images/intro_picture1.svg')}/>
                    <p className="heading1">Dance online, 1000 happy feet <br/> and counting.</p>
                </div>
                <div className="carousel-item">
                    <img src={require('../../../assets/images/intro_picture2.svg')}/>
                    <p className="heading1">Groove to the beats right in your <br/>living room.</p>
                </div>
            </Carousel>
        </div>
    )
}