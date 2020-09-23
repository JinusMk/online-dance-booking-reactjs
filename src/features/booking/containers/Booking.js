import React, { useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import '../../../assets/styles/booking-module.scss'

export default function Booking(props){
    useEffect(() => {
        console.log(props.location.state)
    }, [])
    const onBack = () => {
        if(props.location.state && props.location.state.sectionId){
            props.history.push(`/schedule#${props.location.state.sectionId}`)
        }else{
            props.history.push(`/dance/${props.match.params.id}`)
        }
    }
    return(
        <section className="booking-section">
            <Header onBack={onBack} title="Just one more step"/>
            <Container className="booking-container">

            </Container>
        </section>
    )
}