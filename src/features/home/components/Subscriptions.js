import React from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, imageBasePath } from '../../../constants'
import { isMobile } from 'react-device-detect'
import "react-multi-carousel/lib/styles.css";

const data = [
    {
        category: 'zumba',
        points: ['All dance levels - from beginner to expert', '8 to 12 classes a month','All dance levels - from beginner to expert', '8 to 12 classes a month']
    },
    {
        category: 'bollywood',
        points: ['All dance levels - from beginner to expert', '8 to 12 classes a month','All dance levels - from beginner to expert', '8 to 12 classes a month']
    },
    {
        category: 'hip-hop',
        points: ['All dance levels - from beginner to expert', '8 to 12 classes a month','All dance levels - from beginner to expert', '8 to 12 classes a month']
    }
]

export default function Subscriptions(props){
    return(
        <div className="subscriptions-blk">
            <div className="title">
                <h3 className="heading2">Letzdance subscriptions</h3>
                <p className="paragraph">Stay fit long term, buy a subscription.</p>
            </div>
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
                {
                    data.map((item, index) => <div className="subcription-card-wrapper" key={index} style={{backgroundImage: `url(${imageBasePath}${item.category}_logo_1.svg)`}}>
                        {/* <img src={`${imageBasePath}${item.category}_logo_1.svg`}/> */}
                        <div className="info-wrapper">
                            <h3 className="heading3">{`${item.category} Subscription`}</h3>
                            <p className="paragraph">Starting from ₹1,400 / month</p>
                            <ul className="listUnstyled benefitsList">
                                {
                                    item.points.map((point, index) => index <= 1 && <li className="paragraph">
                                        <img src={`${imageBasePath}booking_success_tick.svg`}/>
                                        <span>{point}</span>
                                    </li>)
                                }
                                {item.points.length > 2 ? <li className="more-point">{`+${item.points.length - 2} more`}</li> : null}
                            </ul>
                            <p>
                                <Link className="primaryBtn" to={`/subscription/${item.category}`}>KNOW MORE</Link>
                            </p>
                        </div>
                    </div>)
                }
            </Carousel>
        </div>
    )
}