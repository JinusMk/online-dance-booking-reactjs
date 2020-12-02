import React, { useState } from 'react'
import { Grid } from '@material-ui/core';

export default function DanceAlert(props){
    const { dance } = props
    return(
        <div className="dance-alert-wrapper">
            <h3 className="heading3">{`Your ${dance.category} class is about to start!`}</h3>
            {/* <p className="paragraph">Angel, Kunal and 5 others are in the class.</p> */}
            <Grid container justify="" alignItems="center" className="alert-info">
                <Grid item xs={6}>
                    <p className="secondaryText">STARTS ON 2:12</p>
                </Grid>
                <Grid xs={6}>
                    <p><a className="secondaryBtn">JOIN CLASS</a></p>
                </Grid>
            </Grid>
        </div>
    )
}