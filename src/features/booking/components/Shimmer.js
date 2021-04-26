import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, List, ListItem } from '@material-ui/core'

export default function Shimmer(props){
    return(
        <div className="shimmer-wrapper">
            <Skeleton variant="text" width={150} height={50} style={{marginBottom: 16}}/>
            <Skeleton variant="rect" height={120} style={{marginBottom: 24}}/>
            <Skeleton variant="text" width={240} height={50} style={{marginBottom: 16}}/>
            <List>
                <ListItem>
                        <Skeleton variant="rect" width={64} height={64} />
                        <Skeleton variant="text" width={250} height={50} style={{marginBottom: 16, marginLeft: 16}}/>
                </ListItem>
                <ListItem>
                        <Skeleton variant="rect" width={64} height={64} />
                        <Skeleton variant="text" width={250} height={50} style={{marginBottom: 16, marginLeft: 16}}/>
                </ListItem>
            </List>
        </div>
    )
}