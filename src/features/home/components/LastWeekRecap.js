import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, imageBasePath, lastWeekRecapVideos } from '../../../constants'
import { isMobile } from 'react-device-detect'
import { Avatar, SwipeableDrawer } from '@material-ui/core';
import { Link } from 'react-router-dom'
import "react-multi-carousel/lib/styles.css";

export default function LastWeekRecap(props){
    return(
        <>
        <div className="last-week-recap block">
            <h3 className="heading2 title">Last week recap</h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={isMobile ? true : false}
                arrows={isMobile ? false: true }
                containerClass="partially-visible-carousel-container last-week-recap"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {
                    lastWeekRecapVideos.map((item, index) => <RecapItem recap={item} key={index}/>)
                }
            </Carousel>
        </div>
        </>
    )
}

function RecapItem(props){
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