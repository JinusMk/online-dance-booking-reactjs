import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { imageBasePath } from '../../../constants';

const howWorksData = [ 
    { img: `${imageBasePath}book_emoji.svg`, text: `Book your favorite live dance type.` },
    { img: `${imageBasePath}home_emoji.svg`, text: `Pick a comfortable spot in your home for your dance workout.` },
    { img: `${imageBasePath}z_icon.svg`, text: `Open Letzdance and join in at the time of your <span style={{color: '#AE0423'}}>LIVE</span> class.` },
    { img: `${imageBasePath}dancing_emoji.svg`, text: `Enjoy your live class and get fit!` },
]

export default function HowWorks(props){
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="how-it-works-blk">
            <h3 className="heading2 title">How Letzdance works</h3>
            <Grid container alignItems="center" spacing={2} className="how-works-list">
                {
                    howWorksData.map((item, index) => <Grid key={index} item xs={12} md={3} className="list-item-grid">
                        <div className="list-item">
                            {imgLoader ? <Skeleton variant="rect" height={32} width={32} style={{marginRight: 16}}/> : null}
                            <img className="icon" src={item.img} style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                            <p className="paragraph" dangerouslySetInnerHTML={{__html: item.text}}></p>
                        </div>
                        {index != 3 && <img className="down-arrow" src={`${imageBasePath}down_arrow_icon.svg`} />}
                    </Grid>)
                }
            </Grid>
        </div>
    )
}