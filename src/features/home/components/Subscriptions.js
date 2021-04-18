import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, imageBasePath, currencySymbol, subscriptionBenefits } from '../../../constants'
import { globalGetService } from '../../../utils/globalApiServices';
import { isMobile } from 'react-device-detect'
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
            {loader ? 'Loading...' : <Carousel 
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
                    subscriptions && Object.keys(subscriptions).length && Object.keys(subscriptions).map((key, index) => {
                        if(subscriptions[key][0]){
                            return <SubscriptionCard subscriptionItem={subscriptions[key][0]} />
                        }
                    })
                }
            </Carousel>}
        </div>
    )
}

function SubscriptionCard(props){
    const { subscriptionItem } = props
    return(
        <div className="subcription-card-wrapper" style={{backgroundImage: `url(${subscriptionItem.image})`}}>
            {/* <img src={subscriptionItem.image}/> */}
            <div className="info-wrapper">
                <h3 className="heading3">{subscriptionItem.name}</h3>
                <p className="paragraph">{`Starting from ${currencySymbol[subscriptionItem.currencyType]}${subscriptionItem.actualCost}`}</p>
                <ul className="listUnstyled benefitsList">
                    {
                        subscriptionBenefits.map((point, index) => index <= 1 && <li className="paragraph" key={index}>
                            <img src={`${imageBasePath}booking_success_tick.svg`}/>
                            <span>{point}</span>
                        </li>)
                    }
                    {subscriptionBenefits.length > 2 ? <li className="more-point">{`+${subscriptionBenefits.length - 2} more benefits`}</li> : null}
                </ul>
                <p>
                    <Link className="primaryBtn" to={`/subscription/${subscriptionItem.category?.categorySlug}`}>KNOW MORE</Link>
                </p>
            </div>
        </div>
    )
}