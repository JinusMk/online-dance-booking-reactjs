import React, { useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect'
import { imageBasePath } from '../../../constants';
import { Link } from 'react-router-dom'

export default function SubscriptionInfo(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { category } = props
    return(
        <div className="subscription-detail-header">
            {imgLoader ? <Skeleton variant="rect" height={isMobile ? 182 : 144} className="img-loader"/> : null}
            <img src={`${imageBasePath}${category}_logo_1.svg`} className="logo" alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
            <div className="info-wrapper">
                <h3 className="heading2">Zumba dance for the price of a full course meal!</h3>
                <p className="paragraph">Join now & get started towards fitness!</p>
                <p className="link">
                    <Link to="" className="primaryBtn">BUY SUBSCRIPTION</Link>
                </p>
            </div>
        </div>
    )
}