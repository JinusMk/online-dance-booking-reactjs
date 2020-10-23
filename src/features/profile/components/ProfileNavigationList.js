import React from 'react'
import { Link } from 'react-router-dom'
import { imageBasePath } from '../../../constants';

export default function ProfileNavigationList(props){
    return(
        <ul className="listUnstyled links">
            <li className={props.isLoggedIn ? '' : 'disabled'}>
                <p><Link to="/dance-history" className="heading2">Dance history</Link></p>
                <img src={`${imageBasePath}right_arrow_icon.svg`} className="arrow"/>
            </li>
            <li className="">
                <p><Link to="/help" className="heading2">Help</Link></p>
                <img src={`${imageBasePath}right_arrow_icon.svg`} className="arrow"/>
            </li>
            {props.isLoggedIn ? <li className="">
                <p><a onClick={props.logout} className="heading2">Logout</a></p>
                <img src={`${imageBasePath}right_arrow_icon.svg`} className="arrow"/>
            </li> : null
            }
        </ul>
    )
}