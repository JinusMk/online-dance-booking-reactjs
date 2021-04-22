import React, { Suspense, lazy, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core';
import '../../../assets/styles/privacy-policy-module.scss'
import { Header } from '../../../shared_elements';
import { privacyPolicyData } from '../../../constants'

const PrivacyPolicyItem = lazy(() => import('../components/PrivacyPolicyItem'))
const ContactUs = lazy(() => import('../../home/components/ContactUs'))

export default function PrivacyPolicy(props){
    const handleBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(props.location.state.prevPath)
        }else{
            props.history.push('/')
        }
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return(
        <section className="privacy-policy-section">
            <Header onBack={handleBack} title="Privacy Policy" />
            <Container className="privacy-policy-container">
                <Grid container>
                    <Suspense fallback={<></>}>
                        {
                            privacyPolicyData.map((item, index) => <PrivacyPolicyItem title={item.title} content={item.content} key={index}/>)
                        }
                        <Grid item xs={12}>
                            <ContactUs />
                        </Grid>
                    </Suspense>
                </Grid>
            </Container>
        </section>
    )
}