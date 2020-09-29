import React, { useState, useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useLocation } from 'react-router-dom'
import firebase from '../utils/firebase'
import { PhoneAuth } from './index'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

export default function AuthPopup(props){
    const [state, setState] = useState({
        bottom: false,
    })
    const [user, setUser] = useState('')
    const [phoneAuth, setPhoneAuth] = useState(false)
    const [emailAuth, setEmailAuth] = useState(false)
    useEffect(() => {
        firebase.default.auth().onAuthStateChanged(user => {
            console.log('user', user)
            setUser(!!user)
        })
    }, [])

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
            .then(response => {
                console.log('response fb', response)
            })
            .catch(error => {
                console.log('error fb', error)
            })

        }else if(type == "google"){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(response => {
                console.log('response google', response)
            })
            .catch(error => {
                console.log('error google', error)
            })
        }else if(type == "email"){
            setEmailAuth(true)
        }
    }
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    size: 'invisible'
                },
                defaultCountry: 'IN'
            },
            firebase.default.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.default.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.default.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccess: (...params) => console.log('callBack', params)
        }
    }
    return(
        <>
            {['bottom'].map((anchor) => (
                <SwipeableDrawer
                    anchor={anchor}
                    open={props.open}
                    onClose={toggleDrawer(anchor, false)}
                    className="custom-drawer auth"
                >
                    <div className="auth-popup-wrapper">
                        <div class="line"></div>
                        {
                            phoneAuth ? <PhoneAuth handleBack={() => setPhoneAuth(false)}/> : emailAuth ? 'email' : <>
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
                        {/* <StyledFirebaseAuth 
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.default.auth()}
                        /> */}
                    </div>
                </SwipeableDrawer>
            ))}
        </>
    )
}
