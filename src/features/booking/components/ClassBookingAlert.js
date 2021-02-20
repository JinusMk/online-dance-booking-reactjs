import React from 'react'
import { Link } from 'react-router-dom'

export default function ClassBookingAlert(props){
    const { category } = props
    return(
        <div className="class-booking-alert">
            <div className="class-booking-alert-btn">
                <h3 className="heading3">Want to try one Zumba class before you subscribe? </h3>
                <p className="paragraph">Book the next slot available</p>
                <Link className="secondaryBtn" to={`/dance/${category}`}>{`BOOK ${category.toUpperCase()} CLASS`}</Link>
            </div>
        </div>
    )
}