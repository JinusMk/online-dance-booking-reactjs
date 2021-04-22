import React, { useState } from 'react'
import { imageBasePath, subscriptionBenefits } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SubscriptionInformation(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { subscription } = props
    return(
        <div className="subscription-information-card">
            <div className="top-blk flexCentered">
                {imgLoader ? <div><Skeleton variant="rect" height={72} width={72} style={{borderRadius: 8}}/></div> : null}
                <img src={subscription.image} className="logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                <div className="content">
                    <h3 className="heading2">{subscription.name}</h3>
                    <h3 className="heading3">
                        <img src={`${imageBasePath}star_icon.svg`} />
                        <span>{subscription.averageRating}</span>
                        <span className="rating">({subscription.totalRating} RATINGS)</span>
                    </h3>
                </div>
            </div>
            <div className="bottom-blk">
                <ul className="listUnstyled">
                    {
                        subscriptionBenefits.map((point, index) => index <= 1 && <li className="paragraph" key={index}>
                            <img src={`${imageBasePath}booking_success_tick.svg`}/>
                            <span>{point}</span>
                        </li>)
                    }
                    {subscriptionBenefits.length > 2 ? <li className="more-point">{`+${subscriptionBenefits.length - 2} more benefits`}</li> : null}
                </ul>
            </div>
        </div>
    )
}