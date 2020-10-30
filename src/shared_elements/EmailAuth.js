import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import firebase from '../utils/firebase'
import { fieldValidation } from '../utils/formValidation';
import PhoneInput from 'react-phone-input-2'
import { USER_AUTH_ERRORCODE } from '../constants'
import { toastFlashMessage } from '../utils';
import 'react-phone-input-2/lib/style.css'

export default function EmailAuth(props){
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
    const [registerFlag, setRegisterFlag] = useState(false)
    const [errorCode] = useState(USER_AUTH_ERRORCODE)
    const [userInfo, setUserInfo] = useState({ email: '', password: '', name: '', phone: ''})
    const [showPassword, setShowPassword] = useState(false)
    const handleChange = (key, val) => {
        setUserInfo({
            ...userInfo,
            [key] : val
        })
        setError({
            ...error,
            [key]: ''
        })
    }
    const handleSubmit = () => {
        setLoader(true)
        let validateNewInput = {
            email: errorCode['email'][fieldValidation({...errorCode['emailObj'], fieldval: userInfo.email})],
            password: errorCode['password'][fieldValidation({...errorCode['passwordObj'], fieldval: userInfo.password})],
            name: registerFlag ? errorCode['name'][fieldValidation({...errorCode['nameObj'], fieldval: userInfo.name})]:'',
            // phone: registerFlag ? errorCode['phone'][fieldValidation({...errorCode['phoneObj'], fieldval: userInfo.phone})]:'',
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            if(registerFlag){
                firebase.auth().createUserWithEmailAndPassword(userInfo.email.trim(), userInfo.password)
                .then(response => {
                    setLoader(false)
                    // console.log("res emailAuth signup", response)
                    if(response.user){
                        response.user.updateProfile({
                          displayName: userInfo.name,
                        //   phoneNumber: userInfo.phone
                        }).then((s)=> {
                            props.handleSuccess(response)   
                        })
                      }
                })
                .catch(error => {
                    setLoader(false)
                    if(error.message){
                        toastFlashMessage(error.message, 'error')
                    }
                })
            }else{
                firebase.auth().signInWithEmailAndPassword(userInfo.email.trim(), userInfo.password)
                .then(response => {
                    setLoader(false)
                    console.log("res emailAuth signin", response)
                    props.handleSuccess(response)
                })
                .catch(error => {
                    setLoader(false)
                    if(error.message){
                        toastFlashMessage(error.message, 'error')
                    }
                })
            }
        }else{
            setError(validateNewInput)
            setLoader(false)
        }
    }
    return(
        <div className="auth-outer-wrapper email">
            <h2 className="heading2">{registerFlag ? 'Register' : 'Login'}</h2>  
            {registerFlag ? <div className="inputGroup">
                <label className={error.name ? 'error': ''}>{error.name ? error.name : 'YOUR NAME'}</label>
                <TextField 
                    value={userInfo.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    error={error.name}
                />
            </div> : null
            }
            <div className="inputGroup">
                <label className={error.email ? 'error': ''}>{error.email ? error.email : 'EMAIL'}</label>
                <TextField 
                    value={userInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Your email"
                    type="email"
                    error={error.email}
                    required
                />
            </div>
            <div className="inputGroup">
                <label className={error.password ? 'error': ''}>{error.password ? error.password : 'PASSWORD'}</label>
                <TextField 
                    value={userInfo.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Your password"
                    type={showPassword ? 'text' : 'password'}
                    error={error.password}
                    required
                />
            </div>
            {/* {registerFlag ? <div className="inputGroup">
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
            </div> : null} */}
            <div className="signup-link">
                <p className="paragraph"><a onClick={() => setRegisterFlag(!registerFlag)}>{registerFlag ? `Already have an acoount ? Login now`: `Don't have an account ? Register now`}</a></p>
            </div>
            <ul className="listInline footer">
                <li><p><a className={`secondaryBtn ${loader ? 'disabled': ''}`} onClick={() => {props.handleBack(); setUserInfo({email: '', password: ''}); setError({})}}>BACK</a></p></li>
                <li><p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={handleSubmit}>{registerFlag ? 'REGISTER' : 'LOGIN'}</a></p></li>
            </ul>
        </div>
    )
}