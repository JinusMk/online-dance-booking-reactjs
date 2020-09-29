import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function UserInformationForm(props){
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [error, setError] = useState({})
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
    }
    return(
        <div className="user-information-form-wrapper">
            <div className="form-title">
                <h3 className="heading3">Or, enter your details</h3>
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
                    <label className={error.phone ? 'error': ''}>{error.phone ? error.phone: 'YOUR PHONE NUMBER'}</label>
                    <PhoneInput
                        country={'in'}
                        disableSearchIcon={true}
                        value={userInfo.phone}
                        onChange={phone => handleChange('phone', phone)}
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
            </form>
        </div>
    )
}