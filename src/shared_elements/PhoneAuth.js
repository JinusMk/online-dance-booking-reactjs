import React, { useState } from 'react'
import { TextField, CircularProgress } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import firebase from '../utils/firebase'

export default function PhoneAuth(props){
    const [ Continue, setContinue ] = useState(false)
    const [error, setError] = useState({})
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [loader, setLoader] = useState(false)
    const [verificationId, setVerificationId] = useState("")
    const [resend, setResend] = useState(false)

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
        if(phone && phone.length > 5 && phone.length < 15){
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
                    setError({'phone': 'INVALID MOBILE NUMBER'})
                }
                console.log('err signInWithPhoneNumber', err)
            })
        }else{
            setError({'phone': 'INVALID MOBILE NUMBER'})
            setLoader(false)
        }
    }
    const handleOtp = () => {
        setLoader(true)
        var credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp)
        firebase.auth().signInWithCredential(credential)
        .then(res => {
            setLoader(false)
            console.log("res phoneAuth", res)
            localStorage.setItem('userInfo', res)
            props.handleSuccess()
        })
        .catch(err => {
            setLoader(false)
            console.log('err phoneAuth', err)
            setError({
                'otp' : 'WRONG OTP, TRY AGAIN'
            })
        })
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
        <div className="phone-auth-wrapper">
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
                            placeholder="Your phone number"
                            inputProps={
                                {
                                    required: true,
                                    className: error.phone ? 'error' : ''
                                }
                            }
                            searchPlaceholder="Search countries"
                            enableSearch={true}
                        />
                        {loader ? <CircularProgress className="loader"/> : null}
                    </div>
                    <div id="phone-sign-in-recaptcha"></div>
                    <p className="paragraph info">You’ll get an OTP to verify your number</p>
                </>
            }
            <ul className="listInline footer">
                <li><p><a className={`secondaryBtn ${loader ? 'disabled': ''}`} onClick={() => {props.handleBack(); setPhone(''); setError({})}}>BACK</a></p></li>
                <li><p><a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={() => Continue ? handleOtp(): handleVerification()}>{Continue ? 'LOGIN' : 'CONTINUE'}</a></p></li>
            </ul>
        </div>
    )
}