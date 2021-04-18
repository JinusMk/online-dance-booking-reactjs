import React, { useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect'
import { imageBasePath } from '../../../constants';
import { Link } from 'react-router-dom'

export default function SubscriptionInfo(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { subscription } = props
    const goToBuySubscription = () => {
        document.getElementById('subscription-plans').scrollIntoView({
            behavior: 'smooth'
        })
    }
    return(
        <div className="subscription-detail-header">
            {imgLoader ? <Skeleton variant="rect" height={isMobile ? 182 : 144} className="img-loader"/> : null}
            <img src={subscription.image} className="logo" alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
            <div className="info-wrapper">
                <h3 className="heading2">{subscription.title}</h3>
                <p className="paragraph">{subscription.description}</p>
                <p className="link">
                    <Link onClick={goToBuySubscription} className="primaryBtn">BUY SUBSCRIPTION</Link>
                </p>
            </div>
        </div>
    )
}