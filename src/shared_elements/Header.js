import React from 'react'

export default function Header(props){
    const { type } = props
    return(<header>
        {type == "home" ? <img className="logo" src={require('../assets/images/logo.svg')} /> : null}
    </header>)
}