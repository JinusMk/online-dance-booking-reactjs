import React, { Suspense, lazy, useState, useEffect } from 'react'
// import { DanceAlert } from  '../../../shared_elements'
import { Container, Avatar } from '@material-ui/core';
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils'
import { connect } from 'react-redux'
import { UPDATE_USERINFO } from '../../../shared_elements/actions'
import { SubscriptionAlert } from '../../../shared_elements'
import { imageBasePath } from '../../../constants';
import '../../../assets/styles/profile-module.scss'
import { useLocation } from 'react-router-dom'
import { globalGetService } from '../../../utils/globalApiServices';

const ProfileNavigationList = lazy(() => import('../components/ProfileNavigationList'))
const ContactUs = lazy(() => import('../../home/components/ContactUs'))
const AuthPopup = lazy(() => import ('../../../shared_elements/AuthPopup'))
const AuthVerifyBlock = lazy(() => import ('../../../shared_elements/AuthVerifyBlock'))

function Profile(props){
    const [openAuthPopup, setOpenAuthPopup] = useState(false)
    const [verifyPhone, setVerifyPhone] = useState(false)
    const [providerData, setProviderData] = useState([])
    const [authAction, setAuthAction] = useState(false)
    const [authMode, setAuthMode] = useState('')
    const [userSubsctiption, setUserSubscriptions] = useState([])

    let location = useLocation()

    useEffect(() => {
        if(props.isLoggedIn){
            setProviderData(props.userInfo.providerData)
            globalGetService(`userSubscriptions`)
            .then(response => {
                if(response.success === true){
                    const userSubsctiption = response.data
                    setUserSubscriptions(userSubsctiption)
                }
            })
        }else{
            setProviderData([])
        }
        if(location.search) {
            const query = new URLSearchParams(location.search);
            setAuthMode(query.get('mode') ? query.get('mode') : '')
            setAuthAction(true)
        }else{
            setAuthAction(false)
            setAuthMode('')
        }
    }, [props.isLoggedIn, props.userInfo, location])
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
                    {(userSubsctiption && userSubsctiption.length) ? <SubscriptionAlert userSubscription={userSubsctiption} /> : null}
                    <Suspense fallback={<></>}>
                        {isVerified('phone') ? null : <AuthVerifyBlock type="phone number" handleClick={() => setVerifyPhone(true)} />}
                    </Suspense>
                    </> : <div className="login-btn-wrapper">
                        <h3 className="heading3">Login and get started towards your journey of fun and fitness!</h3>
                        <p><a className="primaryBtn" onClick={() => setOpenAuthPopup(true)}>LOGIN / REGISTER</a></p>
                    </div>
                    }
                </div>
                <Suspense fallback={<></>}>
                    <ProfileNavigationList isLoggedIn={props.isLoggedIn} logout={logout}/>
                    <ContactUs />
                    {
                        <AuthPopup 
                            open={openAuthPopup || verifyPhone || authAction}
                            handleClose={handleCloseAuthPopup}
                            type={verifyPhone ? "verifyPhone" : authAction ? authMode : ''}
                            phone={verifyPhone ? props.userInfo.phoneNumber : ''}
                        />
                    }
                </Suspense>
            </Container>
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