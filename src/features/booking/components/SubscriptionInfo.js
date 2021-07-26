import React, { useState, useEffect } from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect'
import { Link, useLocation } from 'react-router-dom'
import { checkNumberOfDaysLeft } from '../../../utils';
import { LinearProgressBar } from '../../../shared_elements';
// import { globalGetService } from '../../../utils/globalApiServices';
import moment from 'moment'

export default function SubscriptionInfo(props){
    let location = useLocation()
    const { subscription, active } = props

    // const [loader, setLoader] = useState(true)
    // const [userSubscription, setUserSubscription] = useState('')
    const [imgLoader, setImgLoader] = useState(true)

    const goToBuySubscription = () => {
        document.getElementById('subscription-plans').scrollIntoView({
            behavior: 'smooth'
        })
    }

    // useEffect(() => {
    //     if(active && subscription){
    //         setLoader(true)
    //         globalGetService(`userSubscriptions`)
    //         .then(response => {
    //             if(response.success == true){
    //                 setLoader(false)
    //                 let categoryUserSubscriptions =  response.data?.filter(sub => sub.subscription?.slug == subscription.slug)
    //                 let activeCategoryUserSubscription = categoryUserSubscriptions.find(sub => checkNumberOfDaysLeft(sub.endDate) >= 0)
    //                 if(activeCategoryUserSubscription){
    //                     setUserSubscription(activeCategoryUserSubscription)
    //                 }else{
    //                     setUserSubscription('')
    //                 }
    //             }
    //         })
    //     }else{
    //         setLoader(false)
    //     }
    // }, [active])
    return(
        <div className="subscription-detail-header">
            {
                active ? <div className="user-subscription-info">
                    <h3 className="heading2">{subscription.name}</h3>
                    <p className="heading3 classInfo">{`${subscription?.months} ${subscription?.months > 1 ? 'months' : 'month'} - ${subscription?.danceClasses} classes`}<span className={`activeLabel ${checkNumberOfDaysLeft(subscription.endDate) <= 7 ? 'danger' : ''}`}>{checkNumberOfDaysLeft(subscription.endDate) < 0 ? 'Expired' : checkNumberOfDaysLeft(subscription.endDate) <= 7 ? `EXPIRING SOON` : `ACTIVE`}</span></p>
                    <LinearProgressBar className={`progress-bar ${checkNumberOfDaysLeft(subscription.endDate) <= 7 ? 'danger' : ''}`} variant="determinate" value={(subscription.danceClassNumber / subscription?.danceClasses) * 100} />
                    <p className="secondaryText date">{moment(subscription.startDate).format(`DD MMM YYYY`)}<span>{moment(subscription.endDate).format(`DD MMM YYYY`)}</span></p>
                    <p className="link textCenter">
                        <Link to={{ pathname: `/user-subscriptions/${subscription._id}/progress`, state: { prevPath: `${location.pathname}` }}} className="primaryBtn">SEE MY PROGRESS</Link>
                    </p>
                </div>
                : <>
                    {imgLoader ? <Skeleton variant="rect" height={isMobile ? 182 : 144} className="img-loader"/> : null}
                    <img src={subscription.image} className="logo" alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                    <div className="info-wrapper">
                        <h3 className="heading2">{subscription.title}</h3>
                        <p className="paragraph">{subscription.description}</p>
                        <p className="link">
                            <a onClick={goToBuySubscription} className="primaryBtn">BUY SUBSCRIPTION</a>
                        </p>
                    </div>
                </>
            }
        </div>
    )
}