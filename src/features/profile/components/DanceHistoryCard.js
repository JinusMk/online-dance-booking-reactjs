import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'
import { imageBasePath, danceCategory } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function DanceHistoryCard(props){
    let location = useLocation()
    const [imgLoader, setImgLoader] = useState(true)
    const { dance } = props
    return(
        <div className="dance-history-card">
            <div className="title-block">
                {imgLoader ? <div><Skeleton variant="rect" height={72} width={72} style={{borderRadius: 8, marginRight: 16}}/></div> : null}
                <img src={dance?.danceClass?.category?.image} className="logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                <div>
                    <h3 className="heading2 title">{dance.category}</h3>
                    <p className="heading3">{`${moment(dance.class_booked_start_time).format('DD MMM')}, ${moment(dance.class_booked_start_time).format('hh:mm A')}`}</p>
                </div>
            </div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    {(dance.review && dance.review.danceRating >= 0) ? <h3 className="heading2 rating"><img src={`${imageBasePath}star_icon.svg`}/><span>{dance.review?.danceRating}</span></h3> : <p><Link to={{pathname: `/dance/${dance?.danceClass?.category?.slug}/${dance.dance_id}/review`, state: { prevPath: location.pathname }}} className="secondaryBtn">ADD A REVIEW</Link></p>}
                </Grid>
                <Grid item xs={6}>
                    <p><Link className="secondaryBtn" to={{pathname: `/dance/${dance?.danceClass?.category?.slug}/${dance.dance_id}`, state: { prevPath: location.pathname }}}>VIEW DETAILS</Link></p>
                </Grid>
            </Grid>
        </div>
    )
}