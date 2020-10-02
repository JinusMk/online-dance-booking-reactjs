import React, { Suspense, lazy, useState } from 'react'
import { AuthPopup, DanceAlert } from  '../../../shared_elements'
import { ContactUs } from '../../home/components'
import { Container, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils'
import '../../../assets/styles/profile-module.scss'

export default function Profile(props){
    const [openAuthPopup, setOpenAuthPopup] = useState(false)
    const logout = () => {
        firebase.auth().signOut()
        .then(res => {
            console.log('logout success', res)
        })
        .catch(err => {
            console.log('logout error', err)
        })
    }
    return(
        <section className="profile-section">
            <Container className="profile-container">
                <div className="top-blk">
                    {/* <div className="login-btn-wrapper">
                        <h3 className="heading3">Login and get started towards your journey of fun and fitness!</h3>
                        <p><a className="primaryBtn" onClick={() => setOpenAuthPopup(true)}>LOGIN / REGISTER</a></p>
                    </div> */}
                    <div className="logged-in-user-info">
                        <Avatar className="user-avatar">P</Avatar>
                        <h3 className="heading3">Prasanna</h3>
                        <p className="paragraph">Letzdancer since 2020</p>
                    </div>
                    <DanceAlert />
                </div>
                <ul className="listUnstyled links">
                    <li className="">
                        <p><Link to="/user/dance-history" className="heading2">Dance history</Link></p>
                        <img src={require('../../../assets/images/right_arrow_icon.svg')} className="arrow"/>
                    </li>
                    <li className="">
                        <p><Link to="/help" className="heading2">Help</Link></p>
                        <img src={require('../../../assets/images/right_arrow_icon.svg')} className="arrow"/>
                    </li>
                    <li className="">
                        <p><a onClick={logout} className="heading2">Logout</a></p>
                        <img src={require('../../../assets/images/right_arrow_icon.svg')} className="arrow"/>
                    </li>
                </ul>
                <ContactUs />
            </Container>
            {
                <AuthPopup 
                    open={openAuthPopup}
                    handleClose={() => setOpenAuthPopup(false)}
                />
            }
        </section>
    )
}