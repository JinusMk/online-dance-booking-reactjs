import React from 'react'
import { Link } from 'react-router-dom'

function TimeSlotList(props){
    const { title, timeSlots=[], dance, sectionId="", date, category } = props
    return(
        <div className="time-slots-wrapper">
            <p className="secondaryText">{title}</p>
            <ul className="listInline">
                {timeSlots.map((item, index) => <li key={index}>
                    <Link to={{pathname: `/dance/${category}/${item.id}/booking`, state: { sectionId: sectionId }}} className={`primaryBtn round ${item.status ? '': 'disabled'}`}>{item.status ? `Book ${item.class_start_time}` : item.class_start_time }</Link>
                    {/* <p className={item.label == "ALMOST FULL" ? "alert_red" : 'alert_orange'}>{item.status !== 0 ? item.status : null}</p> */}
                </li>)}
            </ul>
        </div>
    )
}
export default TimeSlotList