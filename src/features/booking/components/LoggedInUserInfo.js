import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core';

export default function LoggedInUserInfo(props){
    const { user, loader } = props
    const [clientWidth, setClientWidth] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            getClientWidth()
        }, 500);
    }, [])
    const getClientWidth = () => {
        const width = document.getElementById('user-info').clientWidth
        setClientWidth(width)
    }
    return(
        <div className="logged-in-user-wrapper" id="user-info">
            <p className="secondaryText">LOGGED IN AS</p>
            <div className="user-profile flexCentered">
                {user.photoURL ? <Avatar className="user-avatar" src={user.photoURL} /> : <Avatar className="user-avatar">{user.displayName ? user.displayName[0] : user.email ? user.email[0]: 'L'}</Avatar>}
                <div>
                    <h3 className="heading3 displayName" style={user.displayName ? {textTransform: 'capitalize'} : {}}>{user.displayName ? user.displayName : user.email ? user.email : user.phoneNumber ? user.phoneNumber : ''}</h3>
                    <p className="logout-link"><a onClick={props.logout}>Not you? Tap here to logout</a></p>
                </div>
            </div>
            <div className="booking-fixed-footer" style={{maxWidth: clientWidth ? clientWidth: '100%'}}>
                    <p><a onClick={props.handleSubmit} className={`primaryBtn ${loader  ? 'disabled' : ''}`} >CONTINUE</a></p>
            </div>
        </div>
    )
}