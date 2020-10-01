import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import firebase from '../utils/firebase'
import { fieldValidation } from '../utils/formValidation';
import { regExpression } from '../constants'

export default function EmailAuth(props){
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
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
    const [userInfo, setUserInfo] = useState({ email: '', password: '' })
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
            password: errorCode['password'][fieldValidation({...errorCode['passwordObj'], fieldval: userInfo.password})]
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
            .then(response => {
                setLoader(false)
                console.log("res emailAuth", response)
                props.handleSuccess(response)
            })
            .catch(err => {
                setLoader(false)
            })
        }else{
            setError(validateNewInput)
            setLoader(false)
        }
    }
    return(
        <div className="auth-outer-wrapper email">
            <h2 className="heading2">Login</h2>  
            <div className="inputGroup">
                <label className={error.email ? 'error': ''}>{error.email ? error.email : 'EMAIL'}</label>
                <TextField 
                    value={userInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Your email"
                    type="email"
                    error={error.email}
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
                />
            </div>
            <ul className="listInline footer">
                <li><p><a className={`secondaryBtn ${loader ? 'disabled': ''}`} onClick={() => {props.handleBack(); setUserInfo({email: '', password: ''}); setError({})}}>BACK</a></p></li>
                <li><p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={handleSubmit}>{'LOGIN'}</a></p></li>
            </ul>
        </div>
    )
}