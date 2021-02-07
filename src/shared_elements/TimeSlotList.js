import React from 'react'
import { Link } from 'react-router-dom'
import { checkIsFinished } from '../utils'
import moment from 'moment'

function TimeSlotList(props){
    const { title, timeSlots=[], dance, sectionId="", date, category } = props
    return(
        <div className="time-slots-wrapper">
            <p className="secondaryText">{title}</p>
            <ul className="listInline">
                {timeSlots.map((item, index) => <li key={index}>
                    <Link to={{pathname: `/dance/${category}/${item.id}/booking`, state: { sectionId: sectionId }}} className={`primaryBtn round ${(item.total_seats != 0 && !checkIsFinished(item.class_disable_time)) ? '': 'disabled'}`}>{(item.total_seats != 0 && !checkIsFinished(item.class_disable_time) ) ? `Book ${moment(item.class_start_time).format('hh:mm A')}` : moment(item.class_start_time).format('hh:mm A') }</Link>
                    {item.total_seats == 0 ? <p className="infoText alert_red">FULL</p> : (item.total_seats <= 5 && item.total_seats >1) ? <p className="infoText alert_orange">FAST FILLING</p> : item.total_seats == 1 ? <p className="infoText alert_red">ALMOST FULL</p> : null}
                </li>)}
            </ul>
        </div>
    )
}
export default TimeSlotList