import React from 'react'
import { Grid } from '@material-ui/core';
import { imageBasePath } from '../../../constants';

export default function DanceHistoryCard(props){
    const { dance, date } = props
    return(
        <div className="dance-history-card">
            <div className="title-block">
                <img src={dance.img} />
                <div>
                    <h3 className="heading2 title">{dance.title}</h3>
                    <p className="heading3">{`${date}, ${dance.time}`}</p>
                </div>
            </div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    {dance.review ? <h3 className="heading2 rating"><img src={`${imageBasePath}star_icon.svg`}/><span>{dance.review}</span></h3> : <p><a className="secondaryBtn">ADD A REVIEW</a></p>}
                </Grid>
                <Grid item xs={6}>
                    <p><a className="secondaryBtn">VIEW DETAILS</a></p>
                </Grid>
            </Grid>
        </div>
    )
}