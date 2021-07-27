import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { fieldValidation } from '../../../utils/formValidation';
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils';
import { USER_AUTH_ERRORCODE } from '../../../constants'
// import { globalPostService } from '../../../utils/globalApiServices';

export default function UserInformationForm(props){
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
    const [formWidth, setFormWidth] = useState(0)
    const [showPassword, setShowPassword] = useState(false)
    const [errorCode] = useState(USER_AUTH_ERRORCODE)
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
            name: errorCode['name'][fieldValidation({...errorCode['nameObj'], fieldval: userInfo.name})],
            email: errorCode['email'][fieldValidation({...errorCode['emailObj'], fieldval: userInfo.email})],
            password: errorCode['password'][fieldValidation({...errorCode['passwordObj'], fieldval: userInfo.password})],
            phone: errorCode['phone'][fieldValidation({...errorCode['phoneObj'], fieldval: userInfo.phone})],
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            firebase.auth().createUserWithEmailAndPassword(userInfo.email.trim(), userInfo.password)
            .then(response => {
                setLoader(false)
                // console.log("res booking signup", response)
                if(response.user){
                    response.user.updateProfile({
                        displayName: userInfo.name,
                        // phoneNumber: userInfo.phone
                    }).then((s)=> { 
                        props.handleSubmit({...response.user, phoneNumber: userInfo.phone, displayName: userInfo.name})
                    })
                }
            })
            .catch(error => {
                setLoader(false)
                if(error.message){
                    toastFlashMessage(error.message, 'error')
                    props.handleOpenAuth()
                }
            })
        }else{
            setLoader(false)
            setError(validateNewInput)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            getClientWidth()
        }, 500);
    }, [])
    const getClientWidth = () => {
        const width = document.getElementById('user-form')?.clientWidth
        setFormWidth(width)
    }
    return(
        <div className="user-information-form-wrapper" id="user-form">
            <div className="form-title">
                <h3 className="heading3">Enter your details</h3>
                <p className="paragraph">Your account will be automatically created on Letzdance</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={'inputGroup'}>
                    <label className={error.name ? 'error': ''}>{error.name ? error.name : "YOUR NAME"}</label>
                    <TextField 
                        value={userInfo.name}
                        onChange={(e) => handleChange('name',e.target.value)}
                        error={error.name ? true : false}
                        placeholder="Your name"
                    />
                </div>
                <div className={'inputGroup'}>
                    <label className={error.email ? 'error': ''}>{error.email ? error.email : 'YOUR EMAIL'}</label>
                    <TextField 
                        value={userInfo.email}
                        onChange={(e) => handleChange('email',e.target.value)}
                        error={error.email ? true : false}
                        placeholder="Your email address"
                    />
                </div>
                <div className="inputGroup">
                    <label className={error.password ? 'error': ''}>{error.password ? error.password : 'CREATE PASSWORD'}</label>
                    <TextField 
                        value={userInfo.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="Your password"
                        type={showPassword ? 'text' : 'password'}
                        error={error.password ? true : false}
                        required
                    />
                </div>
                <div className="inputGroup" style={{marginBottom: 0}}>
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
                <div className="booking-fixed-footer" style={{maxWidth: formWidth ? formWidth : '100%'}}>
                    <p><a onClick={handleSubmit} className={`primaryBtn ${(loader || !(userInfo.name && userInfo.password && userInfo.email && userInfo.phone) || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} >CONTINUE</a></p>
                </div>
            </form>
        </div>
    )
}