import React from 'react'
import { Avatar } from '@material-ui/core';

export default function LoggedInUserInfo(props){
    const { user, loader } = props
    return(
        <div className="logged-in-user-wrapper">
            <p className="secondaryText">LOGGED IN AS</p>
            <div className="user-profile flexCentered">
                {user.photoURL ? <Avatar className="user-avatar" src={user.photoURL} /> : <Avatar className="user-avatar">{user.displayName ? user.displayName[0] : user.email ? user.email[0]: 'L'}</Avatar>}
                <div>
                    <h3 className="heading3 displayName" style={user.displayName ? {textTransform: 'capitalize'} : {}}>{user.displayName ? user.displayName : user.email ? user.email : user.phoneNumber ? user.phoneNumber : ''}</h3>
                    <p className="logout-link"><a onClick={props.logout}>Not you? Tap here to logout</a></p>
                </div>
            </div>
            <div className="booking-fixed-footer">
                    <p><a onClick={props.handleSubmit} className={`primaryBtn ${loader  ? 'disabled' : ''}`} >CONTINUE</a></p>
            </div>
        </div>
    )
}