import React from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import { Introduction, UpComingClasses, WhoWeAre, LastWeekRecap, ExpertInstructors, WhyLetzdance, HowWorks } from '../components'
import '../../../assets/styles/home-module.scss'

export default function Home(props){
    return(
        <section className="home-section">
            <Header type="home"/>
            <Container maxWidth={false} className="home-container">
                <Introduction />
                <UpComingClasses />
                <WhoWeAre />
                <LastWeekRecap />
                <ExpertInstructors />
                <WhyLetzdance />
                <HowWorks />
            </Container>
        </section>
    )
}