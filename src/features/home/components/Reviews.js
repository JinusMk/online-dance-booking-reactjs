import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, reviewsData, imageBasePath } from '../../../constants'
import { ReviewCard } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";
import { globalGetService } from '../../../utils/globalApiServices';


export default function Reviews(props){
    const [reviews, setReviews] = useState(reviewsData)

    useEffect(() => {
        globalGetService(`review-list`)
        .then(response => {
            if(response.success === true){
                setReviews([...reviewsData, ...response.data.filter(item => item.description )])
            }
        })
    }, [])
    return(
        <div className="reviews block">
            <h3 className="heading2 title">{props.category ? <><span style={{textTransform: 'capitalize'}}>{props.category}</span> dancers speak</>: 'Letzdancers speak'} {props.category ? null : <Link to="/reviews" className="see-all paragraph"><span>See all </span><img src={`${imageBasePath}right_arrow_icon.svg`} /></Link>}</h3>
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
                    props.category ? reviews.filter(review => review.category == props.category).map((item, index) => <ReviewCard key={index} review={item} page="detail"/>) :reviews.map((item, index) => <ReviewCard key={index} review={item}/>)
                }
            </Carousel>
        </div>
    )
}