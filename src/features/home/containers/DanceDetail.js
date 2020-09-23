import React, { Suspense, lazy, useState } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import { Gallery, DanceInfo, TimeSlots } from '../components'
import '../../../assets/styles/dance-detail-module.scss'

const InstructorCard = React.lazy(() => import('../components/InstructorCard'));
const HowWorks = React.lazy(() => import('../components/HowWorks'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));

export default function DanceDetail(props){
    const [ dance, setDance ] = useState({
        id: 1, rating: 4.5, title: "Zumba", ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86'
    })
    return(
        <section className="dance-detail-section">
            <Header onBack={() => props.history.push('/')} title={dance.title}/>
            <Container maxWidth={false} className="dance-detail-container">
                <Gallery/>
                <DanceInfo dance={dance}/>
                <TimeSlots danceId={dance.id}/>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="instructor block">
                        <h3 className="heading2 title">Instructor</h3>
                        <InstructorCard instructor={dance.instructor}/>
                    </div>
                    <HowWorks />
                    <ContactUs /> 
                </Suspense>
            </Container>
        </section>
    )
}