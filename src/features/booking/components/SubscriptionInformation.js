import React, { useState } from 'react'
import { imageBasePath } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SubscriptionInformation(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { category, subscription } = props
    return(
        <div className="subscription-information-card">
            <div className="top-blk flexCentered">
                {imgLoader ? <div><Skeleton variant="rect" height={72} width={72} style={{borderRadius: 8}}/></div> : null}
                <img src={`${imageBasePath}${category}_card_logo.svg`} className="logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                <div className="content">
                    <h3 className="heading2">{`${category} Subscription`}</h3>
                    <h3 className="heading3">
                        <img src={`${imageBasePath}star_icon.svg`} />
                        <span>{subscription.rating}</span>
                        <span className="rating">({subscription.rating_count} RATINGS)</span>
                    </h3>
                </div>
            </div>
            <div className="bottom-blk">
                <ul className="listUnstyled">
                    {
                        subscription.points.map((point, index) => index <= 1 && <li className="paragraph">
                            <img src={`${imageBasePath}booking_success_tick.svg`}/>
                            <span>{point}</span>
                        </li>)
                    }
                    {subscription.points.length > 2 ? <li className="more-point">{`+${subscription.points.length - 2} more benefits`}</li> : null}
                </ul>
            </div>
        </div>
    )
}