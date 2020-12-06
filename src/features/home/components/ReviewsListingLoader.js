import React from 'react'
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ReviewsListingLoader(props){
    return(
        <div className="reviews-listing-loader">
            <Grid container spacing={3}>
                {
                    [0,1,2].map((item, index) => <Grid item xs={12} md={6} sm={6} lg={4}>
                            <Skeleton variant="rect" height={200} className="reviews-listing-item"/>
                    </Grid>)
                }
            </Grid>
        </div>
    )
}
