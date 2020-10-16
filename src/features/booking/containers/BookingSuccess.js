import React, { useEffect, useState } from 'react'
import { DanceInformationCard, AddToHomeScreen } from  '../../../shared_elements'
import { Container, Grid } from '@material-ui/core';
import moment from 'moment'
import { connect } from 'react-redux'
import '../../../assets/styles/booking-success-module.scss'
import { imageBasePath } from '../../../constants';

function BookingSuccess(props){
    const [selectedDance, setSelectedDance] = useState('')
    const [loader, setLoader] = useState(true)
    const [category, setCategory] = useState(props.match.params.slug)
    useEffect(() => {
        console.log(props.location.state)
        if(props.location.state){
            const { selectedDance } = props.location.state
            setSelectedDance(selectedDance)
            setLoader(false)
        }
        setCategory(props.match.params.slug)
    }, [])
    return(
        <section className="booking-success-section">
            {loader ? 'Loading...' : <Container className="booking-success-container">
                    <div className="success-wrapper" style={{backgroundImage: `url(${imageBasePath}booking_success_bg.svg)`}}>
                        <img src={`${imageBasePath}dancing_emoji.svg`}/>
                        <h3 className="heading1 success">Woohoo!</h3>
                        <p className="heading3">{`Your ${selectedDance.title} class is booked.`}</p>
                        <div className="reminder-text">
                            <img src={`${imageBasePath}booking_success_tick.svg`}/>
                            <p className="paragraph">We’ll remind you 10 minutes before your Zumba class begins.</p>
                        </div>
                    </div>
                    <DanceInformationCard dance={selectedDance} category={category}/>
                    <div className="selectedDate">
                        <p className="secondaryText">DATE & TIME</p>
                        <h3 className="heading3">{`${moment(selectedDance.date, 'DD-MM-YYYY').format('DD MMM')}, ${selectedDance.class_start_time}`}</h3>
                    </div>
                    <AddToHomeScreen/>
                    <div className="payment-method">
                        <p className="secondaryText">PAY AT CLASS</p>
                        <p className="heading3"><span className="cost-old">₹{selectedDance.cost_old}</span>₹{selectedDance.cost}</p>
                    </div>
                    <div className="need-help">
                        <p className="secondaryText">NEED HELP ON THIS BOOKING ?</p>
                        <p className="paragraph link"><a>Contact help@letzdance.co</a></p>
                    </div>
            </Container>}
        </section>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userInfo: state.sharedReducers.userInfo,
})
export default connect(mapStateToProps)(BookingSuccess)