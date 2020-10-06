import React from   'react'
import TimeSlotList from './TimeSlotList'
import { imageBasePath } from '../constants';

export default function DanceInformationCard(props){
    const { dance, type="", sectionId, activeDate } = props
    return(
        <div className="dance-information-card">
            <div className="top-blk flexCentered">
                <img src={dance.img} className="logo"/>
                <div className="content">
                    <h3 className="heading2">{dance.title}</h3>
                    <h3 className="heading3">
                        <img src={`${imageBasePath}star_icon.svg`} />
                        <span>{dance.rating}</span>
                        <span className="rating">({dance.ratingCount} RATINGS)</span>
                    </h3>
                </div>
            </div>
            <ul className="bottom-blk listUnstyled">
                {type == "schedule" && <p className="heading2 cost"><span>{dance.costOld}</span>{dance.cost}</p>}
                <li>
                    <p className="paragraph"><img src={`${imageBasePath}clock_icon_active.svg`} /> <span>{`${dance.duration} class by ${dance.instructor ? dance.instructor.name: ''}`}</span></p>
                </li>
                <li>
                    <p className="paragraph"><img src={`${imageBasePath}participants_icon.svg`} /> <span>{`${dance.participants} satisfied dancers last week`}</span></p>
                </li>
                <li>
                    <p className="paragraph"><span className="live">LIVE</span> <span>{`Completely online`}</span></p>
                </li>
            </ul>
            {
                type == "schedule" && <>
                    <TimeSlotList title="MORNING" timeSlots={dance.morning} date={activeDate} dance={dance} sectionId={sectionId}/>
                    <TimeSlotList title="EVENING" timeSlots={dance.evening} date={activeDate} dance={dance} sectionId={sectionId}/>
                </>
            }
        </div>
    )
}