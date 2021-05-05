import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, List, ListItem } from '@material-ui/core'

export default function Shimmer(props){
    const { type ="" } = props
    return(
        <div className="shimmer-wrapper">
            {
                type == "user-subscriptions" ? <>
                    {[0,1].map(item => <div key={item} className="user-subscriptions-loader">
                        <Skeleton variant="text" width={250} height={50} style={{marginBottom: 16}}/>
                        <Skeleton variant="rect" height={175} style={{marginBottom: 24, borderRadius: 8}}/>
                    </div>)}
                </> : type == "user-weights" ? <>
                    {[0,1, 2].map(item => <Skeleton variant="text" height={80} style={{marginBottom: 0}}/>)}
                </> : null
            }
        </div>
    )
}