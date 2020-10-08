import React, { useState, useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import firebase from '../utils/firebase'
import { PhoneAuth, EmailAuth } from './index'
import { connect } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { toastFlashMessage } from '../utils'

function AuthPopup(props){
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const [user, setUser] = useState('')
    const [phoneAuth, setPhoneAuth] = useState(false)
    const [emailAuth, setEmailAuth] = useState(false)
    useEffect(() => {
        if(props.isLoggedIn && props.type!="verifyPhone"){
            props.handleClose()
        }
        if(props.open){
            setEmailAuth(false)
            if(props.type == "verifyPhone"){
                setPhoneAuth(true)
            }else{
                setPhoneAuth(false)
            }
        }
    }, [props.open, props.isLoggedIn])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
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
        }else{
            toastFlashMessage(`YOU'RE NOW LOGGED IN`, 'success')
            props.handleClose()
        }
    }
    return(
        <>
            {[isMobile ? 'bottom': 'right'].map((anchor) => (
                <SwipeableDrawer
                    anchor={anchor}
                    open={props.open}
                    onClose={toggleDrawer(anchor, false)}
                    className="custom-drawer auth"
                >
                    <div className="auth-popup-wrapper">
                        <div class="line"></div>
                        {
                            phoneAuth ? <PhoneAuth handleBack={() => {
                                if(props.type == "verifyPhone"){
                                    props.handleClose()
                                }else{
                                    setPhoneAuth(false)
                                }
                            }} handleSuccess={handleLoginSuccess} phone={props.phone} type={props.type}/> : emailAuth ? <EmailAuth handleBack={() => setEmailAuth(false)} handleSuccess={handleLoginSuccess}/> : <>
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