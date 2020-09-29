import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function PhoneAuth(props){
    const [ Continue, setContinue ] = useState(false)
    const [error, setError] = useState({})
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    return(
        <div className="phone-auth-wrapper">
            {
                Continue ? <>
                    <h2 className="heading2">Enter 6 digit OTP</h2>
                    <div className="inputGroup">
                        <label className={error.otp ? 'error' : ''}>sent to {phone}</label>
                        <TextField 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            error={error.otp ? true : false}
                            placeholder="6 digit OTP"
                            type="number"
                        />
                    </div>
                </> : <>
                    <h2 className="heading2">Continue with mobile number</h2>
                    <div className="inputGroup">
                        <label className={error.phone ? 'error': ''}>{error.phone ? error.phone: 'YOUR PHONE NUMBER'}</label>
                        <PhoneInput
                            country={'in'}
                            disableSearchIcon={true}
                            value={phone}
                            onChange={phone => setPhone(phone)}
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
                    </div>
                    <p className="paragraph info">You’ll get an OTP to verify your number</p>
                </>
            }
            <ul className="listInline footer">
                <li><p><a className="secondaryBtn" onClick={() => Continue ? setContinue(false) : props.handleBack()}>BACK</a></p></li>
                <li><p><a className="primaryBtn">{Continue ? 'LOGIN' : 'CONTINUE'}</a></p></li>
            </ul>
        </div>
    )
}