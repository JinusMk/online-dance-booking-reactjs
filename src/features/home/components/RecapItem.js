import React, { useState } from 'react'
import { SwipeableDrawer } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { imageBasePath } from '../../../constants'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

export default function RecapItem(props){
    const { recap } = props
    const [imgLoader, setImgLoader] = useState(true)
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const [vidLoader, setVidLoader] = useState(true)
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
                {imgLoader ? <div className="img-loader"><Skeleton variant="rect" height={179} /></div> : null}
                <img src={recap.img} className="dance-logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
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
                onOpen={(e) => e.preventDefault()}
            >
                <div className={`auth-popup-wrapper review recap`}>
                    <div className="line"></div>
                    <h3 className="heading2">Watch recap</h3>
                    <video height="164" poster={recap.img} controls className="custom-video" autoPlay>
                        <source src={recap.media} type="video/mp4" />
                        <source src={recap.media} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="class-info">
                        <h3 className="heading3">{`${recap.category[0].toUpperCase()}${recap.category.slice(1)} by ${recap.instructor}`}</h3>
                        <p className="paragraph">{`${recap.participants} dancers | ${recap.date}`}</p>
                    </div>
                </div>
                <div className="footer-review-card">
                    <Link to={`/schedule`} className="primaryBtn">{`Book ${recap.category} class`.toUpperCase()}</Link>
                </div>
            </SwipeableDrawer>
        ))}
        </>
    )
}