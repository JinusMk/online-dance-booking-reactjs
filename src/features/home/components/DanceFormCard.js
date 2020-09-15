import React from 'react'
import { useHistory } from 'react-router-dom'
export default function DanceFormCard(props){
    let history = useHistory()
    const { dance } = props
    return(
        <div className="card" onClick={() => history.push('/dance/1')}>
                <div className="top-blk">
                    <img src={dance.img} className="logo" />
                    <span className="secondaryText">Live & interactive</span>
                    <p className="heading2">{dance.title}</p>
                </div>
                <div className="info-blk">
                    <h3 className="heading3">
                        <img src={require('../../../assets/images/star_icon.svg')} />
                        <span>{dance.rating}</span>
                        <span className="rating">({dance.ratingCount} RATINGS)</span>
                    </h3>
                    <p className="heading3 cost"><span>{dance.costOld}</span>{dance.cost}</p>
                    <p className="subHeading"><img src={require('../../../assets/images/clock_icon.svg')} /> <span>{`${dance.duration} class by ${dance.instructor}`}</span></p>
                    <ul className="listInline">
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
                    </ul>
                </div>
            </div>
    )
}