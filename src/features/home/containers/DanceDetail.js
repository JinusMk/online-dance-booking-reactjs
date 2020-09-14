import React, { Suspense, lazy } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import { Gallery, DanceInfo } from '../components'
import '../../../assets/styles/dance-detail-module.scss'

export default function DanceDetail(props){
    const selectedDay = val => {
        console.log(val);
    };
    return(
        <section className="dance-detail-section">
            <Header onBack={() => props.history.push('/')} title="Zumba"/>
            <Container maxWidth={false} className="dance-detail-container">
                <Gallery/>
                <DanceInfo />
            </Container>
        </section>
    )
}