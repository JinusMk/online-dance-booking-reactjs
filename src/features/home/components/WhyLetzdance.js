import React from 'react'
import { List, ListItem } from '@material-ui/core'
import { imageBasePath } from '../../../constants';

export default function WhyLetzdance(props){
    return(
        <div className="why-letzdance-blk">
            <h3 className="heading2 title">Why Letzdance</h3>
            <List className="listUnstyled">
                <ListItem className="point-one">
                    <img src={`${imageBasePath}dancing_emoji.svg`}/>
                    <p className="heading3">Join in at any dance level - Beginner or expert</p>
                </ListItem>
                <ListItem className="point-two">
                    <img src={`${imageBasePath}dancing_pair_emoji.svg`} />
                    <p className="heading3">Handpicked expert instructors that guide you in real-time</p>
                </ListItem>
                <ListItem className="point-three">
                    <img src={`${imageBasePath}dancing_guy_emoji.svg`} />
                    <p className="heading3">Track your progress, get instructor feedback and level up!</p>
                </ListItem>
                <ListItem className="point-four">
                    <img src={`${imageBasePath}wynk_emoji.svg`} />
                    <p className="heading3">You won’t get all of the above on Cure.fit or YouTube</p>
                </ListItem>
            </List>
        </div>
    )
}