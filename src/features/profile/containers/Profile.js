import React, { Suspense, lazy, useState, useEffect } from 'react'
import { AuthPopup, DanceAlert, AuthVerifyBlock } from  '../../../shared_elements'
import { ContactUs } from '../../home/components'
import { Container, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils'
import { connect } from 'react-redux'
import { UPDATE_USERINFO } from '../../../shared_elements/actions'
import { imageBasePath } from '../../../constants';
import '../../../assets/styles/profile-module.scss'

function Profile(props){
    const [openAuthPopup, setOpenAuthPopup] = useState(false)
    const [verifyPhone, setVerifyPhone] = useState(false)
    const [providerData, setProviderData] = useState([])
    useEffect(() => {
        if(props.isLoggedIn){
            setProviderData(props.userInfo.providerData)
        }else{
            setProviderData([])
        }   
    }, [props.isLoggedIn, props.userInfo])
    const logout = () => {
        if(window.confirm('Are you sure you want to logout ?')){
            firebase.auth().signOut()
            .then(res => {
                console.log('logout success', res)
                toastFlashMessage(`YOU'RE NOW LOGGED OUT`, 'success')
                localStorage.clear()
            })
            .catch(err => {
                console.log('logout error', err)
            })
        }
    }
    const isVerified = (providerId) => {
        if(props.isLoggedIn && providerData){
            const flag = providerData.find((item => item.providerId == providerId))
            return flag ? true : false
        }else{
            return false
        }
    }
    const handleCloseAuthPopup = (user) => {
        if(user){
            props.updateUserInfo(user)
            setProviderData(user.providerData)
        }
        if(verifyPhone){
            setVerifyPhone(false)
        }else{
            setOpenAuthPopup(false)
        }
    }
    return(
        <section className="profile-section">
            <Container className="profile-container">
                <div className="top-blk">
                    {props.isLoggedIn ? <><div className="logged-in-user-info">
                        {props.userInfo.photoURL ? <Avatar src={props.userInfo.photoURL} className="user-avatar"/>:<Avatar className="user-avatar">{props.userInfo.displayName ? props.userInfo.displayName[0] : props.userInfo.email ? props.userInfo.email[0]: 'L'}</Avatar>}
                        <div  className="edit-button-wrapper" onClick={() => props.history.push('/edit-profile')}>
                            <img src={`${imageBasePath}edit_icon.svg`}/>
                        </div>
                        <h3 className="heading3" style={props.userInfo.displayName ? {textTransform: 'capitalize'} : {}}>{props.userInfo.displayName ? props.userInfo.displayName : props.userInfo.email ? props.userInfo.email : props.userInfo.phoneNumber ? props.userInfo.phoneNumber : ''}</h3>
                        <p className="paragraph">Letzdancer since 2020</p>
                    </div>
                    {/* <DanceAlert /> */}
                    {isVerified('phone') ? null : <AuthVerifyBlock type="phone number" handleClick={() => setVerifyPhone(true)} />}
                    </> : <div className="login-btn-wrapper">
                        <h3 className="heading3">Login and get started towards your journey of fun and fitness!</h3>
                        <p><a className="primaryBtn" onClick={() => setOpenAuthPopup(true)}>LOGIN / REGISTER</a></p>
                    </div>
                    }
                </div>
                <ul className="listUnstyled links">
                    <li className={props.isLoggedIn ? '' : 'disabled'}>
                        <p><Link to="/dance-history" className="heading2">Dance history</Link></p>
                        <img src={`${imageBasePath}right_arrow_icon.svg`} className="arrow"/>
                    </li>
                    <li className="">
                        <p><Link to="/help" className="heading2">Help</Link></p>
                        <img src={`${imageBasePath}right_arrow_icon.svg`} className="arrow"/>
                    </li>
                    {props.isLoggedIn ? <li className="">
                        <p><a onClick={logout} className="heading2">Logout</a></p>
                        <img src={`${imageBasePath}right_arrow_icon.svg`} className="arrow"/>
                    </li> : null
                    }
                </ul>
                <ContactUs />
            </Container>
            {
                <AuthPopup 
                    open={openAuthPopup || verifyPhone}
                    handleClose={handleCloseAuthPopup}
                    type={verifyPhone ? "verifyPhone" : ''}
                    phone={verifyPhone ? props.userInfo.phoneNumber : ''}
                />
            }
        </section>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)