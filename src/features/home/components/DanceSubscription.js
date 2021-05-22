import React, { useEffect, useState } from 'react'
import { responsiveCarousel, imageBasePath, subscriptionBenefits } from '../../../constants'
import Carousel from "react-multi-carousel";
import { globalGetService } from '../../../utils/globalApiServices';
import { Link, useLocation, useParams } from 'react-router-dom'
import "react-multi-carousel/lib/styles.css";

export default function DanceSubscription(props){
    let location = useLocation()
    const [loader, setLoader] = useState(true)
    const [subscription, setSubscription] = useState('')
    const [active, setActive] = useState(false)

    useEffect(() => {
        globalGetService(`subscriptions/category/${sessionStorage.getItem('subscriptionId')}`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                if(response.data && response.data.length){
                    const active = response.data.find(sub => sub.status == "active")
                    if(active){
                        setActive(true)
                        setSubscription(active)
                    }else{
                        setActive(false)
                        setSubscription(response.data[0])
                    }
                }else{
                    setSubscription({})
                }
            }else{
                setSubscription('')
            }
        })
    }, [])
    return(
        <>
        {loader ? 'Loading...' : subscription ? <div className={`dance-subscription-blk ${active ? `active` : ''}`}>
            <div className="title">
                <h3 className="heading2">{`${subscription.name} subscription`} {active ? <span className="activeStatus secondaryText">ACTIVE</span> : null}</h3>
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
                        subscriptionBenefits[props.category]?.map((item, index) => <div key={index} className="subscription-info-card">
                            <img className="" src={`${imageBasePath}fun_icon.svg`} />
                            <p className="heading3">{item}</p>
                        </div>)
                    }

                </Carousel>
            </div>
            <p>
                {active ? <Link to={{pathname: `/user-subscriptions/${subscription.userSubscription?._id}/progress`, state: { prevPath:  `${location.pathname}` }}} className="secondaryBtn">SEE MY PROGRESS</Link> : <Link to={{pathname: `/subscription/${subscription.slug}`, state: { prevPath: `${location.pathname}`}}} onClick={() => sessionStorage.setItem('subscriptionId', subscription.category?._id)} className="secondaryBtn">{`GET ${subscription.name?.toUpperCase()} SCBSCRIPTION`}</Link>}
            </p>
        </div> : ''}
        </>
    )
}