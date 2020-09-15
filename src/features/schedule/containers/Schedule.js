import React, { Suspense, lazy } from 'react'
import { Header, BottomNavigation } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/schedule-module.scss'

export default function Schedule(props){
    return(
        <section className="schedule-section">
            <Header title="Schedule"/>
            <BottomNavigation/>
        </section>
    )
}