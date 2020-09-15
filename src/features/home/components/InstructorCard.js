import React from 'react'

export default function InstructorCard(props){
    const { instructor } = props
    return(
        <div className="instructor-card">
            <div className="title-blk">
                <img src={instructor.img} className="profile-img"/>
                <h3 className="heading3">{instructor.name}</h3>
                <p className="heading3 rating">
                    <img src={require('../../../assets/images/star_icon.svg')} />
                    <span>{instructor.rating}</span>
                    <span className="rating">({instructor.ratingCount} RATINGS)</span>
                </p>
            </div>
            <div className="info-blk">
                <p className="paragraph">
                    <img src={require('../../../assets/images/expert_icon.svg')}/>
                    <span>{instructor.expert}</span>
                </p>
                <p className="paragraph">
                    <img src={require('../../../assets/images/experience_icon.svg')}/>
                    <span>{instructor.experience} experience</span>
                </p>
                <p className="paragraph">
                    <span className="live">LIVE</span>
                    <span>{instructor.classes} classes on Letzdance</span>
                </p>
            </div>
        </div>
    )
}