import React from 'react'
import { Grid } from '@material-ui/core'
import { imageBasePath } from '../../../constants';
import { isMobile } from 'react-device-detect'

export default function WhyLetzdance(props){
    return(
        <div className="why-letzdance-blk">
            <h3 className="heading2 title">Why Letzdance</h3>
            <Grid container spacing={isMobile ? 1 : 2} className="list-wrapper">
                <Grid item xs={12} md={6}>
                    <div className="point-one list-item">
                        <img src={`${imageBasePath}dancing_emoji.svg`}/>
                        <p className="heading3">Join in at any dance level - Beginner or expert</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="point-two list-item">
                        <img src={`${imageBasePath}dancing_pair_emoji.svg`} />
                        <p className="heading3">Handpicked expert instructors that guide you in real-time</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div  className="point-three list-item">
                        <img src={`${imageBasePath}dancing_guy_emoji.svg`} />
                        <p className="heading3">Track your progress, get instructor feedback and level up!</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="list-item point-four">
                        <img src={`${imageBasePath}wynk_emoji.svg`} />
                        <p className="heading3">You won’t get all of the above on Cure.fit or YouTube</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}