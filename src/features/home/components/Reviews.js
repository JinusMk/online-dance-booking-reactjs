import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, reviewsData } from '../../../constants'
import { ReviewCard } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";
import { globalGetService } from '../../../utils/globalApiServices';

export default function Reviews(props){
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        globalGetService(`review-list`)
        .then(response => {
            if(response.success === true){
                setReviews(response.data)
            }
        })
    }, [])
    return(
        <div className="reviews block">
            <h3 className="heading2 title">{props.category ? <><span style={{textTransform: 'capitalize'}}>{props.category}</span> dancers speak</>: 'Letzdancers speak'}</h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={isMobile ? true: false}
                arrows={isMobile ? true : true}
                containerClass="partially-visible-carousel-container reviews"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {
                    props.category ? reviewsData.filter(review => review.category == props.category).map((item, index) => <ReviewCard key={index} review={item} page="detail"/>) :reviewsData.map((item, index) => <ReviewCard key={index} review={item}/>)
                }
            </Carousel>
        </div>
    )
}