import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Header, DanceInformationCard, DanceInformationLoader } from  '../../../shared_elements'
import { Container, Grid, CircularProgress, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils'
import { globalGetService, globalPostService } from '../../../utils/globalApiServices';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../../assets/styles/booking-module.scss'
import { imageBasePath, currencySymbol } from '../../../constants';

const LoggedInUserInfo = lazy(() => import ('../components/LoggedInUserInfo'))
const UserInformationForm = lazy(() => import ('../components/UserInformationForm'))
const SubscriptionInformation = lazy(() => import ('../components/SubscriptionInformation'))
const AuthPopup = lazy(() => import('../../../shared_elements/AuthPopup'))

function Booking(props){
    const [openAuthPopup, setOpenAuthPopup] = useState(false)
    const [category, setCategory] = useState(props.match.params.category)
    const [selectedItem, setSelectedItem] = useState({})
    const [loader, setLoader] = useState(true)
    const [bookingLoader, setBookingLoader] = useState(false)
    const [type, setType] = useState('')
    const [payment, setPayment] = useState('online')
    let history = useHistory()

    useEffect(() => {
        if(props.match.params.id){
            setType('danceBooking')
            globalGetService(`dance-classes/${props.match.params.id}`, {})
            .then(response => {
                if(response.success == true){
                    setSelectedItem(response.data)
                    setLoader(false)
                }
            })
        }else{
            //get subscription details api
            setType('subscription')
            setCategory(props.match.params.category)
            setSelectedItem({
                cost: 1400,
                cost_old: 2000,
                rating: 4.5,
                rating_count: 89,
                points: ['All dance levels - from beginner to expert', '8 to 12 classes a month','All dance levels - from beginner to expert', '8 to 12 classes a month']
            })
            setLoader(false)
        }
    }, [])
    const onBack = () => {
        if(props.location.state && props.location.state.sectionId){
            props.history.push(`/schedule#${props.location.state.sectionId}`)
        }else{
            props.history.push(`/dance/${props.match.params.category}`)
        }
    }
    const logout = () => {
        if(window.confirm('Are you sure you want to logout ?')){
            firebase.auth().signOut()
            .then(res => {
                toastFlashMessage(`YOU'RE NOW LOGGED OUT`, 'success')
                localStorage.clear()
            })
            .catch(err => {
                // console.log('logout error', err)
            })
        }
    }
    const createBookingApi = (formData) => {
        globalPostService(`bookings/create`, formData)
        // const options = {
        //     headers: {'Authorization': JSON.parse(localStorage.getItem('idToken'))}
        //   };
        // axios.post(`http://13.59.63.39/api/4/bookings/create`, formData, options)
        .then(response => {
            // console.log('response booking', response)
            setBookingLoader(false)
            if(response.success == true){
                history.push({pathname: `${props.location.pathname}/success`, state: { selectedItem: {...selectedItem, payment_method: response.data.payment_method }}})
            }else if(response.error){
                toastFlashMessage(response.error, 'error')
            }
        })
        .catch(err => {
            setBookingLoader(false)
            toastFlashMessage('Something went wrong, Please try again!', 'error')
        })
    }
    const handleSubmit = (userInfo) => {
        setBookingLoader(true)
        // console.log('booking continue clicked', userInfo)
        if(type == "danceBooking"){
            let formData = {
                dance_id: selectedItem.id,
                name: userInfo.displayName,
                email: userInfo.email,
                mobile: userInfo.phoneNumber,
                uid: userInfo.uid,
                paymentId: ''
            }
            if(payment == "online"){
                let params = {
                    "key": "rzp_test_NKXGcWEaRQd4SH",
                    // "key": "rzp_live_x5PdyxY6pBcPeC",
                    "currency": selectedItem.currencyType,
                    "amount": selectedItem.cost * 100,
                    "name": userInfo.displayName,
                    "description": "Test Transaction",
                    "image": `${imageBasePath}logo_512.png`,
                    "handler": function (response){
                        console.log('handler response', response)
                        createBookingApi({...formData, paymentId: response.razorpay_payment_id})
                    },
                    "modal": {
                        "ondismiss": function(){
                            setBookingLoader(false)
                        }
                    },
                    "prefill": {
                        "name": userInfo.displayName,
                        "email": userInfo.email,
                        "contact" : userInfo.phoneNumber
                    },
                    "notes": {
                        "name": userInfo.displayName,
                        "email": userInfo.email,
                        "contact" : userInfo.phoneNumber,
                    },
                    "theme": {
                        "color": "#AE0423"
                    }
                }
                let rzp = new window.Razorpay(params);
                rzp.on('payment.failed', function (response){
                    console.log('response err', response)
                    setBookingLoader(false)
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                rzp.open();
            }else{
                createBookingApi(formData)
            }
            
        }else{
            //
            setBookingLoader(false)
        }
    }
    const handleChangePayment = (e) => {
        setPayment(e.target.value)
    }
    return(
        <section className="booking-section">
            <Header onBack={onBack} title={props.isLoggedIn ? "Review your selection" : "Booking details"}/>
            <Container className="booking-container" style={bookingLoader ? { opacity: 0.2} :{}}>
                <p className="secondaryText metaText">{`SELECTED ${type == "danceBooking" ? 'CLASS' : 'SUBSCRIPTION'}`}</p>
                { loader ? <DanceInformationLoader /> : type == "danceBooking" ? <DanceInformationCard dance={selectedItem} category={category}/> : <Suspense fallback={<></>}><SubscriptionInformation subscription={selectedItem} category={category} /></Suspense>}
                <Grid container spacing={0} className="dance-attributes">
                    <Grid item xs={7}>
                        <div className="timeWrapper">
                            <p className="secondaryText">{type == "danceBooking" ? 'DATE & TIME' : 'DURATION'}</p>
                            {loader ? <Skeleton variant="rect" height={24} width={160}/> : type == "danceBooking" ? <h3 className="heading3">{`${moment(selectedItem.event_date, 'DD-MM-YYYY').format('DD MMM')}, ${moment(selectedItem.class_start_time).format('hh:mm A')}`}</h3> : <h3 className="heading3">1 month</h3>}
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="amountWrapper">
                            <p className="secondaryText">AMOUNT</p>
                            {loader ? <Skeleton variant="rect" height={24}  /> : <h3 className="heading3 cost"><span>{`${currencySymbol[selectedItem.currencyType]}${selectedItem.cost_old}`}</span>{`${currencySymbol[selectedItem.currencyType]}${selectedItem.cost}`}</h3>}
                        </div>
                    </Grid>
                </Grid>
                <Suspense fallback={<></>}>
                    { props.isLoggedIn ? <LoggedInUserInfo user={props.userInfo} logout={logout} handleSubmit={handleSubmit}/>: 
                    <>
                        <div className="login-button-wrapper hidden">
                            <p className="secondaryText">HAVE AN ACCOUNT ?</p>
                            <p><a className="secondaryBtn" onClick={() => setOpenAuthPopup(true)}>TAP HERE TO LOGIN</a></p>
                        </div>
                        <UserInformationForm handleSubmit={handleSubmit}/>                    
                    </>
                    }
                </Suspense>
                {/* <div className="payment-options-wrapper">
                    <RadioGroup aria-label="payment-options" name="payment-options" className="radioGroup" value={payment} onChange={handleChangePayment}>
                        <FormControlLabel value="online" control={<Radio />} label={<div className={`label ${payment == "online" ? 'active': ''}`}>
                            <p className="secondaryText">PAY ONLINE</p>
                        </div>} />
                        <FormControlLabel value="offline" control={<Radio />} label={<div className={`label ${payment == "offline" ? 'active': ''}`}>
                            <p className="secondaryText">PAY AT CLASS</p>
                        </div>} />
                    </RadioGroup>
                </div> */}
            </Container>
            {
                bookingLoader ? <div className="screen-loader-wrapper">
                    <CircularProgress className="loader"/>
                </div> : null
            }
            <Suspense fallback={<></>}>
                <AuthPopup 
                    open={openAuthPopup}
                    handleClose={() => setOpenAuthPopup(false)}
                />
            </Suspense>
        </section>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userInfo: state.sharedReducers.userInfo,
})

export default connect(mapStateToProps)(Booking)