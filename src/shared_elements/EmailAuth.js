import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import firebase from '../utils/firebase'
import { fieldValidation } from '../utils/formValidation';
import { regExpression } from '../constants'
import { toastFlashMessage } from '../utils';

export default function EmailAuth(props){
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
    const [signUpFlag, setSignUpFlag] = useState(false)
    const [errorCode] = useState({
        email: {
            0: '',
            1: 'ENTER YOUR EMAIL',
            4: 'ENTER A VALID EMAIL'
        },
        emailObj: {
            requiredFlag: true,
            regexPattern: regExpression.email
        },
        password: {
            0: '',
            1: 'ENTER YOUR PASSWORD'
        },
        passwordObj: {
            requiredFlag: true
        }
    })
    const [userInfo, setUserInfo] = useState({ email: '', password: '', displayName: ''})
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
            displayName: '',
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            if(signUpFlag){
                firebase.auth().createUserWithEmailAndPassword(userInfo.email.trim(), userInfo.password)
                .then(response => {
                    setLoader(false)
                    console.log("res emailAuth signup", response)
                    props.handleSuccess(response)
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
            <h2 className="heading2">{signUpFlag ? 'Register' : 'Login'}</h2>  
            {/* {signUpFlag ? <div className="inputGroup">
                <label className={error.displayName ? 'error': ''}>{error.displayName ? error.displayName : 'DISPLAY NAME'}</label>
                <TextField 
                    value={userInfo.displayName}
                    onChange={(e) => handleChange('displayName', e.target.value)}
                    placeholder="Your display name"
                    type="email"
                    error={error.displayName}
                />
            </div> : null
            } */}
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
            <div className="signup-link">
                <p className="paragraph"><a onClick={() => setSignUpFlag(!signUpFlag)}>{signUpFlag ? `ALready have an acoount ? Login now`: `Don't have an account ? Register now`}</a></p>
            </div>
            <ul className="listInline footer">
                <li><p><a className={`secondaryBtn ${loader ? 'disabled': ''}`} onClick={() => {props.handleBack(); setUserInfo({email: '', password: ''}); setError({})}}>BACK</a></p></li>
                <li><p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={handleSubmit}>{signUpFlag ? 'REGISTER' : 'LOGIN'}</a></p></li>
            </ul>
        </div>
    )
}