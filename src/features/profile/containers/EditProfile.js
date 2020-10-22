import React, { useState, useEffect } from 'react'
import '../../../assets/styles/edit-profile-module.scss'
import { Container, Grid, Avatar, TextField } from '@material-ui/core';
import { connect } from 'react-redux'
import { toastFlashMessage } from '../../../utils'
import { imageBasePath, USER_AUTH_ERRORCODE } from '../../../constants'
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
    const [errorCode] = useState(USER_AUTH_ERRORCODE)
    const [verifyPhone, setVerifyPhone] = useState(false)
    useEffect(() => {
        if(props.isLoggedIn){
            setLoader(false)
            setFormData({
                name: props.userInfo.displayName,
                email: props.userInfo.email,
                phone: props.userInfo.phoneNumber,
                image: props.userInfo.photoURL,
                image_display: ''
            })
            setProviderData(props.userInfo.providerData)
            setError({})
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
         // const data = new FormData();
        // if(formData.image_display){
        //     for(let file of formData.image){
        //         data.append('photoURL', file, file.name);
        //     }
        // }
        let validateNewInput = {
            name: errorCode['name'][fieldValidation({...errorCode['nameObj'], fieldval: formData.name})],
            email: errorCode['email'][fieldValidation({...errorCode['emailObj'], fieldval: formData.email})],
            // phone: errorCode['phone'][fieldValidation({...errorCode['phoneObj'], fieldval: formData.phone})],
        }
        if(Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === ''})){
            let promise1 = firebase.auth().currentUser.updateProfile({displayName: formData.name, phone: '919876543210', phoneNumber: '919876543210'})
            let promise2 = firebase.auth().currentUser.updateEmail(formData.email)
            Promise.all([promise1, promise2])
            .then((values) => {
                console.log('values promise', values);
                toastFlashMessage('Profile updated successfully', 'success')
                props.history.push('/profile')
            })
            .catch(error => {
                console.log('error', error)
                if(error.message){
                    toastFlashMessage(`${error.message}`, 'error')
                }
            })
        }else{
            setError(validateNewInput)
        }
    }
    const handleBack = () => {
        if(formData.name != props.userInfo.displayName || formData.email != props.userInfo.email){
            // || formData.phone != props.userInfo.phoneNumber
            if(window.confirm(`Are you sure you want to save the changes ?`)){
                handleSave()
            }else{
                props.history.push('/profile')
            }
        }else{
            props.history.push('/profile')
        }
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

    const handleCloseVerifyPopup = (user) => {
        if(user){
            props.updateUserInfo(user) 
            setProviderData(user.providerData)
            setFormData({...formData, phone: user.phoneNumber})
        }
        setVerifyPhone(false)
    }
    return(<section className="edit-profile-section">
        <Container className="edit-profile-container">
            <Header onBack={handleBack} title="Edit Profile"/>
            {loader ? 'Loading...' : <><Grid container className="top-blk" justify="center" alignItems="center">
                <Grid item>
                    {
                        (formData.image_display || formData.image) ? <Avatar src={formData.image_display ? formData.image_display : formData.image} className="user-avatar"/> : <Avatar className="user-avatar">{formData.name ? formData.name[0] : formData.email ? formData.email[0]: 'L'}</Avatar>
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
                        <label className={error.name ? 'error': ''}>{error.name ? error.name : 'YOUR NAME'}</label>
                        <TextField 
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Your display name"
                            error={error.name ? true : false}
                        />
                    </div> 
                </Grid>
                <Grid item xs={12}>
                    <div className="inputGroup">
                        <label className={error.email ? 'error': ''}>{error.email ? error.email : 'YOUR EMAIL'}</label>
                        <TextField 
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="Your email"
                            type="email"
                            error={error.email ? true : false}
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
                handleClose={handleCloseVerifyPopup}
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