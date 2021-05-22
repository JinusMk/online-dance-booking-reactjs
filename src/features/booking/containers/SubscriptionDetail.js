import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/subscription-detail-module.scss'
import { globalGetService } from '../../../utils/globalApiServices';
import { checkNumberOfDaysLeft, toastFlashMessage } from '../../../utils';
import Shimmer from '../components/Shimmer'

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
        globalGetService(`subscriptions/category/${sessionStorage.getItem('subscriptionId')}`)
        .then(response => {
            if(response.success === true){
                setSubscriptionInfo(response.data)
                const activeSubscription = response.data && response.data.find(sub => sub.status == "active")
                if(activeSubscription){
                    setActiveSubscription({
                        ...activeSubscription,
                        userSubscription: {
                            ...activeSubscription.userSubscription,
                            danceClassesAttended: activeSubscription.danceClassNumber ? activeSubscription.danceClassNumber : activeSubscription.danceClassesAttended,
                            months: activeSubscription.months,
                            name: activeSubscription.name,
                            danceClasses: activeSubscription.danceClasses
                        }
                    })
                    console.log(`checkNumberOfDaysLeft(activeSubscription.endDate)`, checkNumberOfDaysLeft(activeSubscription.userSubscription?.endDate))
                    // setRenewal(checkNumberOfDaysLeft(activeSubscription.userSubscription?.endDate) <= 7 ? true : false)
                    setRenewal(false)
                    setLoader(false)
                }else{
                    setRenewal(false)
                    setActiveSubscription('')
                    setLoader(false)
                }
            }else if(!response.success && response.message){
                toastFlashMessage(response.message, 'error')
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
            <Container className="subscription-detail-container">
                {
                loader ? <Shimmer /> : <Suspense fallback={<></>}>
                    <SubscriptionInfo subscription={activeSubscription ? activeSubscription.userSubscription : subscriptionInfo.length ? subscriptionInfo[0] : {}} active={activeSubscription ? true : false}/>
                    <SubscriptionBenefits category={props.match.params.category}/>
                    {(activeSubscription && !renewal) ? null : <>
                        <SubscriptionPlans subscriptions={subscriptionInfo} isRenewal={renewal}/>
                        <ClassBookingAlert subscription={subscriptionInfo.length ? subscriptionInfo[0] : {}}/>
                    </>}
                    {/* <SubscriptionPlans subscriptions={subscriptionInfo} isRenewal={renewal}/> */}
                    <HowWorks />
                    <CommonQuestions/>
                    <ContactUs/>
                    </Suspense>
                }
                </Container>
        </section>
    )
}