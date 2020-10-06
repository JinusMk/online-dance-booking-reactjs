import React from 'react'
import { List, ListItem } from '@material-ui/core'
import { imageBasePath } from '../../../constants';

export default function HowWorks(props){
    return(
        <div className="how-it-works-blk">
            <h3 className="heading2 title">How Letzdance works</h3>
            <List className="listUnstyled">
                <ListItem className="">
                    <img className="icon" src={`${imageBasePath}book_emoji.svg`}/>
                    <p className="paragraph">Book your favorite live dance type.</p>
                </ListItem>
                <img className="down-arrow" src={`${imageBasePath}down_arrow_icon.svg`} />
                <ListItem className="">
                    <img className="icon" src={`${imageBasePath}home_emoji.svg`}/>
                    <p className="paragraph">Pick a comfortable spot in your home for your dance workout.</p>
                </ListItem>
                <img className="down-arrow" src={`${imageBasePath}down_arrow_icon.svg`} />
                <ListItem className="">
                    <img className="icon" src={`${imageBasePath}z_icon.svg`}/>
                    <p className="paragraph">Open Letzdance and join in at the time of your <span style={{color: '#AE0423'}}>LIVE</span> class. </p>
                </ListItem>
                <img className="down-arrow" src={`${imageBasePath}down_arrow_icon.svg`} />
                <ListItem className="">
                    <img className="icon" src={`${imageBasePath}dancing_emoji.svg`}/>
                    <p className="paragraph">Enjoy your live class and get fit!</p>
                </ListItem>
            </List>
        </div>
    )
}