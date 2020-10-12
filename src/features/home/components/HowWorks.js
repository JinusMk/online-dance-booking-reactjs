import React from 'react'
import { List, ListItem, Grid } from '@material-ui/core'
import { imageBasePath } from '../../../constants';

export default function HowWorks(props){
    return(
        <div className="how-it-works-blk">
            <h3 className="heading2 title">How Letzdance works</h3>
            <Grid container alignItem="center" spacing={2} className="how-works-list">
                <Grid item xs={12} md={3} className="list-item-grid">
                    <div className="list-item">
                        <img className="icon" src={`${imageBasePath}book_emoji.svg`}/>
                        <p className="paragraph">Book your favorite live dance type.</p>
                    </div>
                    <img className="down-arrow" src={`${imageBasePath}down_arrow_icon.svg`} />
                </Grid>
                <Grid item xs={12} md={3} className="list-item-grid">
                    <div className="list-item">
                        <img className="icon" src={`${imageBasePath}home_emoji.svg`}/>
                        <p className="paragraph">Pick a comfortable spot in your home for your dance workout.</p>
                    </div>
                    <img className="down-arrow" src={`${imageBasePath}down_arrow_icon.svg`} />
                </Grid>
                <Grid item xs={12} md={3} className="list-item-grid">
                    <div className="list-item">
                        <img className="icon" src={`${imageBasePath}z_icon.svg`}/>
                        <p className="paragraph">Open Letzdance and join in at the time of your <span style={{color: '#AE0423'}}>LIVE</span> class. </p>
                    </div>
                    <img className="down-arrow" src={`${imageBasePath}down_arrow_icon.svg`} />
                </Grid>
                <Grid item xs={12} md={3} className="list-item-grid">
                    <div className="list-item">
                        <img className="icon" src={`${imageBasePath}dancing_emoji.svg`}/>
                        <p className="paragraph">Enjoy your live class and get fit!</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}