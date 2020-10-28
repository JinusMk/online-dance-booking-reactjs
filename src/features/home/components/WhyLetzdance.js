import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { imageBasePath } from '../../../constants';
import { isMobile } from 'react-device-detect'

const whyLetzDanceData = [
    { img: `${imageBasePath}dancing_emoji.svg`, text: `Join in at any dance level - Beginner or expert` },
    { img: `${imageBasePath}dancing_pair_emoji.svg`, text: `Handpicked expert instructors that guide you in real-time` },
    { img: `${imageBasePath}dancing_guy_emoji.svg`, text: `Track your progress, get instructor feedback and level up!` },
    { img: `${imageBasePath}wynk_emoji.svg`, text: `You won’t get all of the above on Cure.fit or YouTube` },
]

export default function WhyLetzdance(props){
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="why-letzdance-blk">
            <h3 className="heading2 title">Why Letzdance</h3>
            <Grid container spacing={isMobile ? 1 : 2} className="list-wrapper">
                {whyLetzDanceData.map((item, index) => <Grid item xs={12} md={6} key={index}>
                    <div className={`point-${index+1} list-item`}>
                        {imgLoader ? <Skeleton variant="rect" height={32} width={32} style={{marginRight: 16}}/> : null}
                        <img src={item.img} alt="#" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                        <p className="heading3">{item.text}</p>
                    </div>
                </Grid>)
                }
            </Grid>
        </div>
    )
}