import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, newReviewsData, imageBasePath } from '../../../constants'
import { ReviewCard } from './index'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";
import { globalGetService } from '../../../utils/globalApiServices';


export default function Reviews(props){
    const [reviews, setReviews] = useState(newReviewsData)

    useEffect(() => {
        if(props.categoryId){
            globalGetService(`review-list/${sessionStorage.getItem('categoryId')}`)
            .then(response => {
                if(response.success === true){
                    setReviews([...response.data.filter(item => item.description ), ...newReviewsData])
                }
            })
        }else{
            globalGetService(`review-list`)
            .then(response => {
                if(response.success === true){
                    setReviews([...response.data.filter(item => item.description ), ...newReviewsData])
                }
            })
        }
    }, [])

    return(
        <div className="reviews block">
            <h3 className="heading2 title">{props.title ? <><span style={{textTransform: 'capitalize'}}>{props.title}</span> dancers speak</>: 'Letzdancers speak'} {props.category ? null : <Link to="/reviews" className="see-all paragraph"><span>See all </span><img src={`${imageBasePath}right_arrow_icon.svg`} /></Link>}</h3>
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
                    props.categoryId ? reviews.filter(review => (review.categoryId == props.categoryId || review.status == "Approved")).map((item, index) => index < 20 && <ReviewCard key={index} review={item} page="detail"/>) : reviews.map((item, index) => index < 20 && <ReviewCard key={index} review={item}/>)
                }
            </Carousel>
        </div>
    )
}