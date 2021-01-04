import React, { Suspense, lazy, useEffect } from 'react'
import { Container } from '@material-ui/core';
import { Introduction } from '../components'
import '../../../assets/styles/home-module.scss'

const WhoWeAre = React.lazy(() => import('../components/WhoWeAre'));
// const LastWeekRecap = React.lazy(() => import('../components/LastWeekRecap'));
const ExpertInstructors = React.lazy(() => import('../components/ExpertInstructors'));
const WhyLetzdance = React.lazy(() => import('../components/WhyLetzdance'));
const HowWorks = React.lazy(() => import('../components/HowWorks'));
const CommonQuestions = React.lazy(() => import('../components/CommonQuestions'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));
const Reviews = React.lazy(() => import('../components/Reviews'));
const UpComingClasses = React.lazy(() => import('../components/UpComingClasses'));
const Subscriptions = React.lazy(() => import('../components/Subscriptions'));

export default function Home(props){
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return(
        <section className="home-section">
            <Container maxWidth={false} className="home-container">
                <Introduction />
                <Suspense fallback={<></>}>
                    <UpComingClasses />
                </Suspense>
                <Suspense fallback={<></>}>
                    <WhoWeAre />
                    {/* <LastWeekRecap /> */}
                    <Reviews/>
                </Suspense>
                {/* <Suspense fallback={<></>}>
                    <Reviews/>
                </Suspense> */}
                <Suspense fallback={<></>}>
                    <WhyLetzdance />
                    <ExpertInstructors />
                    <Subscriptions />
                    <HowWorks />
                    <CommonQuestions />
                    <ContactUs /> 
                </Suspense>
            </Container>
        </section>
    )
}