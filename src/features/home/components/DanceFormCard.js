import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect'
import { imageBasePath, currencySymbol } from '../../../constants';

export default function DanceFormCard(props){
    let history = useHistory()
    const { dance } = props
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="card" onClick={() => { history.push(`/dance/${dance.category}/${dance._id}`) }}>
                <div className="top-blk">
                    {imgLoader ? <Skeleton variant="rect" height={isMobile ? 160 : 144} className="img-loader"/> : null}
                    <img src={dance.image} className="logo" alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                    <span className="secondaryText">{dance.label}</span>
                    <div className="title-wrapper">
                        <p className="heading2">{dance.name}</p>
                    </div>
                </div>
                <div className="info-blk">
                    <h3 className="heading3">
                        <img src={`${imageBasePath}star_icon.svg`} />
                        <span>{dance.rating}</span>
                        <span className="rating">({dance.rating_count ? dance.rating_count : '--'} RATINGS)</span>
                    </h3>
                    <p className="heading3 cost"><span>{`${currencySymbol[dance.currencyType]}${dance.cost_old ? dance.cost_old : '--'}`}</span>{`${currencySymbol[dance.currencyType]}${dance.cost ? dance.cost : '--'}`}</p>
                    <p className="subHeading"><img src={`${imageBasePath}clock_icon.svg`} /> <span>{`${dance.duration ? dance.duration : '1 hour'} class by ${dance.instructor && dance.instructor?.name ? dance.instructor?.name: '--'}`}</span></p>
                    <p className="subHeading description"><svg class="MuiSvgIcon-root jss67" focusable="false" viewBox="0 0 24 24" aria-hidden="true" tabindex="-1" title="DescriptionOutlined" data-ga-event-category="material-icons" data-ga-event-action="click" data-ga-event-label="DescriptionOutlined"><path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path></svg> <span>{dance.description}</span></p>
                    <ul className="listInline">
                        {/* 
                            dance.buttons.map((item, index) => (index < (dance.buttons.length <= 3 ? 3 : 2)) &&  <li key={index}>
                                <a className="primaryBtn round">{item}</a>
                             <p className={item.status == "ALMOST FULL" ? "alert_red" : 'alert_orange'}>{item.status}</p>
                            </li>)
                            dance.buttons.length > 3 && <li key={2}>
                                <a className="secondaryBtn round">+{dance.buttons.length - 2} MORE</a>
                            </li>
                        
                        */}
                        <li style={{width: '100%', padding: 0, margin: 0}}><a className="secondaryBtn round" style={{borderRadius: 4}}>{`BOOK ${dance?.name?.toUpperCase()} CLASS`}</a></li>
                    </ul>
                </div>
            </div>
    )
}