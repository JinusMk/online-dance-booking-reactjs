import React from 'react'
import { imageBasePath } from '../../../constants';

export default function InstructorCard(props){
    const { instructor } = props
    return(
        <div className="instructor-card">
            <div className="title-blk">
                <img src={instructor.img} className="profile-img"/>
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
                    <span>{instructor.classes} classes on Letzdance</span>
                </p>
            </div>
        </div>
    )
}