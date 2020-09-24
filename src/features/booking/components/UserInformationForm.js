import React, { useState } from 'react'
import { TextField } from '@material-ui/core';

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
                    <label className={error.name ? 'error': ''}>YOUR NAME</label>
                    <TextField 
                        value={userInfo.name}
                        onChange={(e) => handleChange('name',e.target.value)}
                        error={error.name ? true : false}
                        placeholder="Your name"
                    />
                </div>
                <div className={'inputGroup'}>
                    <label className={error.email ? 'error': ''}>YOUR EMAIL</label>
                    <TextField 
                        value={userInfo.email}
                        onChange={(e) => handleChange('email',e.target.value)}
                        error={error.email ? true : false}
                        placeholder="Your email address"
                    />
                </div>
            </form>
        </div>
    )
}