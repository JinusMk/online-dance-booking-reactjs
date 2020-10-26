import React, { useState } from 'react'
import { imageBasePath } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function InstructorCard(props){
    const { instructor } = props
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="instructor-card">
            <div className="title-blk">
                {
                    imgLoader ? <Skeleton variant="rect" className="profile-img" />: null
                }
                <img src={instructor.img} className="profile-img"  style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                <h3 className="heading3">{instructor.name}</h3>
                <p className="heading3 rating">
                    <img src={`${imageBasePath}star_icon.svg`} />
                    <span>{instructor.rating}</span>
                    <span className="rating">({instructor.rating_count} RATINGS)</span>
                </p>
            </div>
            <div className="info-blk">
                <p className="paragraph">
                    <img src={`${imageBasePath}expert_icon.svg`}/>
                    <span>{instructor.qualification}</span>
                </p>
                <p className="paragraph">
                    <img src={`${imageBasePath}experience_icon.svg`}/>
                    <span>{instructor.experience} years experience</span>
                </p>
                <p className="paragraph">
                    <span className="live">LIVE</span>
                    <span>{instructor.no_of_classes} classes on Letzdance</span>
                </p>
            </div>
        </div>
    )
}