import React, { useState, useEffect } from 'react'
import { Avatar, TextField } from '@material-ui/core';
import firebase from '../../../utils/firebase'
import { fieldValidation } from '../../../utils/formValidation';
import { USER_AUTH_ERRORCODE } from '../../../constants'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toastFlashMessage } from '../../../utils';

export default function LoggedInUserInfo(props){
    const { user } = props
    const [clientWidth, setClientWidth] = useState(0)
    const [userInfo, setUserInfo] = useState({})
    const [error, setError] = useState({})
    const [errorCode] = useState(USER_AUTH_ERRORCODE)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            getClientWidth()
        }, 500);
        setLoader(false)
        setError({})
        setUserInfo({
            name: user.displayName ? user.displayName : '',
            email: user.email ? user.email : '',
            phone: user.phoneNumber ? user.phoneNumber : ''
        })
    }, [props.user.displayName, props.user.email, props.user.phoneNumber])
    const getClientWidth = () => {
        const width = document.getElementById('user-info') ? document.getElementById('user-info').clientWidth : 0
        setClientWidth(width)
    }
    const handleChange = (key, val) => {
        setUserInfo({
            ...userInfo,
            [key]: val
        })
        setError({
            ...error,
            [key]: ''
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        let validateNewInput = {
            name: user.displayName ? '' : errorCode['name'][fieldValidation({...errorCode['nameObj'], fieldval: userInfo.name})],
            email: user.email ? '' : errorCode['email'][fieldValidation({...errorCode['emailObj'], fieldval: userInfo.email})],
            phone: user.phoneNumber ? '' : errorCode['phone'][fieldValidation({...errorCode['phoneObj'], fieldval: userInfo.phone})],
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            if(user.displayName && user.email && user.phoneNumber){
                props.handleSubmit()
            }else{
                let promise1 = firebase.auth().currentUser.updateProfile({
                    displayName: userInfo.name
                })
                let promise2 = firebase.auth().currentUser.updateEmail(userInfo.email)
                Promise.all([promise1, promise2])
                .then((values) => {
                    setLoader(false)
                    props.handleSubmit({...user, displayName: user.displayName ? user.displayName: userInfo.name, phoneNumber: userInfo.phone, email: user.email ? user.email : userInfo.email})
                })
                .catch(error => {
                    if(error.message){
                        toastFlashMessage(`${error.message}`, 'error')
                    }
                })
            }
        }else{
            setLoader(false)
            setError(validateNewInput)
        }
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
            {
                (user.displayName && user.email && user.phoneNumber) ? null : <form onSubmit={handleSubmit}>
                    <div className="form-title">
                        <h3 className="heading3">We need some more details</h3>
                        <p className="paragraph">Details needed so that the class link can be sent to you</p>
                    </div>
                    {user.displayName ? null : <div className={'inputGroup'}>
                        <label className={error.name ? 'error': ''}>{error.name ? error.name : "YOUR NAME"}</label>
                        <TextField 
                            value={userInfo.name}
                            onChange={(e) => handleChange('name',e.target.value)}
                            error={error.name ? true : false}
                            placeholder="Your name"
                        />
                    </div>
                    }
                    {user.email ? null : <div className={'inputGroup'}>
                        <label className={error.email ? 'error': ''}>{error.email ? error.email : 'YOUR EMAIL'}</label>
                        <TextField 
                            value={userInfo.email}
                            onChange={(e) => handleChange('email',e.target.value)}
                            error={error.email ? true : false}
                            placeholder="Your email address"
                        />
                    </div>
                    }
                    {user.phoneNumber ? null : <div className="inputGroup">
                        <label className={error.phone ? 'error': ''}>{error.phone ? error.phone: 'YOUR MOBILE NUMBER'}</label>
                        <PhoneInput
                            country={'in'}
                            disableSearchIcon={true}
                            value={userInfo.phone}
                            onChange={phone => handleChange('phone', phone)}
                            preferredCountries={['in', 'ae', 'sg']}
                            placeholder="Your mobile number"
                            inputProps={
                                {
                                    required: true,
                                    className: error.phone ? 'error' : ''
                                }
                            }
                            searchPlaceholder="Search countries"
                            enableSearch={true}
                            isValid={error.phone ? false : true}
                        />
                    </div>
                    }
                </form>
            }
            <div className="booking-fixed-footer" style={{maxWidth: clientWidth ? clientWidth: '100%'}}>
                    <p><a onClick={handleSubmit} className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '') || !(userInfo.name && userInfo.email && userInfo.phone))  ? 'disabled' : ''}`} >CONTINUE</a></p>
            </div>
        </div>
    )
}