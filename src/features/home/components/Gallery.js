import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel } from '../../../constants'
import "react-multi-carousel/lib/styles.css";

export default function Gallery(props){
    const [ gallery, setGallery ] = useState([
        {id: 1, img: require('../../../assets/images/zumba_logo.svg'), desc: 'Zumba dance for all levels', dancers: '55'},
        {id: 2, img: require('../../../assets/images/zumba_logo.svg'), desc: 'Zumba dance for all levels', dancers: '55'}
    ])
    return(
        <div className="gallery block">
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={false}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={true}
                arrows={false}
                containerClass="partially-visible-carousel-container gallery-carousel"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {gallery.map((item, index) => <GalleryItem key={index} dance={item}/>)}
            </Carousel>
        </div>
    )
}

function GalleryItem(props){
    const { dance } = props
    return(
        <div className="gallery-item">
            <img src={dance.img}/>
            <h3 className="heading3">{dance.desc}</h3>
            <p className="paragraph">{dance.dancers} dancers</p>
        </div>
    )
}