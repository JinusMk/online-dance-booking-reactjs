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
        <div className="card" onClick={() => {
            sessionStorage.setItem('categoryId', dance._id);
            history.push(`/dance/${dance.category}`)
        }}>
                <div className="top-blk">
                    {imgLoader ? <Skeleton variant="rect" height={isMobile ? 182 : 144} className="img-loader"/> : null}
                    {/* <img src={`${imageBasePath}${danceCategory[dance.category_id]}_logo_1.svg`} className="logo" alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/> */}
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
                        <span className="rating">({dance.rating_count} RATINGS)</span>
                    </h3>
                    <p className="heading3 cost"><span>{`${currencySymbol[dance.currencyType]}${dance.cost_old}`}</span>{`${currencySymbol[dance.currencyType]}${dance.cost}`}</p>
                    <p className="subHeading"><img src={`${imageBasePath}clock_icon.svg`} /> <span>{`${dance.duration} class by ${dance.instructor ? dance.instructor.name: ''}`}</span></p>
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
                        <li style={{width: '100%', padding: 0, margin: 0}}><a className="secondaryBtn round" style={{borderRadius: 4}}>{`BOOK ${dance.category.toUpperCase()} CLASS`}</a></li>
                    </ul>
                </div>
            </div>
    )
}