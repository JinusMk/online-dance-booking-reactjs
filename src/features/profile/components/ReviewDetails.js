import React from 'react'
import { imageBasePath } from '../../../constants';

export default function ReviewDetails(props){
    const { review } = props
    return(
        <div className="review-detail">
            <p className="secondaryText">YOUR RATING</p>
            <h3 className="rating heading3">
                <img src={`${imageBasePath}star_icon.svg`}/>
                <span>{review?.danceRating}</span>
            </h3>
            {
                review?.description ? <p className="paragraph description">{review.description}</p> : null
            }
        </div>
    )
}