import React from 'react'
import { imageBasePath, instructorsData, participantsCount } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function DanceInfo(props){
    const { dance } = props
    return(
        <div className="dance-info block">
            {props.loader ? <div className="dance-info-skeleton-wrapper">
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={30} />
            </div> : <>    
                <h3 className="heading3">
                    <img src={`${imageBasePath}star_icon.svg`} />
                    <span>{dance.rating}</span>
                    <span className="rating">({dance.rating_count} RATINGS)</span>
                </h3>
                <p className="heading2 cost"><span>₹{dance.cost_old}</span>₹{dance.cost}</p>
                <ul className="listUnstyled">
                    <li><p className="paragraph"><img src={`${imageBasePath}clock_icon_active.svg`} /> <span>{`${dance.duration} class by ${instructorsData.find(instructor => instructor.category == props.category).name}`}</span></p></li>
                    <li><p className="paragraph"><img src={`${imageBasePath}participants_icon.svg`} /> <span>{`${dance.participants == 0 ? participantsCount[props.category]: dance.participants} satisfied dancers last week`}</span></p></li>
                    <li><p className="paragraph"><span className="live">LIVE</span> <span>{`Completely online`}</span></p></li>
                </ul>
                </>
            }
        </div>
    )
}