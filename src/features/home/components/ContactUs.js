import React from 'react'
import { List, ListItem } from '@material-ui/core';
import { imageBasePath } from '../../../constants'

export default function ContactUs(props){
    return(<div className="contact-us-blk">
        <ul className="textCenter listInline">
            <li>
                <a target="__blank" href="https://www.facebook.com/Letzdance.co"><img src={`${imageBasePath}fb_logo.svg`}/></a>
            </li>
            <li>
                <a target="__blank" href="https://www.instagram.com/letzdance.co/"><img src={`${imageBasePath}insta_logo.svg`}/></a>
            </li>
        </ul>
        <p className="paragraph">© Letzdance | Privacy Policy and T&C</p>
    </div>)
}