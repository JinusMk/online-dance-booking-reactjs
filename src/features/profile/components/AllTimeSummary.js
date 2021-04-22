import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import { globalGetService } from '../../../utils/globalApiServices';

export default function AllTimeSummary(props){
    const [loader, setLoader] = useState(true)
    const [attendedCount, setAttendedCount] = useState(0)

    useEffect(() => {
        globalGetService(`userSubscriptions`)
        .then(response => {
            if(response.success == true){
                let count = 0
                response.data.forEach(sub => {
                    count += sub.danceClassesAttended
                })
                setAttendedCount(count)
                setLoader(false)
            }
        })
    })
    return(
        <div className="all-time-summary">
            <p className="secondaryText label">ALL TIME SUMMARY</p>
            <Grid container className="summary-wrapper">
                <Grid item xs={4}>
                    <div className="summary-item textCenter">
                        <h1 className="heading1">{loader ? '--' : attendedCount}</h1>
                        <p className="secondaryText">CLASSES <br/>COMPLETED</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="summary-item textCenter">
                        <h1 className="heading1">0<span>k</span></h1>
                        <p className="secondaryText">CALORIES <br/> BURNED</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="summary-item textCenter">
                        <h1 className="heading1">--<span></span></h1>
                        <p className="secondaryText">CURRENT <br/>WEIGHT</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}