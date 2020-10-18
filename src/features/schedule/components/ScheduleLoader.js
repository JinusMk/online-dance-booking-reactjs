import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

export default function ScheduleLoader(props){
    return(
        <div className="schedule-skeleton-wrapper">
            <div className="date-wrapper">
                {[0,1,2,3,4,5,6].map((item, index) => <Skeleton key={index} variant="rect" width={50} height={60} className="date-item"/>)}
            </div>
            <Skeleton variant="text" height={55}/>
            {
                [0,1].map((item, index) => <div className="dance-card-skeleton" key={index}>
                <Grid container spacing={2} style={{marginBottom: 16}}>
                    <Grid item xs={3}>
                        <Skeleton variant="rect" height={82} />
                    </Grid>
                    <Grid item xs={7}>
                        <Skeleton variant="rect" height={32} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Skeleton variant="rect" height={24} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="rect" height={16} />
                    </Grid>
                </Grid>
            </div>)
            }
        </div>
    )
}