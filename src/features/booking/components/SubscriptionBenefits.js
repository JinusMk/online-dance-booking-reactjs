import React, { useState } from 'react'
import { imageBasePath } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect'

const benefitsData = [
    {
        img: '',
        text: `All dance levels From beginner to expert`
    },
    {
        img: '',
        text: `8 to 12 classes a month`
    },
    {
        img: '',
        text: `Flexible timing on weekdays and weekends`
    },
    {
        img: '',
        text: `Personalized attention and instructor feedback`
    },
    {
        img: '',
        text: `Your recorded dance sessions for you to get better`
    },
    {
        img: '',
        text: `Learn two complete song choreography`
    },
    {
        img: '',
        text: `Calorie count, progress tracker, and detailed statistics`
    },
    {
        img: '',
        text: `Certification after every successful milestone`
    },
]
export default function SubscriptionBenefits(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { category } = props

    return(
        <div className="subscription-benefits">
            <h3 className="title heading2">Subscription benefits</h3>
            <ul className="listUnstyled benefits-list">
                {
                    benefitsData.map((item, index) => <li key={index} className="benefit-item-wrapper">
                        {imgLoader ? <Skeleton variant="rect" width={isMobile ? 60 : 60} className="img-loader"/> : null}
                        {/* <img src={`${imageBasePath}${category}_logo_1.svg`} className="logo" alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/> */}
                        <h3 className="heading3">{item.text}</h3>
                    </li>)
                }
            </ul>
        </div>
    )
}