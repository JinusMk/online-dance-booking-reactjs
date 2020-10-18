import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

export default function BookingLoader(props){
    return(
        <div className="booking-skeleton-wrapper">
            <Grid container spacing={2} style={{marginBottom: 8}}>
                    <Grid item xs={3}>
                        <Skeleton variant="rect" height={82} />
                    </Grid>
                    <Grid item xs={7}>
                        <Skeleton variant="rect" height={32} style={{marginBottom: 8}}/>
                        <Skeleton variant="rect" height={16} />
                    </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginBottom: 8}}>
                    <Grid item xs={12}>
                        <Skeleton variant="rect" height={24} />
                    </Grid>
                    <Grid item xs={12}>
                        <Skeleton variant="rect" height={16} />
                    </Grid>
            </Grid>
        </div>
    )
}