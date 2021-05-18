import React, { useState } from 'react'
import { imageBasePath, participantsCount, currencySymbol } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function DanceInfo(props){
    const { dance } = props
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="dance-info block">
            {props.loader ? <div className="dance-info-skeleton-wrapper">
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={30} />
                <Skeleton variant="text" height={30} />
            </div> : <>    
                <h3 className="heading3">
                    {imgLoader ? <Skeleton variant="rect" height={18} width={18} /> : null}
                    <img src={`${imageBasePath}star_icon.svg`} style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                    <span>{dance.rating}</span>
                    <span className="rating">({dance.rating_count} RATINGS)</span>
                </h3>
                <p className="heading2 cost"><span>{`${currencySymbol[dance.currencyType]}${dance.cost_old}`}</span>{`${currencySymbol[dance.currencyType]}${dance.cost}`}</p>
                <ul className="listUnstyled">
                    <li><p className="paragraph">
                        {imgLoader ? <Skeleton variant="rect" height={18} width={18} /> : null}
                        <img src={`${imageBasePath}clock_icon_active.svg`} style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/> <span>{`${dance.duration} class by ${dance.instructor && dance.instructor.name}`}</span></p></li> 
                    <li><p className="paragraph">
                    {imgLoader ? <Skeleton variant="rect" height={18} width={18} /> : null}
                        <img src={`${imageBasePath}participants_icon.svg`} style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/> <span>{`${dance.participants} satisfied dancers last week`}</span></p></li>
                    <li><p className="paragraph"><span className="live">LIVE</span> <span>{`Completely online`}</span></p></li>
                </ul>
                </>
            }
        </div>
    )
}