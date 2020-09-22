import React from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/booking-module.scss'

export default function Booking(props){
    return(
        <section className="booking-section">
            <Header onBack={() => props.history.push('/schedule')} title="Just one more step"/>
            <Container className="booking-container">
                
            </Container>
        </section>
    )
}