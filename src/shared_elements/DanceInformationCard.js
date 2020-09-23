import React from   'react'
import TimeSlotList from './TimeSlotList'

export default function DanceInformationCard(props){
    const { dance, type="", sectionId } = props
    return(
        <div className="dance-information-card">
            <div className="top-blk flexCentered">
                <img src={dance.img} className="logo"/>
                <div className="content">
                    <h3 className="heading2">{dance.title}</h3>
                    <h3 className="heading3">
                        <img src={require('../assets/images/star_icon.svg')} />
                        <span>{dance.rating}</span>
                        <span className="rating">({dance.ratingCount} RATINGS)</span>
                    </h3>
                </div>
            </div>
            <ul className="bottom-blk listUnstyled">
                {type == "schedule" && <p className="heading2 cost"><span>{dance.costOld}</span>{dance.cost}</p>}
                <li>
                    <p className="paragraph"><img src={require('../assets/images/clock_icon_active.svg')} /> <span>{`${dance.duration} class by ${dance.instructor.name}`}</span></p>
                </li>
                <li>
                    <p className="paragraph"><img src={require('../assets/images/group_icon.svg')} /> <span>{`${dance.participants} satisfied dancers last week`}</span></p>
                </li>
                <li>
                    <p className="paragraph"><span className="live">LIVE</span> <span>{`Completely online`}</span></p>
                </li>
            </ul>
            {
                type == "schedule" && <>
                    <TimeSlotList title="MORNING" timeSlots={dance.morning} danceId={dance.id} sectionId={sectionId}/>
                    <TimeSlotList title="EVENING" timeSlots={dance.evening} danceId={dance.id} sectionId={sectionId}/>
                </>
            }
        </div>
    )
}