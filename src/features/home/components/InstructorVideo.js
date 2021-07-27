import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SwipeableDrawer } from '@material-ui/core';
import { isMobile } from 'react-device-detect'

export default function InstructorVideo(props){
    const { open, publicLink, instructor } = props
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        props.handleClose()
        setState({ ...state, [anchor]: open });
    };
    return(
        <>
        {
        [isMobile ? 'bottom': 'right'].map((anchor) => (
            <SwipeableDrawer
                key={anchor}
                onOpen={(e) => e.preventDefault()}
                anchor={anchor}
                open={open}
                onClose={toggleDrawer(anchor, false)}
                className="custom-drawer instructor-video"
            >
                <div className="auth-popup-wrapper instructor-video recap">
                    <h3 className="heading2">Watch instructor video</h3>
                    <video height="164" poster={`${publicLink}/${instructor?.image}`} controls className="custom-video" autoPlay key={instructor?._id}>
                        <source src={`${publicLink}/${instructor.video}`} type="video/mp4" />
                        <source rc={`${publicLink}/${instructor.video}`} type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="class-info">
                        <h3 className="heading3">{`${instructor.category?.name} by ${instructor.instructor?.name}`}</h3>
                        <p className="paragraph">{`${instructor.certified} | ${instructor.experience} experience`}</p>
                    </div>
                </div>
                <div className="footer-review-card">
                    <Link to={`dance/${instructor.category?.slug}/${instructor.category?._id}`} className="primaryBtn">{`Book ${instructor.category?.name} class`.toUpperCase()}</Link>
                </div>
            </SwipeableDrawer>
        ))}
        </>
    )
}