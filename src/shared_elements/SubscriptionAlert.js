import React, { useEffect, useState } from 'react'
import { checkIsFinished, checkNumberOfDaysLeft } from '../utils';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'

export default function SubscriptionAlert(props){
    const { userSubscription } = props
    const [subscriptionStatus, setSubscriptionStatus] = useState('')
    const [activeSubscriptions, setActiveSubscriptions] = useState([])
    
    useEffect(() => {
        if(userSubscription && userSubscription.length){
            const activeSubscriptions = userSubscription.filter(sub => checkIsFinished(sub.endDate) == false)
            setActiveSubscriptions(activeSubscriptions)

            if(activeSubscriptions.length >= 1){ //atleast one active subscription
                if(activeSubscriptions.length >= 2){ // more than one active subscriptions
                    setSubscriptionStatus(1)
                }else if(activeSubscriptions.some(sub => checkNumberOfDaysLeft(sub.endDate) <= 7)){ //one active subcription which expires in 7 days 
                    setSubscriptionStatus(2)
                }else{ //one active subscription
                    setSubscriptionStatus(3)
                }
            }else{//no active subscription
                if(userSubscription.length > 1){ // more than one expired subscription
                    setSubscriptionStatus(4)
                }else{ // one expired subscription
                    setSubscriptionStatus(5)
                }
            }
        }
    }, [userSubscription])
    
    const renderSubscriptionAlert = (status) => {
        switch(status){
            case 1 : 
                return <ActiveSubscriptions subscriptions={activeSubscriptions}/>
            case 2 : 
                return <ExpireSoonSubscription expired={false} subscription={activeSubscriptions[0]} />
            case 3 : 
                return <ActiveSubscriptions subscriptions={activeSubscriptions}/>
            case 4 :
                return <ExpireSoonSubscription expired={true} subscription={userSubscription[0]} />
            case 5 :
                    return <ExpireSoonSubscription expired={true} subscription={userSubscription[0]} />
        }
    }

    return(
        <>
            {
                subscriptionStatus ? renderSubscriptionAlert(subscriptionStatus) : null
            }
        </>
    )
}

function ActiveSubscriptions(props){
    const { subscriptions } = props
    return(
        <div className="subscription-alert-wrapper active">
            <h3 className="heading3">{`You have ${subscriptions.length} active ${subscriptions.length > 1 ? `subscriptions` : `subscription`}`}</h3>
            <p className="paragraph">See your class calendar, calories, weight and more</p>
            <p><Link className="primaryBtn" to="/user-subscriptions/progress">SEE MY PROGRESS</Link></p>
        </div>
    )
}

function ExpireSoonSubscription(props){
    const { subscription, expired } = props
    return(
        <div className="subscription-alert-wrapper expire-soon">
            {
                expired ? <>
                    <h3 className="heading3">{`You’ve used up your ${subscription.subscription?.name} subscription`}</h3>
                    <p className="paragraph">{`${subscription.danceClassesAttended} out of ${subscription.subscription?.danceClasses} classes completed`}</p>
                    <p><Link to={`/subscription/${subscription.subscription.slug}`} className="primaryBtn">RENEW</Link></p>
                </> : <><h3 className="heading3">{`Your ${subscription.subscription?.name} subscription is about to expire`}</h3>
                <p className="paragraph">{`${subscription.danceClassesAttended} out of ${subscription.subscription?.danceClasses} classes completed`}</p>
                <Grid container justify="" alignItems="center" className="alert-info">
                    <Grid item xs={6}>
                        <p className="secondaryText">{`Expires in ${checkNumberOfDaysLeft(subscription.endDate)} Days`}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p><Link to={`/subscription/${subscription.subscription.slug}`} className="primaryBtn">RENEW</Link></p>
                    </Grid>
                </Grid>
                </>
            }
        </div>
    )
}