import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

export default function DanceHistoryLoader(props){
    return(
        <div className="dance-history-loader">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Skeleton variant="rect" height={30} style={{marginBottom: 8, borderRadius: 8}}/>
                </Grid>
                {[0, 1].map((item, index) => <Grid item xs={12} key={index}>
                    <Skeleton variant="rect" height={150} className="dance-history-item"/>
                </Grid>)}
            </Grid>
        </div>
    )
}

