import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, lastWeekRecapVideos } from '../../../constants'
import Skeleton from '@material-ui/lab/Skeleton';
import { imageBasePath } from '../../../constants'
import "react-multi-carousel/lib/styles.css";

export default function Gallery(props){
    return(
        <div className="gallery block">
            {/* <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={false}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={true}
                arrows={props.loader ? false : true}
                containerClass="partially-visible-carousel-container gallery-carousel"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {props.loader ? [0,1].map((item, index) => <div key={index} className="gallery-skeleton-wrapper">
                    <Skeleton variant="rect" height={170}/>
                </div>): lastWeekRecapVideos.filter(item => item.category == props.category).map((item, index) => <GalleryItem key={index} recap={item}/>)}
            </Carousel> */}
        </div>
    )
}

function GalleryItem(props){
    const { recap } = props
    const [play, setPlay] = useState(false)
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="gallery-item">
            {
                play ? <video height="170" poster={recap.img} controls className="custom-video" autoPlay>
                <source src={recap.media} type="video/mp4" />
                <source src={recap.media} type="video/ogg" />
                Your browser does not support the video tag.
            </video> : <div className="img-blk">
                {imgLoader ? <div className="img-loader"><Skeleton variant="rect" height={170} /></div> : null}
                    <img src={recap.img} className="dance-logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                    <img src={`${imageBasePath}play_icon.svg`} className="play-icon" onClick={() => setPlay(true)}/>
                </div>
            }
            <div className="class-info">
                <h3 className="heading3"><span style={{textTransform: 'capitalize'}}>{`${recap.category}`}</span>{` dance for all levels`}</h3>
                <p className="paragraph">{`${recap.participants} dancers`}</p>
            </div>
        </div>
    )
}