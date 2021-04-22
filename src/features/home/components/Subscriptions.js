import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel } from '../../../constants'
import { globalGetService } from '../../../utils/globalApiServices';
import { isMobile } from 'react-device-detect'
import { SubscriptionCard } from '../../../shared_elements'
import "react-multi-carousel/lib/styles.css";

export default function Subscriptions(props){
    const [subscriptions, setSubscriptions] = useState({})
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        globalGetService(`subscriptions`)
        .then(response => {
            if(response.success == true){
                setLoader(false)
                setSubscriptions(response.data)
            }
        })
    }, [])
    return(
        <div className="subscriptions-blk">
            <div className="title">
                <h3 className="heading2">Letzdance subscriptions</h3>
                <p className="paragraph">Stay fit long term, buy a subscription.</p>
            </div>
            {loader ? 'Loading...' : <>{
            subscriptions && Object.keys(subscriptions).length ?
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
                    Object.keys(subscriptions).map((key, index) => {
                        if(subscriptions[key][0]){
                            return <SubscriptionCard subscriptionItem={subscriptions[key][0]} active={subscriptions[key].some(sub => sub.status == "active")}/>
                        }
                    })
                }
            </Carousel> : null}</>
            }
        </div>
    )
}