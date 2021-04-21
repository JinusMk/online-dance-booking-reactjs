import React, { useEffect, useState } from 'react'
import { responsiveCarousel, imageBasePath, subscriptionBenefits } from '../../../constants'
import Carousel from "react-multi-carousel";
import { globalGetService } from '../../../utils/globalApiServices';
import { Link } from 'react-router-dom'
import "react-multi-carousel/lib/styles.css";

export default function DanceSubscription(props){
    const [loader, setLoader] = useState(true)
    const [subscription, setSubscription] = useState('')

    useEffect(() => {
        globalGetService(`subscriptionsBySlug/${props.category}`)
        .then(response => {
            if(response.success == true){
                setLoader(false)
                if(response.data && response.data.length){
                    setSubscription(response.data[0])
                }else{
                    setSubscription({})
                }
            }
        })
    }, [])
    return(
        <>
        {loader ? 'Loading...' : <div className={`dance-subscription-blk ${subscription.active ? `active` : ''}`}>
            <div className="title">
                <h3 className="heading2">{`${subscription.name} subscription`} {subscription.active ? <span className="activeStatus secondaryText">ACTIVE</span> : null}</h3>
                <p className="paragraph">Stay fit long term, buy a subscription.</p>
            </div>
            <div className="">
                <Carousel 
                    responsive={responsiveCarousel}
                    swipeable={true}
                    showDots={false}
                    infinite={true}
                    containerClass="carousel-container dance-subscription"
                >
                    {
                        subscriptionBenefits.map((item, index) => <div key={index} className="subscription-info-card">
                            <img className="" src={`${imageBasePath}fun_icon.svg`} />
                            <p className="heading3">{item}</p>
                        </div>)
                    }

                </Carousel>
            </div>
            <p>
                {subscription.active ? <Link to={`/user-subscriptions/progress`} className="secondaryBtn">SEE MY PROGRESS</Link> : <Link to={`/subscription/zumba`} className="secondaryBtn">{`GET ${subscription.name?.toUpperCase()} SCBSCRIPTION`}</Link>}
            </p>
        </div>}
        </>
    )
}