import React, { useState } from 'react'
import { imageBasePath } from '../../../constants';
import Skeleton from '@material-ui/lab/Skeleton';

export default function InstructorCard(props){
    const { instructor } = props
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="instructor-card" onClick={() => props.handleInstructorClick ? props.handleInstructorClick(instructor) : null}>
            <div className="title-blk">
                {
                    imgLoader ? <Skeleton variant="rect" className="profile-img" />: null
                }
                <img src={instructor.instructor?.image} className="profile-img"  style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)} alt=""/>
                <h3 className="heading3">{instructor.instructor?.name}</h3>
                <p className="heading3 rating">
                    <img src={`${imageBasePath}star_icon.svg`} alt=""/>
                    <span>{instructor.averageRating}</span>
                    <span className="rating">({instructor.totalRatings} RATINGS)</span>
                </p>
            </div>
            <div className="info-blk">
                <p className="paragraph">
                    <img src={`${imageBasePath}expert_icon.svg`} alt=""/>
                    <span>{instructor.certified}</span>
                </p>
                <p className="paragraph">
                    <img src={`${imageBasePath}experience_icon.svg`} alt=""/>
                    <span>{instructor.experience} experience</span>
                </p>
                <p className="paragraph description">
                    <span className="live">LIVE</span>
                    {instructor.description?.length > 90 ? <>
                        <span>{instructor.description.slice(0,90)}...</span>
                    </> : <span>{instructor.description}</span>}
                </p>
                {
                    instructor.description?.length > 90 && props.handleInstructorClick ? <p className="read-more">
                        <span>Read more</span>
                        <img src={`${imageBasePath}right_arrow_icon.svg`} alt=""/>
                    </p> : null
                }
            </div>
        </div>
    )
}