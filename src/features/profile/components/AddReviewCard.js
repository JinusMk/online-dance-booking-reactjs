import React from 'react'
import { Link } from 'react-router-dom'

export default function AddReviewCard(props){
    const { category, danceId } = props
    return(
        <div className="add-review-card-wrapper">
            <h3 className="heading3">How was your dance experience? </h3>
            <p><Link to={{pathname: `/dance/${category}/${danceId}/review`, state: { prevPath: `/dance/${category}/${danceId}`}}} className="secondaryBtn">ADD A REVIEW</Link></p>
        </div>
    )
}