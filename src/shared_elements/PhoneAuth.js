import React, { useState } from 'react'
import { TextField, CircularProgress } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import firebase from '../utils/firebase'
import { fieldValidation } from '../utils/formValidation';
import { regExpression } from '../constants'

export default function PhoneAuth(props){
    const [ Continue, setContinue ] = useState(false)
    const [error, setError] = useState({})
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [loader, setLoader] = useState(false)
    const [verificationId, setVerificationId] = useState("")
    const [resend, setResend] = useState(false)
    const [errorCode] = useState({
        phone: {
            0: '',
            1: 'ENTER YOUR MOBILE NUMBER',
            2: 'ENTER A VALID MOBILE NUMBER',
            3: 'ENTER A VALID MOBILE NUMBER',
            4: 'ENTER A VALID MOBILE NUMBER'
        },
        phoneObj: {
            requiredFlag: true,
            minLength: 5,
            maxLength: 15
        },
        otp: {
            0: '',
            1: 'ENTER YOUR OTP',
            2: 'ENTER A VALID OTP',
            3: 'ENTER A VALID OTP'
        },
        otpObj: {
            requiredFlag: true,
            minLength: 6,
            maxLength: 6
        }
    })
    const handleVerification = () => {
        setLoader(true)
        var appVerifier = new firebase.auth.RecaptchaVerifier(
            "phone-sign-in-recaptcha",
            {
                size: "invisible",
                callback: function (response) {
                //after captacha verification
                },
                "expired-callback": function () {
                //incase captacha verification fails or timeout
                },
            }
        )
        let validateNewInput = {
            phone: errorCode['phone'][fieldValidation({...errorCode['phoneObj'], fieldval: phone})]
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            let phoneNumber = `+${phone}`;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(response => {
                console.log("response signInWithPhoneNumber", response);
                setLoader(false)
                setContinue(true)
                setVerificationId(response.verificationId)
                appVerifier.clear();
            })
            .catch(err => {
                setLoader(false)
                appVerifier.clear();
                if(err.code == 'auth/invalid-phone-number'){
                    setError({'phone': 'ENTER A VALID MOBILE NUMBER'})
                }
                console.log('err signInWithPhoneNumber', err)
            })
        }else{
            setError(validateNewInput)
            setLoader(false)
        }
    }
    const handleOtp = () => {
        setLoader(true)
        let validateNewInput = {
            otp: errorCode['otp'][fieldValidation({...errorCode['otpObj'], fieldval: otp})]
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            var credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp)
            firebase.auth().signInWithCredential(credential)
            .then(res => {
                setLoader(false)
                props.handleSuccess(res)
            })
            .catch(err => {
                setLoader(false)
                // console.log('err phoneAuth', err)
                setError({
                    'otp' : 'WRONG OTP, TRY AGAIN'
                })
            })
        }else{
            setError(validateNewInput)
            setLoader(false)
        }
    }   
    const handleResend = () => {
        setLoader(true)
        var appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container-resend",
            {
              size: "invisible",
              callback: function (response) {
                //after captacha verification
              },
              "expired-callback": function () {
                //incase captacha verification fails or timeout
              },
            }
          );
        if(!error.phone){
            let phoneNumber = `+${phone}`;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(response => {
                console.log("response signInWithPhoneNumber", response);
                setLoader(false)
                setContinue(true)
                setVerificationId(response.verificationId)
            })
            .catch(err => {
                setLoader(false)
                console.log('err signInWithPhoneNumber', err)
            })
        }else{
            setLoader(false)
        }
    }; 
    return(
        <div className="auth-outer-wrapper phone">
            {
                Continue ? <>
                    <h2 className="heading2">Enter 6 digit OTP</h2>
                    <div id="phone-sign-in-recaptcha"></div>
                    <div className="inputGroup">
                        <label className={error.otp ? 'error otp' : ''}>{`${resend ? 'RE-SENT' : 'SENT'} TO ${phone}`}<span>{error.otp ? ` - ${error.otp}`: ''}</span></label>
                        <TextField 
                            value={otp}
                            onChange={(e) => {setOtp(e.target.value); setError({'otp': ''})}}
                            error={error.otp ? true : false}
                            placeholder="6 digit OTP"
                            type="number"
                        />
                        {loader ? <CircularProgress className="loader"/> : null}
                    </div>
                    <div id="recaptcha-container-resend"></div>
                    <p className="paragraph info">Didn’t receive OTP? <span onClick={() => {handleResend(); setResend(true)}}> Click here to resend</span></p>
                </> : <>
                    <h2 className="heading2">{loader ? 'Requesting OTP...' : 'Continue with mobile number'}</h2>
                    <div className="inputGroup">
                        <label className={error.phone ? 'error': ''}>{error.phone ? error.phone: 'YOUR MOBILE NUMBER'}</label>
                        <PhoneInput
                            // isValid={(inputNumber, country, countries) => {
                            //     console.log('isValid', [inputNumber, country])
                            // }}
                            country={'in'}
                            disableSearchIcon={true}
                            value={phone}
                            disabled={loader}
                            onChange={phone => {setPhone(phone); setError({'phone': ''})}}
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
                        {loader ? <CircularProgress className="loader"/> : null}
                    </div>
                    <div id="phone-sign-in-recaptcha"></div>
                    <p className="paragraph info">You’ll get an OTP to verify your number</p>
                </>
            }
            <ul className="listInline footer">
                <li><p><a className={`secondaryBtn ${loader ? 'disabled': ''}`} onClick={() => {props.handleBack(); setPhone('');setOtp('');setError({})}}>BACK</a></p></li>
                <li><p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={() => Continue ? handleOtp(): handleVerification()}>{Continue ? 'LOGIN' : 'CONTINUE'}</a></p></li>
            </ul>
        </div>
    )
}