import React from 'react'

export default function Header(props){
    const { type, onBack, title } = props
    return(<header>
        {type == "home" ? <img className="logo" src={require('../assets/images/logo.svg')} /> : title ? <h3 className="heading2">{title}</h3>: null}
        {onBack ? <img className="back-arrow" src={require('../assets/images/arrow_back_icon.svg')} onClick={onBack}/> : null}
    </header>)
}