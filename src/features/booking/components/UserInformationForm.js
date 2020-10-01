import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { fieldValidation } from '../../../utils/formValidation';
import { regExpression } from '../../../constants'

export default function UserInformationForm(props){
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({})
    const [errorCode] = useState({
        name: {
            0: '',
            1: 'ENTER YOUR NAME',
            4: 'ETER A VALID NAME'
        },
        nameObj: {
            requiredFlag: true,
            regexPattern: regExpression.name
        },
        email: {
            0: '',
            1: 'ENTER YOUR EMAIL',
            4: 'ENTER A VALID EMAIL'
        },
        emailObj: {
            requiredFlag: true,
            regexPattern: regExpression.email
        },
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
        }
    })
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
        setLoader(true)
        let validateNewInput = {
            name: errorCode['name'][fieldValidation({...errorCode['nameObj'], fieldval: userInfo.name})],
            email: errorCode['email'][fieldValidation({...errorCode['emailObj'], fieldval: userInfo.email})],
            phone: errorCode['phone'][fieldValidation({...errorCode['phoneObj'], fieldval: userInfo.phone})],
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){

        }else{
            setLoader(false)
            setError(validateNewInput)
        }
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
                </div>
                <div className="footer">
                    <input type="submit" className={`primaryBtn ${(loader || !(userInfo.name && userInfo.email && userInfo.phone) || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} value="CONTINUE"/>
                </div>
            </form>
        </div>
    )
}