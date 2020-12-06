import React, { useState } from 'react'
import { Grid } from '@material-ui/core';
import moment from 'moment'
import { checkIsFinished } from '../utils';

export default function DanceAlert(props){
    const { dance } = props
    return(
        <div className="dance-alert-wrapper">
            <h3 className="heading3">{`Your ${dance.category} class ${checkIsFinished(dance.class_booked_start_time.slice(0, -1)) ? 'has already started !': moment().format('DD-MM-YYYY') == dance.class_booked_for ? 'is about to start!' : 'is yet to start!'}`}</h3>
            {/* <p className="paragraph">Angel, Kunal and 5 others are in the class.</p> */}
            <Grid container justify="" alignItems="center" className="alert-info">
                <Grid item xs={6}>
                    <p className="secondaryText">{checkIsFinished(dance.class_booked_start_time.slice(0,-1)) ? 'STARTED ' : 'STARTS '}AT {dance.class_booked_start_time ? moment(dance.class_booked_start_time.slice(0, -1)).format('hh:mm A') : ''}</p>
                </Grid>
                <Grid xs={6}>
                    <p><a target="_blank" href={dance.zoom_link}className="secondaryBtn">JOIN CLASS</a></p>
                </Grid>
            </Grid>
        </div>
    )
}