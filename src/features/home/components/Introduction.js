import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, imageBasePath } from '../../../constants'
import "react-multi-carousel/lib/styles.css";

export default function Introduction(props){
    const [introductionData] = useState([
        {id: '', img: `${imageBasePath}intro_img_1.svg`, value: 'Stay home, Get fit'},
        {id: '', img: `${imageBasePath}intro_img_3.svg`, value: 'Dance online, Have fun'},
        {id: '', img: `${imageBasePath}intro_img_2.svg`, value: 'Launching Kids Online Dancing Batch'},
    ])
    return(
        <div className="introduction-blk">
            <Carousel 
                responsive={{...responsiveCarousel, superLargeDesktop: {...responsiveCarousel.superLargeDesktop, items: 2}}}
                swipeable={true}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                containerClass="carousel-container home"
            >
                {
                    introductionData.map((item, index) => <div className="carousel-item" key={index}>
                        <img src={item.img}/>
                        <p className="heading1">{item.value}</p>
                    </div>)
                }
            </Carousel>
        </div>
    )
}