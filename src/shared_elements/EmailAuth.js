import React, { useState } from 'react'
import { TextField } from '@material-ui/core';

export default function EmailAuth(props){
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
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

    }
    return(
        <div className="email-auth-wrapper">
            <h2 className="heading2">Login</h2>  
            <div className="inputGroup">
                <label className={error.email ? 'error': ''}>EMAIL</label>
                <TextField 
                    value={userInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Your email"
                    type="email"
                />
            </div>
            <div className="inputGroup">
                <label className={error.email ? 'error': ''}>EMAIL</label>
                <TextField 
                    value={userInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Your email"
                    type={showPassword ? 'text' : 'password'}
                />
            </div>
        </div>
    )
}