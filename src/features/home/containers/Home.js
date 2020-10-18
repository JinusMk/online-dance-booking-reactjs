import React, { Suspense, lazy, useEffect } from 'react'
import { Header, BottomNavigation } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import { Introduction, UpComingClasses } from '../components'
import '../../../assets/styles/home-module.scss'

const WhoWeAre = React.lazy(() => import('../components/WhoWeAre'));
const LastWeekRecap = React.lazy(() => import('../components/LastweekRecap'));
const ExpertInstructors = React.lazy(() => import('../components/ExpertInstructors'));
const WhyLetzdance = React.lazy(() => import('../components/WhyLetzdance'));
const HowWorks = React.lazy(() => import('../components/HowWorks'));
const CommonQuestions = React.lazy(() => import('../components/CommonQuestions'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));
const Reviews = React.lazy(() => import('../components/Reviews'));

export default function Home(props){
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return(
        <section className="home-section">
            <Header/>
            <Container className="home-container">
                <Introduction />
                <UpComingClasses />
                <Suspense fallback={<div>Loading...</div>}>
                    <WhoWeAre />
                    <LastWeekRecap />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <Reviews/>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <WhyLetzdance />
                    <ExpertInstructors />
                    <HowWorks />
                    <CommonQuestions />
                    <ContactUs /> 
                </Suspense>
            </Container>
            <BottomNavigation/>
        </section>
    )
}