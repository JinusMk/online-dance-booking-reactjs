import React, { Suspense, lazy } from 'react'
import { Header, BottomNavigation } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/profile-module.scss'

export default function Profile(props){
    return(
        <section className="profile-section">
            <Header/>
            <BottomNavigation/>
        </section>
    )
}