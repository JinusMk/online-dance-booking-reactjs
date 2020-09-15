import React from 'react'
import { Link } from 'react-router-dom'

export default function TimeSlots(props){
    return(
        <div className="time-slots block">
            <div className="see-all-blk">
                <h3 className="heading3">Timings don’t suit you? </h3>
                <p className="paragraph">Explore all dance options available on Letzdance</p>
                <p><Link to="/schedule" className="secondaryBtn">SEE ALL DANCE TYPES</Link></p>
            </div>
        </div>
    )
}