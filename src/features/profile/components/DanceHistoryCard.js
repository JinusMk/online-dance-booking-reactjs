import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { imageBasePath, danceCategory } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function DanceHistoryCard(props){
    const [imgLoader, setImgLoader] = useState(true)
    const { dance } = props
    return(
        <div className="dance-history-card">
            <div className="title-block">
                {imgLoader ? <div><Skeleton variant="rect" height={72} width={72} style={{borderRadius: 8, marginRight: 16}}/></div> : null}
                <img src={`${imageBasePath}${danceCategory[dance.category_id]}_card_logo.svg`} className="logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                <div>
                    <h3 className="heading2 title">{dance.category}</h3>
                    <p className="heading3">{`${moment(dance.class_booked_for, 'DD-MM-YYYY').format('DD MMM')}, ${dance.class_booked_start_time}`}</p>
                </div>
            </div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    {dance.review ? <h3 className="heading2 rating"><img src={`${imageBasePath}star_icon.svg`}/><span>{dance.review}</span></h3> : <p><Link to={`/dance/${danceCategory[dance.category_id]}/${dance.dance_id}/review`} className="secondaryBtn">ADD A REVIEW</Link></p>}
                </Grid>
                <Grid item xs={6}>
                    <p><Link className="secondaryBtn" to={`/dance/${danceCategory[dance.category_id]}/${dance.dance_id}`}>VIEW DETAILS</Link></p>
                </Grid>
            </Grid>
        </div>
    )
}