import React, { useState } from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { imageBasePath } from '../../../constants'
import moment from 'moment'

export default function RecordingVideo(props){
    const { recordingData } = props
    const [play, setPlay] = useState(false)
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="recording-video-wrapper">
            {
                play ? <video height="170" poster={recordingData.img} controls className="custom-video" autoPlay>
                    <source src={recordingData.media} type="video/mp4" />
                    <source src={recordingData.media} type="video/ogg" />
                    Your browser does not support the video tag.
                </video> : <div className="img-blk">
                {imgLoader ? <div className="img-loader">
                    <Skeleton variant="rect" height={170} /></div> : null}
                    <img src={recordingData.img} className="dance-logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                    <img src={`${imageBasePath}play_icon.svg`} className="play-icon" onClick={() => setPlay(true)}/>
                </div>
            }
            <div className="class-info">
                <h3 className="heading3">{`${recordingData.category} | ${recordingData.instructor}`}</h3>
                <p className="paragraph">{`${recordingData.participants} dancers | ${moment(recordingData.date).format('DD MMM YYYY')}`}</p>
            </div>
        </div>
    )
}