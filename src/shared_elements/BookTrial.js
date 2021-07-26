import React, { useState, useEffect } from 'react'
import { SwipeableDrawer, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { toastFlashMessage } from '../utils'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import PhoneInput from 'react-phone-input-2'

function BookTrial(props){
    const { open } = props
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        mobile: '',
        subscription: '',
        preferedDay: 'Weekend'
    })
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false)

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        props.handleClose(open)
        setState({ ...state, [anchor]: open });
    };
    const handleChange = (key, val) => {
        setUserData({
            ...userData,
            [key] : val
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
        <>
        {
            [isMobile ? 'bottom': 'right'].map((anchor) => (
                <SwipeableDrawer
                    key={anchor}
                    onOpen={(e) => e.preventDefault()}
                    anchor={anchor}
                    open={props.open}
                    onClose={toggleDrawer(anchor, false)}
                    className="custom-drawer book-trial"
                >
                    <div className="book-trial-wrapper">
                        <form onSubmit={handleSubmit}>
                            <h2 className="heading2">{`Book trial`}</h2>  
                            <div className="inputGroup">
                                <label className={error.name ? 'error': ''}>{error.name ? error.name : 'YOUR NAME'}</label>
                                <TextField 
                                    value={userData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Your name"
                                    error={error.name ? true : false}
                                />
                            </div>
                            <div className="inputGroup">
                                <label className={error.email ? 'error': ''}>{error.email ? error.email : 'EMAIL'}</label>
                                <TextField 
                                    value={userData.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="Your email"
                                    type="email"
                                    error={error.email ? true : false}
                                    required
                                />
                            </div>
                            <div className="inputGroup">
                                <label className={error.phone ? 'error': ''}>{error.phone ? error.phone: 'YOUR MOBILE NUMBER'}</label>
                                <PhoneInput
                                    country={'in'}
                                    disableSearchIcon={true}
                                    value={userData.mobile}
                                    // disabled={loader}
                                    onChange={phone => handleChange('mobile', phone)}
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
                            <div className="inputGroup">
                                <RadioGroup aria-label="payment-options" name="payment-options" className="radioGroup" value={userData.preferedDay} onChange={(e) => handleChange('preferedDay', e.target.value)}>
                                    <FormControlLabel value="Weekend" control={<Radio />} label={<div className={`label ${userData.preferedDay === 'Weekend' ? 'active': ''}`}>
                                        <p className="secondaryText">WEEKEND</p>
                                    </div>} />
                                    <FormControlLabel value="Weekday" control={<Radio />} label={<div className={`label ${userData.preferedDay === 'Weekday' ? 'active': ''}`}>
                                        <p className="secondaryText">WEEKDAY</p>
                                    </div>} />
                                </RadioGroup>
                            </div>
                            <ul className="listInline footer">
                                <li>
                                    <p>
                                        <a className={`secondaryBtn ${loader ? 'disabled': ''}`} onClick={toggleDrawer(anchor, false)}>BACK</a>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <a className={`primaryBtn ${(loader || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} onClick={handleSubmit}>{'SUBMIT'}</a>
                                    </p>
                                </li>
                            </ul>
                        </form>
                    </div>
                </SwipeableDrawer>
        ))}
        </>
    )
}
const mapStateToProps = state => ({
    userInfo: state.sharedReducers.userInfo
})
export default connect(mapStateToProps)(BookTrial)