import React, { useState } from   'react'
import TimeSlotList from './TimeSlotList'
import { imageBasePath, participantsCount, currencySymbol } from '../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function DanceInformationCard(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { dance, type="", sectionId, category, danceClasses } = props
    return(
        <div className="dance-information-card">
            <div className="top-blk flexCentered">
                {imgLoader ? <div><Skeleton variant="rect" height={72} width={72} style={{borderRadius: 8}}/></div> : null}
                <img src={dance.category?.image ? dance.category?.image : `${imageBasePath}${category}_card_logo.svg`} className="logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                <div className="content">
                    <h3 className="heading2">{dance.title ? dance.title : dance.category?.name ? dance.category?.name : category}</h3>
                    <h3 className="heading3">
                        <img src={`${imageBasePath}star_icon.svg`} />
                        <span>{dance.averageRating ? dance.averageRating : dance.rating}</span>
                        <span className="rating">({dance.totalRating ? dance.totalRating : dance.rating_count} RATINGS)</span>
                    </h3>
                </div>
            </div>
            <ul className="bottom-blk listUnstyled">
                {type == "schedule" && <p className="heading2 cost"><span>{`${currencySymbol[dance.currencyType]}${dance.actualCost ? dance.actualCost : dance.cost_old}`}</span>{`${currencySymbol[dance.currencyType]}${dance.discountedCost ? dance.discountedCost : dance.cost}`}</p>}
                <li>
                    <p className="paragraph"><img src={`${imageBasePath}clock_icon_active.svg`} /> <span>{`${dance.duration} class by ${dance.instructor && dance.instructor.name}`}</span></p>
                </li>
                <li>
                    <p className="paragraph"><img src={`${imageBasePath}participants_icon.svg`} /> <span>{`${dance.participants == 0 ? participantsCount[props.category]: dance.participants} satisfied dancers last week`}</span></p>
                </li>
                <li>
                    <p className="paragraph"><span className="live">LIVE</span> <span>{`Completely online`}</span></p>
                </li>
            </ul>
            {
                type == "schedule" && <>
                    {danceClasses.filter(dance => dance.slot == "morning").length ? <TimeSlotList title="MORNING" timeSlots={danceClasses.filter(dance => dance.slot == "morning")} sectionId={sectionId} category={category}/> : null}
                    {danceClasses.filter(dance => dance.slot == "evening").length ? <TimeSlotList title="EVENING" timeSlots={danceClasses.filter(dance => dance.slot == "evening")} sectionId={sectionId} category={category}/> : null}
                </>
            }
        </div>
    )
}