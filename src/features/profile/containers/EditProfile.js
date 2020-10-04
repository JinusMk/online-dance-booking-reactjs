import React, { useState, useEffect } from 'react'
import '../../../assets/styles/edit-profile-module.scss'
import { Container } from '@material-ui/core';
import { connect } from 'react-redux'
import { toastFlashMessage } from '../../../utils'
import { Header } from '../../../shared_elements';

function EditProfile(props){
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        if(props.isLoggedIn){
            setLoader(false)
        }else{
            setLoader(true)
            // props.history.push('/profile')
        }
    }, [props.isLoggedIn])
    return(<section className="edit-profile-section">
        <Container maxWidth={false} className="edit-profile-container">
            <Header onBack={() => props.history.push('/profile')} title="Edit Profile"/>
            {loader ? 'Loading...' : <><div className="top-blk">

            </div></>}
        </Container>
    </section>)
}

const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userInfo: state.sharedReducers.userInfo
})

export default connect(mapStateToProps)(EditProfile)