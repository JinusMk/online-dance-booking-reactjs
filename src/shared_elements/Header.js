import React from 'react'

export default function Header(props){
    const { onBack, title } = props
    return(<header>
        {title ? <h3 className="heading2">{title}</h3>: <img className="logo" src={require('../assets/images/logo.svg')} />}
        {onBack ? <img className="back-arrow" src={require('../assets/images/arrow_back_icon.svg')} onClick={onBack}/> : null}
    </header>)
}