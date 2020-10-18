import React from 'react'

export default function AuthVerifyBlock(props){
    const { type, handleClick } = props
    return(
        <div className="auth-verify-wrapper">
            <h3 className="heading3">{`Verify your ${type}`}</h3>
            <p className="paragraph">Make sure it’s verified so that the class link can be sent to you</p>
            <p><a onClick={handleClick} className="primaryBtn">VERIFY NOW</a></p>
        </div>
    )
}