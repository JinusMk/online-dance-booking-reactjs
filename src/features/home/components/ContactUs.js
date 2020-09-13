import React from 'react'
import { List, ListItem } from '@material-ui/core';

export default function ContactUs(props){
    return(<div className="contact-us-blk">
        <ul className="textCenter listInline">
            <li>
                <a><img src={require('../../../assets/images/fb_logo.svg')}/></a>
            </li>
            <li>
                <a><img src={require('../../../assets/images/insta_logo.svg')}/></a>
            </li>
        </ul>
        <p className="paragraph">© Letzdance | Privacy Policy and T&C</p>
    </div>)
}