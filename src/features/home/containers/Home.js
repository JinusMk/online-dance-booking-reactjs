import React, { Suspense, lazy } from 'react'
import { Header, BottomNavigation } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import { Introduction, UpComingClasses } from '../components'
import '../../../assets/styles/home-module.scss'

const WhoWeAre = React.lazy(() => import('../components/WhoWeAre'));
const LastWeekRecap = React.lazy(() => import('../components/LastWeekRecap'));
const ExpertInstructors = React.lazy(() => import('../components/ExpertInstructors'));
const WhyLetzdance = React.lazy(() => import('../components/WhyLetzdance'));
const HowWorks = React.lazy(() => import('../components/HowWorks'));
const CommonQuestions = React.lazy(() => import('../components/CommonQuestions'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));

export default function Home(props){
    return(
        <section className="home-section">
            <Header/>
            <Container maxWidth={false} className="home-container">
                <Introduction />
                <UpComingClasses />
                <Suspense fallback={<div>Loading...</div>}>
                    <WhoWeAre />
                    <LastWeekRecap />
                    <ExpertInstructors />
                    <WhyLetzdance />
                    <HowWorks />
                    <CommonQuestions />
                    <ContactUs /> 
                </Suspense>
            </Container>
            <BottomNavigation/>
        </section>
    )
}