import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function ClassBookingAlert(props){
    const { subscription } = props
    let location = useLocation()
    return(
        <div className="class-booking-alert">
            <div className="class-booking-alert-btn">
                <h3 className="heading3">{`Want to try one ${subscription.name} class before you subscribe?`} </h3>
                <p className="paragraph">Book the next slot available</p>
                <Link className="secondaryBtn" to={{pathname: `/dance/${subscription?.category?.slug}/${subscription?.category?._id}`, state: { prevPath: location.pathname }}}>{`BOOK ${subscription.name?.toUpperCase()} CLASS`}</Link>
            </div>
        </div>
    )
}