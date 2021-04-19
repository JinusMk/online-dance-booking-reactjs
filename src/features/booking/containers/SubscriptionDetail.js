import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/subscription-detail-module.scss'
import { globalGetService } from '../../../utils/globalApiServices';

const SubscriptionInfo = lazy(() => import('../components/SubscriptionInfo'));
const SubscriptionBenefits = lazy(() => import('../components/SubscriptionBenefits'));
const SubscriptionPlans = lazy(() => import('../components/SubscriptionPlans'));
const ClassBookingAlert = lazy(() => import('../components/ClassBookingAlert'));
const HowWorks = React.lazy(() => import('../../home/components/HowWorks'));
const ContactUs = React.lazy(() => import('../../home/components/ContactUs'));
const CommonQuestions = React.lazy(() => import('../../home/components/CommonQuestions'));

export default function SubscriptionDetail(props){
    const [loader, setLoader] = useState(true)
    const [subscriptionInfo, setSubscriptionInfo] = useState({})

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        globalGetService(`subscriptionsBySlug/${props.match.params.category}`)
        .then(response => {
            if(response.success === true){
                setLoader(false)
                setSubscriptionInfo(response.data)
            }
        })
    }, [])

    return(
        <section className="subscription-detail-section">
            <Header onBack={() => props.history.push('/')} title={`${subscriptionInfo.length ? subscriptionInfo[0]?.name : ''} Subscription`}/>
            {
                loader ? 'Loading...' : <Container className="subscription-detail-container">
                    <Suspense fallback={<></>}>
                        <SubscriptionInfo subscription={subscriptionInfo.length ? subscriptionInfo[0] : {}}/>
                        <SubscriptionBenefits />
                        <SubscriptionPlans subscriptionInfo={subscriptionInfo}/>
                        <ClassBookingAlert subscription={subscriptionInfo.length ? subscriptionInfo[0] : {}}/>
                        <HowWorks />
                        <CommonQuestions/>
                        <ContactUs/>
                    </Suspense>
                </Container>
            }
        </section>
    )
}