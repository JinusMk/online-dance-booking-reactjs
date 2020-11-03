import React from 'react'
import { imageBasePath } from '../../../constants'
import { useHistory, useLocation } from 'react-router-dom'

export default function ContactUs(props){
    let history = useHistory()
    let location = useLocation()
    const handleClick = () => {
        if(location.pathname != '/privacy-policy'){
            history.push({
                pathname: '/privacy-policy',
                state: { goBackPage: `${location.pathname}` }
            })
        }
    }
    return(
    <div className="contact-us-blk">
        <ul className="textCenter listInline">
            <li>
                <a target="__blank" href="https://www.facebook.com/Letzdance.co"><img src={`${imageBasePath}fb_logo.svg`}/></a>
            </li>
            <li>
                <a target="__blank" href="https://www.instagram.com/letzdance.co/"><img src={`${imageBasePath}insta_logo.svg`}/></a>
            </li>
            <li>
                <a target="__blank" href="https://www.youtube.com/channel/UCqaZ4SR-Z7isiCQ9hk1bekw/"><img src={`${imageBasePath}youtube_logo.svg`}/></a>
            </li>
        </ul>
        <p className="paragraph">© Letzdance | <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={handleClick}>Privacy Policy and T&C</span></p>
    </div>)
}