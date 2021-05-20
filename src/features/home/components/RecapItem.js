import React, { useState } from 'react'
import { SwipeableDrawer } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { imageBasePath } from '../../../constants'
import { Link, useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import moment from 'moment'

export default function RecapItem(props){
    let history = useHistory()
    const { recap, publicLink } = props
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
    const handleClick = (recap) => {
        sessionStorage.setItem('categoryId', recap._id);
        history.push(`/dance/${recap.category?.slug ? recap.category?.slug : recap.category.name?.toLowerCase()}`)
    }
    return(
        <>
        <div className="last-week-recap-item" onClick={() => setOpenRecap(true)}>
            <div className="img-blk">
                {imgLoader ? <div className="img-loader"><Skeleton variant="rect" height={161} /></div> : null}
                {/* <img src={recap.img} className="dance-logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/> */}
                <img src={`${publicLink}/${recap.image}`} className="dance-logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                <img src={`${imageBasePath}play_icon.svg`} className="play-icon"/>
            </div>
            <h3 className="heading3">{`${recap.category?.name} | ${recap.instructor?.name}`}</h3>
            <p className="paragraph">{`${recap.totalUsers} dancers | ${moment(recap.danceClassDate).format('DD MMM YYYY')}`}</p>
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
                    {/* <div className="line"></div> */}
                    <h3 className="heading2">Watch recap</h3>
                    <video height="164" poster={`${publicLink}/${recap.image}`} controls className="custom-video" autoPlay>
                        <source src={`${publicLink}/${recap.video}`} type="video/mp4" />
                        <source rc={`${publicLink}/${recap.video}`} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="class-info">
                        <h3 className="heading3">{`${recap.category?.name} by ${recap.instructor?.name}`}</h3>
                        <p className="paragraph">{`${recap.totalUsers} dancers | ${moment(recap.danceClassDate).format('DD MMM YYYY')}`}</p>
                    </div>
                </div>
                <div className="footer-review-card">
                    <a onClick={() => handleClick(recap)} className="primaryBtn">{`Book ${recap.category?.name} class`.toUpperCase()}</a>
                </div>
            </SwipeableDrawer>
        ))}
        </>
    )
}