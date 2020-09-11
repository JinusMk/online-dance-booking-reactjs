import React from 'react'

export default function DanceFormCard(props){
    return(
        <div className="card">
                <div className="top-blk">
                    <img src={require('../../../assets/images/zumba_logo.svg')} className="logo" />
                    <span className="secondaryText">Live & interactive</span>
                    <p className="heading2">Zumba</p>
                </div>
                <div className="info-blk">
                    <h3 className="heading3">
                        <img src={require('../../../assets/images/star_icon.svg')} />
                        <span>4.5</span>
                        <span className="rating">(89 ratings)</span>
                    </h3>
                    <p className="heading3 cost"><span>₹199</span>₹99</p>
                    <p className="subHeading">1 hour class by Angel Bensy</p>
                    <ul className="listInline">
                        <li>
                            <a className="primaryBtn round">10:00 AM</a>
                            <p className="alert_red">ALMOST FULL</p>
                        </li>
                        <li>
                            <a className="primaryBtn round">6:00 PM</a>
                            <p className="alert_orange">FAST FILLING</p>
                        </li>
                    </ul>
                </div>
            </div>
    )
}