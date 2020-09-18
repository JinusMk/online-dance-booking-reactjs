import React from 'react'

export default function DanceInfo(props){
    const { dance } = props
    return(
        <div className="dance-info block">
            <h3 className="heading3">
                <img src={require('../../../assets/images/star_icon.svg')} />
                <span>{dance.rating}</span>
                <span className="rating">({dance.ratingCount} RATINGS)</span>
            </h3>
            <p className="heading2 cost"><span>{dance.costOld}</span><br/>{dance.cost}</p>
            <ul className="listUnstyled">
                <li><p className="paragraph"><img src={require('../../../assets/images/clock_icon_active.svg')} /> <span>{`${dance.duration} class by ${dance.instructor.name}`}</span></p></li>
                <li><p className="paragraph"><img src={require('../../../assets/images/group_icon.svg')} /> <span>{`${dance.participants} satisfied dancers last week`}</span></p></li>
                <li><p className="paragraph"><span className="live">LIVE</span> <span>{`Completely online`}</span></p></li>
            </ul>
        </div>
    )
}