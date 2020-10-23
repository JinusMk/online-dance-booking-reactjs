import React, { Suspense, useEffect } from 'react'
import '../../../assets/styles/help-module.scss'
import { Container } from '@material-ui/core';
import { WhoWeAre } from '../../home/components'
import { Header } from '../../../shared_elements';

const HowWorks = React.lazy(() => import('../../home/components/HowWorks'));
const WhyLetzdance = React.lazy(() => import('../../home/components/WhyLetzdance'));
const CommonQuestions = React.lazy(() => import('../../home/components/CommonQuestions'));
const ContactUs = React.lazy(() => import('../../home/components/ContactUs'));
const AddToHomeScreen = React.lazy(() => import ('../../../shared_elements/AddToHomeScreen'))

export default function Help(props){
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return(
        <section className="help-section">
            <Header onBack={() => props.history.push('/profile')} title="Help" />
            <Container className="help-container">
                <WhoWeAre/>
                <Suspense fallback={<div>Loading...</div>}>
                    <WhyLetzdance/>
                    <HowWorks />
                    <AddToHomeScreen />
                    <CommonQuestions />
                    <ContactUs />
                </Suspense>
            </Container>
        </section>
    )
}