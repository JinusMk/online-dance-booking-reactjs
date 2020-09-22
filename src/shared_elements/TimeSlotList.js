import React from 'react'
import { Link } from 'react-router-dom'

export default function TimeSlots(props){
    const { title, timeSlots=[], danceId } = props
    return(
        <div className="time-slots-wrapper">
            <p className="secondaryText">{title}</p>
            <ul className="listInline">
                {timeSlots.map((item, index) => <li key={index}>
                    <Link to={{pathname: `/dance/${danceId}/book`}} className={`primaryBtn round ${item.status == "Disabled" ? 'disabled': ''}`}>{item.status == "Disabled" ? item.time : `Book ${item.time}`}</Link>
                    {/* <p className={item.status == "ALMOST FULL" ? "alert_red" : 'alert_orange'}>{item.status != 'Disabled' ? item.status : null}</p> */}
                </li>)}
            </ul>
        </div>
    )
}