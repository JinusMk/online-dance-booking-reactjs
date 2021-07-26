import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { imageBasePath, currencySymbol, subscriptionBenefits } from '../constants'
import { BookTrial } from '.'

export default function SubscriptionCard(props){
    let location = useLocation()
    const { subscriptionItem, active } = props
    const [openTrialForm, setOpenTrialForm] = useState(false)
    return(
        <>
        <div className="subcription-card-wrapper" style={{backgroundImage: `url(${subscriptionItem.image})`}}>
            {/* <img src={subscriptionItem.image}/> */}
            {active ? <span className="activeLabel secondaryText">ACTIVE</span> : null}
            <div className="info-wrapper">
                <h3 className="heading3">{subscriptionItem.name + ' Subscription'}</h3>
                <p className="paragraph">{`Starting from ${currencySymbol[subscriptionItem.currencyType]}${subscriptionItem.discountedCost}`}</p>
                <ul className="listUnstyled benefitsList">
                    {
                        subscriptionBenefits[subscriptionItem.category?._id]?.map((point, index) => index <= 1 && <li className="paragraph" key={index}>
                            <img src={`${imageBasePath}booking_success_tick.svg`} alt=""/>
                            <span>{point}</span>
                        </li>)
                    }
                    {subscriptionBenefits[subscriptionItem.category?._id]?.length > 2 ? <li className="more-point">{`+${subscriptionBenefits[subscriptionItem.category?._id]?.length - 2} more benefits`}</li> : null}
                </ul>
                <p>
                    {active ? <Link className="primaryBtn activeStatus" to={{pathname: `/user-subscriptions/${subscriptionItem.userSubscription[0]?._id}/progress`, state: { prevPath: `${location.pathname}` }}}>SEE MY PROGRESS</Link> : <div className="buttonWrapper flexCentered">
                        <Link className="secondaryBtn" onClick={() => setOpenTrialForm(true)}>BOOK TRIAL</Link>
                        <Link className="primaryBtn" to={{pathname: `/subscription/${subscriptionItem.slug}/${subscriptionItem.category?._id}`, state: { prevPath: `${location.pathname}`}}}>KNOW MORE</Link>
                    </div>}
                </p>    
            </div>
        </div>
        <BookTrial
            open={openTrialForm}
            handleClose={() => setOpenTrialForm(false)}
        />
        </>
    )
}