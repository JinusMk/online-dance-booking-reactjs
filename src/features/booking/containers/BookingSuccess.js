import React, { useEffect, useState } from 'react'
import { DanceInformationCard, AddToHomeScreen } from  '../../../shared_elements'
import { Container, Grid } from '@material-ui/core';
import moment from 'moment'
import { connect } from 'react-redux'
import '../../../assets/styles/booking-success-module.scss'
import { imageBasePath } from '../../../constants';

function BookingSuccess(props){
    const [selectedDance, setSelectedDance] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        console.log(props.location.state)
        if(props.location.state){
            const { selectedDate, selectedDance } = props.location.state
            setSelectedDate(selectedDate)
            setSelectedDance(selectedDance)
            setLoader(false)
        }
    }, [])
    return(
        <section className="booking-success-section">
            <Container className="booking-success-container">
                <div className="success-wrapper" style={{backgroundImage: `url(${imageBasePath}booking_success_bg.svg)`}}>
                    <img src={`${imageBasePath}dancing_emoji.svg`}/>
                    <h3 className="heading1 success">Woohoo!</h3>
                    {/* <p className="heading3">{`Your ${props.selectedDance.title} class is booked.`}</p> */}
                    <p className="heading3">{`Your Zumba class is booked.`}</p>
                    <div className="reminder-text">
                        <img src={`${imageBasePath}booking_success_tick.svg`}/>
                        <p className="paragraph">We’ll remind you 10 minutes before your Zumba class begins.</p>
                    </div>
                </div>
                <DanceInformationCard dance={selectedDance} />
                <div className="selectedDate">
                    <p className="secondaryText">DATE & TIME</p>
                    <h3 className="heading3">{`${moment(selectedDate.date).format('DD MMM')}, ${selectedDate.time}`}</h3>
                </div>
                <AddToHomeScreen/>
                <div className="need-help">
                    <p className="secondaryText">NEED HELP ON THIS BOOKING ?</p>
                    <p className="paragraph link"><a>Contact help@letzdance.co</a></p>
                </div>
            </Container>
        </section>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userInfo: state.sharedReducers.userInfo,
})
export default connect(mapStateToProps)(BookingSuccess)