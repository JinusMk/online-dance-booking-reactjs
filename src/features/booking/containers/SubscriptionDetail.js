import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/subscription-detail-module.scss'

const SubscriptionInfo = lazy(() => import('../components/SubscriptionInfo'));
const SubscriptionBenefits = lazy(() => import('../components/SubscriptionBenefits'));
const SubscriptionPlans = lazy(() => import('../components/SubscriptionPlans'));

export default function SubscriptionDetail(props){
    const [loader, setLoader] = useState(false)
    const [category, setCategory] = useState('')

    useEffect(() => {
        const category = props.match.params.category
        setCategory(category)
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
                    </Suspense>
                </Container>
            }
        </section>
    )
}