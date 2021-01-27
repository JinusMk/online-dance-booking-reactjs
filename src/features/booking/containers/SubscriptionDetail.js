import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/subscription-detail-module.scss'

const SubscriptionInfo = lazy(() => import('../components/SubscriptionInfo'));
const SubscriptionBenefits = lazy(() => import('../components/SubscriptionBenefits'));
const SubscriptionPlans = lazy(() => import('../components/SubscriptionPlans'));
const ClassBookingAlert = lazy(() => import('../components/ClassBookingAlert'));
const HowWorks = React.lazy(() => import('../../home/components/HowWorks'));
const ContactUs = React.lazy(() => import('../../home/components/ContactUs'));
const CommonQuestions = React.lazy(() => import('../../home/components/CommonQuestions'));

export default function SubscriptionDetail(props){
    const [loader, setLoader] = useState(false)
    const [category, setCategory] = useState('')

    useEffect(() => {
        const category = props.match.params.category
        setCategory(category)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    return(
        <section className="subscription-detail-section">
            <Header onBack={() => props.history.push('/')} title={`${category} Subscription`}/>
            {
                loader ? 'Loading...' : <Container className="subscription-detail-container">
                    <Suspense fallback={<></>}>
                        <SubscriptionInfo category={category}/>
                        <SubscriptionBenefits category={category}/>
                        <SubscriptionPlans category={category}/>
                        <ClassBookingAlert category={category}/>
                        <HowWorks />
                        <CommonQuestions/>
                        <ContactUs/>
                    </Suspense>
                </Container>
            }
        </section>
    )
}