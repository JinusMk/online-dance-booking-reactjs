import React, { useState, useEffect } from 'react'
import { SwipeableDrawer, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@material-ui/core';
import { toastFlashMessage } from '../utils'
import { fieldValidation } from '../utils/formValidation'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import PhoneInput from 'react-phone-input-2'
import { subscriptionCategories, USER_AUTH_ERRORCODE as errorCode } from '../constants';
import { globalPostService } from '../utils/globalApiServices';

function BookTrial(props){
    const { open, userInfo, subscriptionCategory } = props
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
        setLoader(true)
        const validateNewInput = Object.keys(userData).reduce((res, item) => ({
            ...res,
            [item]: errorCode[item === 'mobile' ? 'phone' : item] ? errorCode[item === 'mobile' ? 'phone' : item][fieldValidation({...errorCode[item === 'mobile' ? 'phoneObj' : item + 'Obj'], fieldval: userData[item]})]: userData[item] ? '' : `ENTER YOUR ${item}`
        }), {})
        if(Object.keys(validateNewInput).every(key => validateNewInput[key] === '')){
            bookSubscriptionTrialApi()
        }else{
            setLoader(false);
            setError(validateNewInput)
        }
    }
    const bookSubscriptionTrialApi = () => {
        globalPostService(`subscriptionTrial`, userData)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                toastFlashMessage('SUBSCRIPTION TRIAL BOOKED SUCCESSFULLY', 'success')
                props.handleClose()
            }else if(response.message && !response.success){
                toastFlashMessage(response.message, 'error')
            }else if(response.error){
                toastFlashMessage(response.error, 'error')
            }
        })
        .catch(err => {
            setLoader(false)
            toastFlashMessage('Something went wrong, Please try again!', 'error')
        })
    }
    useEffect(() => {
        if(open){
            if(userInfo){
                setUserData({
                    email: userInfo?.email || '',
                    name: userInfo?.displayName || '',
                    mobile: userInfo?.phoneNumber || '',
                    subscription: subscriptionCategory,
                    preferedDay: 'Weekend'
                })
            }else{
                setUserData({
                    email: '',
                    name: '',
                    mobile: '',
                    subscription: subscriptionCategory,
                    preferedDay: 'Weekend'
                })
            }
            setError({})
            setLoader(false)
        }
    }, [open, userInfo])
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
                                <label className={error.mobile ? 'error': ''}>{error.mobile ? error.mobile: 'YOUR MOBILE NUMBER'}</label>
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
                                            className: error.mobile ? 'error' : ''
                                        }
                                    }
                                    searchPlaceholder="Search countries"
                                    enableSearch={true}
                                    isValid={error.mobile ? false : true}
                                />
                            </div>
                            <div className="inputGroup">
                                <label className={error.subscription ? 'error': ''}>{error.subscription ? error.subscription: 'SUBSCRIPTION'}</label>
                                <Select
                                    error={ error.subscription ? true :false }
                                    value={ userData.subscription }
                                    id="subscription"
                                    fullWidth={true}
                                    inputProps={{ 'aria-label': 'subscription' }}
                                    onChange={(event) => handleChange('subscription', event.target.value)}
                                    className="custom-select"
                                    >
                                    {subscriptionCategories?.map((item, index) => <MenuItem key={item.value} value={item.value}>{`${item.label} Subscription`}</MenuItem>)}
                                </Select>
                            </div>
                            <div className="radioGroupInput">
                                <RadioGroup aria-label="preferred-day" name="preferred-day" className="radioGroup" value={userData.preferedDay} onChange={(e) => handleChange('preferedDay', e.target.value)}>
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
                                        <a className={`secondaryBtn`} onClick={toggleDrawer(anchor, false)}>BACK</a>
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