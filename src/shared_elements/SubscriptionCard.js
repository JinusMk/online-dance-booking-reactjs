import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { imageBasePath, currencySymbol, subscriptionBenefits } from '../constants'

export default function SubscriptionCard(props){
    let location = useLocation()
    const { subscriptionItem, active } = props
    return(
        <div className="subcription-card-wrapper" style={{backgroundImage: `url(${subscriptionItem.image})`}}>
            {/* <img src={subscriptionItem.image}/> */}
            {active ? <span className="activeLabel secondaryText">ACTIVE</span> : null}
            <div className="info-wrapper">
                <h3 className="heading3">{subscriptionItem.name + ' Subscription'}</h3>
                <p className="paragraph">{`Starting from ${currencySymbol[subscriptionItem.currencyType]}${subscriptionItem.actualCost}`}</p>
                <ul className="listUnstyled benefitsList">
                    {
                        subscriptionBenefits[subscriptionItem.slug]?.map((point, index) => index <= 1 && <li className="paragraph" key={index}>
                            <img src={`${imageBasePath}booking_success_tick.svg`}/>
                            <span>{point}</span>
                        </li>)
                    }
                    {subscriptionBenefits[subscriptionItem.slug]?.length > 2 ? <li className="more-point">{`+${subscriptionBenefits[subscriptionItem.slug]?.length - 2} more benefits`}</li> : null}
                </ul>
                <p>
                    {active ? <Link className="primaryBtn activeStatus" to={{pathname: `/user-subscriptions/${subscriptionItem.userSubscription[0]?._id}/progress`, state: { prevPath: `${location.pathname}` }}}>SEE MY PROGRESS</Link> : <Link className="primaryBtn" to={{pathname: `/subscription/${subscriptionItem.slug}`, state: { prevPath: `${location.pathname}`}}}>KNOW MORE</Link>}
                </p>    
            </div>
        </div>
    )
}