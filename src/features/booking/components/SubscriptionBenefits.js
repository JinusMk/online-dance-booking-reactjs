import React, { useState } from 'react'
import { imageBasePath } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect'

const benefitsData = [
    {
        img: 'beginner_to_expert_icon.svg',
        text: `All dance levels From beginner to expert`
    },
    {
        img: 'classes_count_icon.svg',
        text: `8 to 12 classes a month`
    },
    {
        img: 'flexible_timing_icon.svg',
        text: `Flexible timing on weekdays and weekends`
    },
    {
        img: 'personalised_attention_icon.svg',
        text: `Personalized attention and instructor feedback`
    },
    {
        img: 'record_icon.svg',
        text: `Your recorded dance sessions for you to get better`
    },
    {
        img: 'choreography_icon.svg.svg',
        text: `Learn two complete song choreography`
    },
    {
        img: 'calorie_icon.svg',
        text: `Calorie count, progress tracker, and detailed statistics`
    },
    {
        img: 'certificate_icon.svg',
        text: `Certification after every successful milestone`
    },
]
export default function SubscriptionBenefits(props){
    const { category } = props
    const [imgLoader, setImgLoader] = useState(true)

    return(
        <div className="subscription-benefits">
            <h3 className="title heading2">Subscription benefits</h3>
            <ul className="listUnstyled benefits-list">
                {
                    benefitsData.map((item, index) => category == "zumba" && item.img == "record_icon.svg" ? null : <li key={index} className="benefit-item-wrapper">
                        {imgLoader ? <Skeleton variant="rect" width={isMobile ? 60 : 60} className="img-loader"/> : null}
                        <img src={`${imageBasePath}${item.img}`} className="logo" alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                        <h3 className="heading3">{([`hip-hop`, `bollywoord`, 'hiphop-kids'].includes(category) && item.img == "classes_count_icon.svg")  ? `8 classes a month` : item.text}</h3>
                    </li>)
                }
            </ul>
        </div>
    )
}