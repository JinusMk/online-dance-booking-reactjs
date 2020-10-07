import React, { useState, useEffect } from 'react'
import '../../../assets/styles/edit-profile-module.scss'
import { Container, Grid, Avatar, TextField } from '@material-ui/core';
import { connect } from 'react-redux'
import { toastFlashMessage } from '../../../utils'
import { regExpression, imageBasePath } from '../../../constants'
import { fieldValidation } from '../../../utils/formValidation';
import firebase from '../../../utils/firebase'
import { Header, AuthPopup } from '../../../shared_elements';
import { UPDATE_USERINFO } from '../../../shared_elements/actions'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function EditProfile(props){
    const [loader, setLoader] = useState(true)
    const [formData, setFormData] =useState({})
    const [error, setError] = useState({})
    const [providerData, setProviderData] = useState([])
    const [errorCode] = useState({
        email: {
            0: '',
            1: 'ENTER YOUR EMAIL',
            4: 'ENTER A VALID EMAIL'
        },
        emailObj: {
            requiredFlag: true,
            regexPattern: regExpression.email
        }, 
        displayName: {
            0: '',
            1: 'ENTER YOUR DISPLAY NAME'
        },
        displayNameObj: {
            requiredFlag: true
        },
        phone: {
            0: '',
            1: 'ENTER YOUR PHONE NUMBER'
        },
        phoneObj: {
            requiredFlag: true
        }
    })
    const [verifyPhone, setVerifyPhone] = useState(false)
    useEffect(() => {
        if(props.isLoggedIn){
            setLoader(false)
            setFormData({
                displayName: props.userInfo.displayName,
                email: props.userInfo.email,
                phone: props.userInfo.phoneNumber,
                image: props.userInfo.photoURL,
                image_display: ''
            })
            setProviderData(props.userInfo.providerData)
        }else{
            setLoader(true)
            // props.history.push('/profile')
        }
    }, [props.userInfo])

    const imageUpdate = (image)=> {
        if(image[0]){
            setFormData({
                ...formData,
                image_display: URL.createObjectURL(image[0]),
                image: image
            })
        }
    }
    const handleChange = (key, val) => {
        setFormData({
            ...formData,
            [key]: val
        })
        setError({
            ...error,
            [key]: ''
        })
    }
    const isVerified = (providerId) => {
        if(props.isLoggedIn && providerData){
            const flag = providerData.find((item => item.providerId == providerId))
            return flag ? true : false
        }else{
            return false
        }
    }
    const handleSave = () => {

    }
    const handleDisconnect = (provideID) => {
        if(window.confirm(`Are you sure you want to unlink your ${provideID == "google.com" ? 'Google' : 'Facebook'} account ?`)){
            firebase.auth().currentUser.unlink(provideID)
            .then(response => {
                props.updateUserInfo(response)
                setProviderData(response.providerData)
                toastFlashMessage(`${provideID == "google.com" ? 'GOOGLE' : 'FCEBOOK'} ACCOUNT UNLINKED SUCCESSFULLY`, 'success')
            })
            .catch(err => {
                if(err.message){
                    toastFlashMessage(err.message, 'error')
                }
            })
        }
    }
    const handleConnect = (type) => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        var facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().currentUser.linkWithPopup(type == "google" ? googleProvider : facebookProvider)
        .then(response => {
            props.updateUserInfo(response.user)
            setProviderData(response.user.providerData)
            toastFlashMessage(`${type == "google" ? 'GOOGLE' : 'FACEBOOK'} ACCOUNT LINKED SUCCESSFULLY`, 'success')
        })
        .catch(err => {
            if(err.message){
                toastFlashMessage(err.message, 'error')
            }
        })
    }
    return(<section className="edit-profile-section">
        <Container maxWidth={false} className="edit-profile-container">
            <Header onBack={() => props.history.push('/profile')} title="Edit Profile"/>
            {loader ? 'Loading...' : <><Grid container className="top-blk" alignItems="center">
                <Grid item>
                    {
                        (formData.image_display || formData.image) ? <Avatar src={formData.image_display ? formData.image_display : formData.image} className="user-avatar"/> : <Avatar className="user-avatar">{formData.displayName ? formData.displayName[0] : formData.email ? formData.email[0]: 'L'}</Avatar>
                    }
                </Grid>
                <Grid item>
                    <div className="inputFileGroup">
                        <a className="secondaryBtn">
                            <input
                                id="photo"
                                type="file"
                                label="Upload"
                                accept="image/*"
                                onChange={(e) => imageUpdate(e.target.files)}
                            />
                            <span>UPLOAD NEW</span>
                        </a>
                    </div>
                </Grid>
            </Grid>
            <Grid container className="personal-details">
                <h3 className="heading3 title">Personal Details</h3>
                <Grid item xs={12}>
                    <div className="inputGroup">
                        <label className={error.displayName ? 'error': ''}>{error.displayName ? error.displayName : 'DISPLAY NAME'}</label>
                        <TextField 
                            value={formData.displayName}
                            onChange={(e) => handleChange('displayName', e.target.value)}
                            placeholder="Your display name"
                            error={error.displayName}
                        />
                    </div> 
                </Grid>
                <Grid item xs={12}>
                    <div className="inputGroup">
                        <label className={error.email ? 'error': ''}>{error.email ? error.email : 'EMAIL'}</label>
                        <TextField 
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="Your email"
                            type="email"
                            error={error.email}
                            required
                            disabled={props.userInfo.emailVerified ? true : false}
                        />
                        {props.userInfo.emailVerified ? <span className="verifyLabel secondaryText">VERIFIED</span> :  <span className="verifyLabel error secondaryText">UNVERIFIED</span>}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className="inputGroup">
                        <label className={error.phone ? 'error': ''}>{error.phone ? error.phone: 'YOUR MOBILE NUMBER'}</label>
                        <PhoneInput
                            country={'in'}
                            disableSearchIcon={true}
                            value={formData.phone}
                            disabled={isVerified('phone') ? true : false}
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
                        {isVerified('phone') ? <span className="verifyLabel secondaryText">VERIFIED</span> : formData.phone ? <span className="verifyLabel error secondaryText">UNVERIFIED</span>: ''}
                    </div>
                    {isVerified('phone') ? null : <p><a className="secondaryBtn" onClick={() => setVerifyPhone(true)}>VERIFY MOBILE NUMBER</a></p>}
                </Grid>
            </Grid>
            <Grid container className="link-social-accounts">
                <div className="heading">
                    <h3 className="heading3 title">Connected accounts</h3>
                    <p className="paragraph">You can use your Facebok or Google account to login</p>
                </div>
                <Grid item xs={12}>
                    {
                        isVerified('google.com') ? <div className="social-account-wrapper">
                            <img src={`${imageBasePath}google_icon.svg`} className="icon"/>
                            <div className="info-blk">
                                <p className="secondaryText">CONNECTED AS</p>
                                <h3 className="heading3">{providerData.find(item => item.providerId == "google.com").email}</h3>
                            </div>
                            <img src={`${imageBasePath}close_icon.svg`} className="close-icon" onClick={() => handleDisconnect('google.com')}/>
                        </div> : <p className="social-btn"><a className="primaryBtn google" onClick={() => handleConnect("google")}>CONNECT WITH GOOGLE</a></p>
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        isVerified('facebook.com') ? <div className="social-account-wrapper facebook">
                            <img src={`${imageBasePath}facebook_icon.svg`} className="icon"/>
                            <div className="info-blk">
                                <p className="secondaryText">CONNECTED AS</p>
                                <h3 className="heading3">{providerData.find(item => item.providerId == "facebook.com").displayName}</h3>
                            </div>
                            <img src={`${imageBasePath}close_icon.svg`} className="close-icon" onClick={() => handleDisconnect('facebook.com')}/>
                        </div> : <p className="social-btn"><a className="primaryBtn facebook" onClick={() => handleConnect("facebook")}>CONNECT WITH FACEBOOK</a></p>
                    }
                </Grid>
            </Grid>
            </>}
        </Container>
        {
            <AuthPopup 
                open={verifyPhone}
                handleClose={(user) => {if(user){props.updateUserInfo(user); setProviderData(user.providerData)}setVerifyPhone(false)}}
                phone={formData.phone}
                type="verifyPhone"
            />
        }
    </section>)
}

const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userInfo: state.sharedReducers.userInfo
})
const mapDispatchToProps = dispatch => ({
    updateUserInfo : (user) => dispatch({
        type: UPDATE_USERINFO,
        payload: user
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)