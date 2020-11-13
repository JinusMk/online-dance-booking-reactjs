import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import firebase from '../utils/firebase'
import { fieldValidation } from '../utils/formValidation';
// import PhoneInput from 'react-phone-input-2'
import { USER_AUTH_ERRORCODE } from '../constants'
import { toastFlashMessage } from '../utils';
import 'react-phone-input-2/lib/style.css'
import { useLocation, useHistory } from 'react-router-dom'

export default function EmailAuth(props){
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
    const [registerFlag, setRegisterFlag] = useState(false)
    const [errorCode] = useState(USER_AUTH_ERRORCODE)
    const [userInfo, setUserInfo] = useState({ email: '', password: '', name: '', phone: ''})
    const [showPassword, setShowPassword] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [authCode, setAuthCode] = useState('')

    let location = useLocation()
    let history = useHistory()

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
    useEffect(() => {
        if(props.type == "resetPassword"){
            const query = new URLSearchParams(location.search);
            setAuthCode(query.get('oobCode') ? query.get('oobCode') : '')
            setResetPassword(true)
        }
    }, [props.type])
    const handleSubmit = () => {
        setLoader(true)
        let validateNewInput = {
            email: resetPassword ? '' : errorCode['email'][fieldValidation({...errorCode['emailObj'], fieldval: userInfo.email})],
            password: forgotPassword ? '' : errorCode['password'][fieldValidation({...errorCode['passwordObj'], fieldval: userInfo.password})],
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
            }else if(forgotPassword){
                var actionCodeSettings = {
                    url: `https://www.letzdance.co/email=${userInfo.email}`,
                    handleCodeInApp: true
                  };
                  firebase.auth().sendPasswordResetEmail(
                      userInfo.email, actionCodeSettings)
                      .then(function() {
                        // Password reset email sent.
                        setLoader(false)
                        toastFlashMessage(`Password reset email sent`, 'success')
                        props.handleSuccess('forgot-password')
                      })
                      .catch(function(error) {
                        // Error occurred. Inspect error.code.
                        setLoader(false)
                        if(error.message){
                            toastFlashMessage(error.message, 'error')
                        }
                      });
            }else if(resetPassword){
                firebase.auth().confirmPasswordReset( authCode, userInfo.password)
                .then(response => {
                    const query = new URLSearchParams(location.search);
                    setUserInfo({
                        ...userInfo,
                        email: query.get('continueUrl') ? query.get('continueUrl').slice(31) : ''
                    })
                    setResetPassword(false)
                    setLoader(false)
                    toastFlashMessage(`Password has been reset successfully, please login now`, 'success')
                })
                .catch(function(error) {
                    // Error occurred. Inspect error.code.
                    setLoader(false)
                    if(error.message){
                        toastFlashMessage(error.message, 'error')
                    }
                  });
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
    const handleForgotPassword = () => {
        setForgotPassword(true)
        setError({})
        setUserInfo({email: '', password: '', name: '', phone: ''})
    }
    const handleBack = () => {
        if(resetPassword){
            setResetPassword(false)
            history.push(`/profile`)
        }else if(forgotPassword){
            setForgotPassword(false)
        }else{
            props.handleBack()
        }
        setUserInfo({email: '', password: '', name: '', phone: ''})
        setError({})
    }
    return(
        <div className="auth-outer-wrapper email">
            <h2 className="heading2">{resetPassword ? 'Reset password' : forgotPassword ? 'Forgot password' : registerFlag ? 'Register' : 'Login'}</h2>  
            {resetPassword ? <>
                <div className="inputGroup">
                    <label className={error.password ? 'error': ''}>{error.password ? error.password : 'PASSWORD'}</label>
                    <TextField 
                        value={userInfo.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="Your password"
                        type={showPassword ? 'text' : 'password'}
                        error={error.password ? true : false}
                        required
                    />
                </div>
            </> : forgotPassword ? <>
                <div className="inputGroup">
                    <label className={error.email ? 'error': ''}>{error.email ? error.email : 'YOUR EMAIL'}</label>
                    <TextField 
                        value={userInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Your email"
                        type="email"
                        error={error.email ? true : false}
                        required
                    />
                </div>
                <div className="signup-link">
                    <p className="paragraph">We’ll send you a link to reset your password.</p>
                </div>
            </> : <>
                {registerFlag ? <div className="inputGroup">
                    <label className={error.name ? 'error': ''}>{error.name ? error.name : 'YOUR NAME'}</label>
                    <TextField 
                        value={userInfo.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Your name"
                        error={error.name ? true : false}
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
                        error={error.email ? true : false}
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
                        error={error.password ? true: false}
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
                    <p className="paragraph"><a onClick={() => {setRegisterFlag(!registerFlag); setError({}); setUserInfo({email: '', password: '', name: '', phone: ''})}}>{registerFlag ? `Already have an acoount ? Login now`: `Don't have an account ? Register now`}</a>
                    {
                        registerFlag ? null : <a onClick={handleForgotPassword} style={{float: 'right'}}>Forgot password ?</a>
                    }
                    </p>
                </div>
            </>}
            <ul className="listInline footer">
                <li><p><a className={`secondaryBtn ${loader ? 'disabled': ''}`} onClick={handleBack}>BACK</a></p></li>
                <li><p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={handleSubmit}>{resetPassword ? 'SUBMIT' : forgotPassword ? 'SUBMIT' : registerFlag ? 'REGISTER' : 'LOGIN'}</a></p></li>
            </ul>
        </div>
    )
}