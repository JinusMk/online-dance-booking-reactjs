import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Container } from '@material-ui/core';
import moment from 'moment'
import { connect } from 'react-redux'
import '../../../assets/styles/booking-success-module.scss'
import { imageBasePath, currencySymbol } from '../../../constants';

const DanceInformationCard = lazy(() => import('../../../shared_elements/DanceInformationCard'))
const AddToHomeScreen = lazy(() => import('../../../shared_elements/AddToHomeScreen'))
const SubscriptionInformation = lazy(() => import ('../components/SubscriptionInformation'))

function BookingSuccess(props){
    const [selectedItem, setSelectedItem] = useState('')
    const [loader, setLoader] = useState(true)
    const [category, setCategory] = useState(props.match.params.category)
    const [type, setType] = useState('danceBooking')
    useEffect(() => {
        if(props.location.state){
            const { selectedItem } = props.location.state
            setSelectedItem(selectedItem)
            setLoader(false)
        }else{
            setSelectedItem({
                cost: 1400,
                cost_old: 2000,
                rating: 4.5,
                rating_count: 89,
                points: ['All dance levels - from beginner to expert', '8 to 12 classes a month','All dance levels - from beginner to expert', '8 to 12 classes a month']
            })
            setLoader(false)
        }
        setCategory(props.match.params.category)
        setType(props.match.params.id ? 'danceBooking' : 'subscription')
    }, [])
    return(
        <section className={`booking-success-section ${type}`}>
            {loader ? 'Loading...' : <Container className="booking-success-container">
                    <div className="success-wrapper" style={{backgroundImage: `url(${imageBasePath}booking_success_bg.svg)`}}>
                        <img src={`${imageBasePath}dancing_emoji.svg`}/>
                        <h3 className="heading1 success">Woohoo!</h3>
                        <p className="heading3">{type == "danceBooking" ? `Your ${selectedItem.title} class is booked.` : `Your purchase is complete.`}</p>
                        {type == "danceBooking" ? <div className="reminder-text">
                            <img src={`${imageBasePath}booking_success_tick.svg`}/>
                            <p className="paragraph">Please check your mail for the class link and we will remind you 10 minutes before your class begins</p>
                        </div> : null}
                    </div>
                    <Suspense fallback={<></>}>
                        {type == "danceBooking" ? <DanceInformationCard dance={selectedItem} category={category}/> : <SubscriptionInformation category={category} subscription={selectedItem} />}
                    </Suspense>
                    <div className="selectedDate">
                        {
                            type == "danceBooking" ? <>
                                <p className="secondaryText">DATE & TIME</p>
                                <h3 className="heading3">{`${moment(selectedItem.event_date, 'DD-MM-YYYY').format('DD MMM')}, ${selectedItem.class_start_time}`}</h3>
                            </> : <>
                                <p className="secondaryText">DURATION</p>
                                <h3 className="heading3">1 month</h3>
                            </>
                        }
                    </div>
                    <Suspense fallback={<></>}>
                        <AddToHomeScreen/>
                    </Suspense>
                    <div className="payment-method">
                        <p className="secondaryText">PAY AT CLASS</p>
                        <p className="heading3"><span className="cost-old">{`${currencySymbol[selectedItem.currencyType]}${selectedItem.cost_old}`}</span>{`${currencySymbol[selectedItem.currencyType]}${selectedItem.cost}`}</p>
                    </div>
                    <div className="need-help">
                        <p className="secondaryText">NEED HELP ON THIS BOOKING ?</p>
                        <p className="paragraph link"><a>Contact admin@letzdance.co</a></p>
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