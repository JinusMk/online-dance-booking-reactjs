import React, { useEffect, useState } from 'react'
import { Header, DanceInformationCard } from  '../../../shared_elements'
import { Container, Grid } from '@material-ui/core';
import moment from 'moment'
import { UserInformationForm } from '../components'
import '../../../assets/styles/booking-module.scss'

export default function Booking(props){
    const [ dance, setDance ] = useState({
        id: 1, rating: 4.5,img: require('../../../assets/images/zumba_logo_card.svg'), title: "Zumba", ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86'
    })
    const [selectedDate, setSelectedDate] = useState(moment())
    const [selectedTime, setSelectedTime] = useState('')
    useEffect(() => {
        console.log(props.location.state)
        if(props.location.state){
            const { selectedDate, time } = props.location.state
            setSelectedDate(selectedDate)
            setSelectedTime(time)
        }
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
                <p className="secondaryText metaText">SELECTED CLASS</p>
                <DanceInformationCard dance={dance} />
                <Grid container spacing={0} className="dance-attributes">
                    <Grid item xs={7}>
                        <div className="timeWrapper">
                            <p className="secondaryText">DATE & TIME</p>
                            <h3 className="heading3">{`${moment(selectedDate).format('DD MMM')}, ${selectedTime}`}</h3>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="amountWrapper">
                            <p className="secondaryText">AMOUNT</p>
                            <h3 className="heading3 cost"><span>{dance.costOld}</span>{dance.cost}</h3>
                        </div>
                    </Grid>
                </Grid>
                <div className="login-button-wrapper">
                    <p className="secondaryText">HAVE AN ACCOUNT ?</p>
                    <p><a className="secondaryBtn">TAP HERE TO LOGIN</a></p>
                </div>
                <UserInformationForm />
            </Container>
        </section>
    )
}