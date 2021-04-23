import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/subscription-detail-module.scss'
import { globalGetService } from '../../../utils/globalApiServices';
import { checkNumberOfDaysLeft } from '../../../utils';

const SubscriptionInfo = lazy(() => import('../components/SubscriptionInfo'));
const SubscriptionBenefits = lazy(() => import('../components/SubscriptionBenefits'));
const SubscriptionPlans = lazy(() => import('../components/SubscriptionPlans'));
const ClassBookingAlert = lazy(() => import('../components/ClassBookingAlert'));
const HowWorks = React.lazy(() => import('../../home/components/HowWorks'));
const ContactUs = React.lazy(() => import('../../home/components/ContactUs'));
const CommonQuestions = React.lazy(() => import('../../home/components/CommonQuestions'));

export default function SubscriptionDetail(props){
    const [loader, setLoader] = useState(true)
    const [subscriptionInfo, setSubscriptionInfo] = useState([])
    const [activeSubscription, setActiveSubscription] = useState('')
    const [renewal, setRenewal] = useState(false)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        globalGetService(`subscriptionsBySlug/${props.match.params.category}`)
        .then(response => {
            if(response.success === true){
                setLoader(false)
                const activeSubscription = response.data && response.data.find(sub => sub.status == "active")
                setSubscriptionInfo(response.data)
                if(activeSubscription){
                    setActiveSubscription(activeSubscription)
                    setRenewal(checkNumberOfDaysLeft(activeSubscription.endDate) <= 7 ? true : false)
                }else{
                    setActiveSubscription('')
                }
            }
        })
    }, [])
    const handleGoBack = (e) => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push('/')
        }
    }
    return(
        <section className="subscription-detail-section">
            <Header onBack={handleGoBack} title={`${subscriptionInfo.length ? subscriptionInfo[0]?.name : ''} Subscription`}/>
            {
                loader ? 'Loading...' : <Container className="subscription-detail-container">
                    <Suspense fallback={<></>}>
                        <SubscriptionInfo subscription={activeSubscription ? activeSubscription : subscriptionInfo.length ? subscriptionInfo[0] : {}} active={activeSubscription ? true : false}/>
                        <SubscriptionBenefits />
                        {(activeSubscription && !renewal) ? null : <>
                            <SubscriptionPlans subscriptionInfo={subscriptionInfo} isRenewal={renewal}/>
                            <ClassBookingAlert subscription={subscriptionInfo.length ? subscriptionInfo[0] : {}}/>
                        </>}
                        <HowWorks />
                        <CommonQuestions/>
                        <ContactUs/>
                    </Suspense>
                </Container>
            }
        </section>
    )
}