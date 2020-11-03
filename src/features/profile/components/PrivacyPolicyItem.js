import React from 'react'
import { Grid } from '@material-ui/core'

export default function PrivacyPolicy(props){
    return(
        <Grid item xs={12}>
            <div className="privacy-content-blk">
                <h3 className="heading2">{props.title}</h3>
                <p className="paragraph" dangerouslySetInnerHTML={{__html: props.content}}></p>
            </div>
        </Grid>
    )
}