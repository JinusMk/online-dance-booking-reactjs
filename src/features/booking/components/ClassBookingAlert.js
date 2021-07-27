import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookTrial } from '../../../shared_elements'

export default function ClassBookingAlert(props){
    const { subscription } = props
    // let location = useLocation()
    const [openTrialForm, setOpenTrialForm] = useState(false)
    return(
        <>
        {/* <div className="class-booking-alert">
            <div className="class-booking-alert-btn">
                <h3 className="heading3">{`Want to try one ${subscription.name} class before you subscribe?`} </h3>
                <p className="paragraph">Book the next slot available</p>
                <Link className="secondaryBtn" to={{pathname: `/dance/${subscription?.category?.slug}/${subscription?.category?._id}`, state: { prevPath: location.pathname }}}>{`BOOK ${subscription.name?.toUpperCase()} CLASS`}</Link>
            </div>
        </div> */}
        <div className="class-booking-alert" id="book-trial">
            <div className="class-booking-alert-btn">
                <h3 className="heading3">{`Want to try one ${subscription.name} class for free before you subscribe?`} </h3>
                <p className="paragraph">Book the next slot available</p>
                <Link className="secondaryBtn" onClick={() => setOpenTrialForm(true)}>{`BOOK TRIAL`}</Link>
            </div>
        </div>
        <BookTrial 
            open={openTrialForm}
            handleClose={() => setOpenTrialForm(false)}
            subscriptionCategory={subscription?.category?._id}
        />
        </>
    )
}