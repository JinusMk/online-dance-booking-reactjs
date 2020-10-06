import React from 'react'
import { imageBasePath } from '../constants';

export default function Header(props){
    const { onBack, title } = props
    return(<header>
        {title ? <h3 className="heading2">{title}</h3>: <img className="logo" src={`${imageBasePath}app_logo.svg`} />}
        {onBack ? <img className="back-arrow" src={`${imageBasePath}arrow_back_icon.svg`} onClick={onBack}/> : null}
    </header>)
}