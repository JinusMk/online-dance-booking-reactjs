import React from 'react'

export default function WhoWeAre(props){
    return(
        <div className="who-we-are-blk">
            <h3 className="heading2 title">Who we are</h3>
            <p className="paragraph">Learn dancing online and have fun while you get fit. <br/><br/>We have carefully curated instructors across various genres of dance, who train you to become an expert dancer irrespective of the level you are in now. <br/><br/>Book your slot now to experience fun online dancing.</p>
            <img className="bg-img" src={require('../../../assets/images/dancing_emoji.svg')}/>
        </div>
    )
}