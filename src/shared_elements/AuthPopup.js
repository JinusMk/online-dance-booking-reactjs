import React, { useState, useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import firebase from '../utils/firebase'
import { PhoneAuth, EmailAuth } from './index'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { toastFlashMessage } from '../utils'
import { useHistory } from 'react-router-dom'

function AuthPopup(props){
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const [phoneAuth, setPhoneAuth] = useState(false)
    const [emailAuth, setEmailAuth] = useState(false)
    let history = useHistory()

    useEffect(() => {
        if(props.isLoggedIn && props.type!="verifyPhone"){
            props.handleClose()
        }
        if(props.open){
            if(props.type == "verifyPhone"){
                setPhoneAuth(true)
                setEmailAuth(false)
            }else if(props.type == "resetPassword"){
                setEmailAuth(true)
                setPhoneAuth(false)
            }else{
                setEmailAuth(false)
                setPhoneAuth(false)
            }
        }
    }, [props.open, props.isLoggedIn])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        if(props.type == "resetPassword" && !open){
            history.push(`/profile`)
        }
        props.handleClose(open)
        setState({ ...state, [anchor]: open });
    };
    const onSubmit = (type) => {
        if(type == "phone"){
            setPhoneAuth(true)
        }else if(type == "facebook"){
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(user => {
                handleLoginSuccess(user)
            })
            .catch(error => {
                if(error.message){
                    toastFlashMessage(error.message, 'error')
                }
            })

        }else if(type == "google"){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(response => {
                handleLoginSuccess(response)
            })
            .catch(error => {
                if(error.message){
                    toastFlashMessage(error.message, 'error')
                }
            })
        }else if(type == "email"){
            setEmailAuth(true)
        }
    }
    const handleLoginSuccess = (user) => {
        if(props.type == "verifyPhone"){
            props.handleClose(user)
            toastFlashMessage(`PONE NUMBER LINKED SUCCESSFULLY`, 'success')
        }else if(props.type == "resetPassword"){
            toastFlashMessage(`YOU'RE NOW LOGGED IN`, 'success')
            history.push(`/profile`)
        }else{
            if(user != "forgot-password"){
                toastFlashMessage(`YOU'RE NOW LOGGED IN`, 'success')
            }
            props.handleClose()
        }
    }
    return(
        <>
            {[isMobile ? 'bottom': 'right'].map((anchor) => (
                <SwipeableDrawer
                    key={anchor}
                    onOpen={(e) => e.preventDefault()}
                    anchor={anchor}
                    open={props.open}
                    onClose={toggleDrawer(anchor, false)}
                    className="custom-drawer auth"
                >
                    <div className="auth-popup-wrapper">
                        <div className="line"></div>
                        {
                            phoneAuth ? <PhoneAuth handleBack={() => {
                                if(props.type == "verifyPhone"){
                                    props.handleClose()
                                }else{
                                    setPhoneAuth(false)
                                }
                            }} handleSuccess={handleLoginSuccess} phone={props.phone} type={props.type}/> : emailAuth ? <EmailAuth handleBack={() => setEmailAuth(false)} handleSuccess={handleLoginSuccess} type={props.type}/> : <>
                                <h2 className="heading2">Login</h2>
                                <ul className="listUnstyled loginBtnGroup">
                                    <li>
                                        <button className="btn phone" onClick={() => onSubmit('phone')}>CONTINUE WITH MOBILE NUMBER</button>
                                    </li>
                                    <li>
                                        <button className="btn facebook" onClick={() => onSubmit('facebook')}>CONTINUE WITH FACEBOOK</button>
                                    </li>
                                    <li>
                                        <button className="btn google" onClick={() => onSubmit('google')}>CONTINUE WITH GOOGLE</button>
                                    </li>
                                    <li>
                                        <button className="btn email" onClick={() => onSubmit('email')}>CONTINUE WITH EMAIL</button>
                                    </li>
                                </ul>
                            </>
                        }
                    </div>
                </SwipeableDrawer>
            ))}
        </>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn
})
// const mapDispatchToProps = (dispath) => ({
//     updateAuthStatus : (flag) => dispath({
//         type: AUTH_STATUS_UPDATE,
//         payload: flag
//     }),
//     updateUserInfo : (user) => 
// })
export default connect(mapStateToProps)(AuthPopup)