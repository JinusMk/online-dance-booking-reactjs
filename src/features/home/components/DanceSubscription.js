import React from 'react'
import { responsiveCarousel, imageBasePath } from '../../../constants'
import Carousel from "react-multi-carousel";
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import "react-multi-carousel/lib/styles.css";

export default function DanceSubscription(props){
    return(
        <div className={`dance-subscription-blk ${`active`}`}>
            <div className="title">
                <h3 className="heading2">Zumba subscription <span className="activeStatus secondaryText">ACTIVE</span></h3>
                <p className="paragraph">Stay fit long term, buy a subscription.</p>
            </div>
            <div className="">
                <Carousel 
                    responsive={responsiveCarousel}
                    swipeable={true}
                    showDots={true}
                    infinite={false}
                    autoPlaySpeed={5000}
                    partialVisible={isMobile ? true: false}
                    arrows={isMobile ? true: true }
                    containerClass="carousel-container dance-subscription"
                    dotListClass="custom-dot-list"
                    itemClass="carousel-item"
                    renderDotsOutside={true}
                >
                    {
                        [0,1,2].map((item, index) => <div className="subscription-info-card">
                            {/* <img className="" src={`${imageBasePath}`} /> */}
                            <p className="heading3">All dance levels - from beginner to expert</p>
                        </div>)
                    }

                </Carousel>
            </div>
            <p>
                <Link to={`/subscription/zumba`} className="secondaryBtn">GET ZUMBA SCBSCRIPTION</Link>
            </p>
        </div>
    )
}