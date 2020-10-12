import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function TimeSlotList(props){
    const { title, timeSlots=[], dance, sectionId="", date } = props
    let location = useLocation()
    return(
        <div className="time-slots-wrapper">
            <p className="secondaryText">{title}</p>
            <ul className="listInline">
                {timeSlots.map((item, index) => <li key={index}>
                    <Link to={{pathname: `${location.pathname}/${item.id}/booking`, state: { sectionId: sectionId }}} className={`primaryBtn round ${item.label == "Disabled" ? 'disabled': ''}`}>{item.status == "Disabled" ? item.class_start_time : `Book ${item.class_start_time}`}</Link>
                    {/* <p className={item.status == "ALMOST FULL" ? "alert_red" : 'alert_orange'}>{item.status != 'Disabled' ? item.status : null}</p> */}
                </li>)}
            </ul>
        </div>
    )
}
export default TimeSlotList