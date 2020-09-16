import React from 'react'

export default function TimeSlots(props){
    const { title, timeSlots=[] } = props
    return(
        <div className="time-slots-wrapper">
            <p className="secondaryText">{title}</p>
            <ul className="listInline">
                {timeSlots.map((item, index) => <li key={index}>
                    <a className={`primaryBtn round ${item.status == "Disabled" ? 'disabled': ''}`}>{item.status == "Disabled" ? item.time : `Book ${item.time}`}</a>
                    {/* <p className={item.status == "ALMOST FULL" ? "alert_red" : 'alert_orange'}>{item.status != 'Disabled' ? item.status : null}</p> */}
                </li>)}
            </ul>
        </div>
    )
}