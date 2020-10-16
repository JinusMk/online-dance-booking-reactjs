import React, { useState } from 'react'
import { Avatar, SwipeableDrawer } from '@material-ui/core';
import { imageBasePath } from '../../../constants'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

export default function RecapItem(props){
    const { recap } = props
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const [openRecap, setOpenRecap] = useState(false)
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpenRecap(false)
        setState({ ...state, [anchor]: open });
    };
    return(
        <>
        <div className="last-week-recap-item" onClick={() => setOpenRecap(true)}>
            <div className="img-blk">
                <img src={recap.img} className="dance-logo"/>
                <img src={`${imageBasePath}play_icon.svg`} className="play-icon"/>
            </div>
            <h3 className="heading3">{`${recap.category} | ${recap.instructor}`}</h3>
            <p className="paragraph">{`${recap.participants} dancers | ${recap.date}`}</p>
        </div>
        {[isMobile ? 'bottom': 'right'].map((anchor) => (
            <SwipeableDrawer
                key={anchor}
                anchor={anchor}
                open={openRecap}
                onClose={toggleDrawer(anchor, false)}
                className="custom-drawer review"
            >
                <div className={`auth-popup-wrapper review recap`}>
                    <div className="line"></div>
                    <h3 className="heading2">Watch recap</h3>
                    <video height="164" poster={recap.img} controls className="custom-video">
                        <source src={recap.media} type="video/mp4" />
                        <source src={recap.media} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="class-info">
                        <h3 className="heading3">{`${recap.category} by ${recap.instructor}`}</h3>
                        <p className="paragraph">{`${recap.participants} dancers | ${recap.date}`}</p>
                    </div>
                </div>
                <div className="footer-review-card">
                    <Link to={`/dance/${recap.category}`} className="primaryBtn">{`Book ${recap.category} class`.toUpperCase()}</Link>
                </div>
            </SwipeableDrawer>
        ))}
        </>
    )
}