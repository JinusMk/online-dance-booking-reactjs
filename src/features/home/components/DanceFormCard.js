import React from 'react'
import { useHistory } from 'react-router-dom'
import { imageBasePath, danceCategory, instructorsData } from '../../../constants';

export default function DanceFormCard(props){
    let history = useHistory()
    const { dance } = props
    return(
        <div className="card" onClick={() => history.push(`/dance/${danceCategory[dance.category_id]}`)}>
                <div className="top-blk">
                    <img src={`${imageBasePath}${danceCategory[dance.category_id]}_logo_1.svg`} className="logo" />
                    <span className="secondaryText">Live & interactive</span>
                    <div className="title-wrapper">
                        <p className="heading2">{dance.category}</p>
                    </div>
                </div>
                <div className="info-blk">
                    <h3 className="heading3">
                        <img src={`${imageBasePath}star_icon.svg`} />
                        <span>{dance.rating}</span>
                        <span className="rating">({dance.rating_count} RATINGS)</span>
                    </h3>
                    <p className="heading3 cost"><span>₹{dance.cost_old}</span>₹{dance.cost}</p>
                    <p className="subHeading"><img src={`${imageBasePath}clock_icon.svg`} /> <span>{`${dance.duration} class by ${instructorsData.find(instructor => instructor.category == danceCategory[dance.category_id]).name}`}</span></p>
                    {/* <ul className="listInline">
                        {
                            dance.slots.map((item, index) => (index < (dance.slots.length <= 3 ? 3 : 2)) &&  <li key={index}>
                                <a className="primaryBtn round">{item.time}</a>
                                <p className={item.status == "ALMOST FULL" ? "alert_red" : 'alert_orange'}>{item.status}</p>
                            </li>)
                        }
                        {
                            dance.slots.length > 3 && <li key={2}>
                                <a className="secondaryBtn round">+{dance.slots.length - 2} MORE</a>
                            </li>
                        }
                    </ul> */}
                </div>
            </div>
    )
}