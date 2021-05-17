import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Header, DanceInformationCard, DanceInformationLoader } from  '../../../shared_elements'
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import firebase from '../../../utils/firebase'
import { toastFlashMessage, checkIsFinished } from '../../../utils'
import { globalGetService, globalPostService } from '../../../utils/globalApiServices';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../../assets/styles/booking-module.scss'
import { imageBasePath, currencySymbol, RAZOR_PAY_KEY } from '../../../constants';

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
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setBookingLoader(false)
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
            globalGetService(`subscriptionsById/${props.match.params.subsctiptionId}`)
            .then(response => {
                if(response.success == true){
                    setLoader(false)
                    setSelectedItem(response.data)
                    if(response.data?.status == "active"){
                        toastFlashMessage(`You have already subscribed to the same plan`, 'error')
                        props.history.push(`/`)
                    }
                }
            })
            // setSelectedItem({
            //     cost: 1400,
            //     cost_old: 2000,
            //     rating: 4.5,
            //     rating_count: 89,
            //     points: ['All dance levels - from beginner to expert', '8 to 12 classes a month','All dance levels - from beginner to expert', '8 to 12 classes a month']
            // })
        }
    }, [])
    const onBack = () => {
        if(props.location.state && props.location.state.sectionId){
            props.history.push(`/schedule#${props.location.state.sectionId}`)
        }else if(props.location.state && props.location.state.prevPath){
            props.history.push({
                pathname: props.location.state.prevPath,
                state: { prevPath: props.location.state.secondaryPrevPath ? props.location.state.secondaryPrevPath : '/'}
            })
        }else if(props.match.params.id){
            props.history.push(`/dance/${props.match.params.category}`)
        }else{
            props.history.push(`/subscription/${props.match.params.category}`)
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
        .then(response => {
            // console.log('response booking', response)
            setBookingLoader(false)
            if(response.success == true){
                history.push({pathname: `${props.location.pathname}/success`, state: { selectedItem: {...selectedItem, payment_method: (response.data && response.data.payment_method) ? response.data.payment_method : 'online' }}})
            }else if(response.message && !response.success){
                toastFlashMessage(response.message, 'error')
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
            if(checkIsFinished(selectedItem.endTime)){
                toastFlashMessage(`OOPS!! The Dance class your're trying to book has been over already!`, 'error')
                setTimeout(() => {
                    props.history.push(`/schedule`)
                }, 500);
            }else{
                let formData = {
                    dance_id: selectedItem.id,
                    name: userInfo.displayName,
                    email: userInfo.email,
                    mobile: userInfo.phoneNumber,
                    paymentId: ''
                }
                if(payment == "online"){
                    setupOnlinePayment(formData, userInfo)
                }else{
                    createBookingApi(formData)
                }
            }
        }else{
            setBookingLoader(true)
            let formData = {
                subscriptionId: props.match.params.subsctiptionId,
                name: userInfo.displayName,
                email: userInfo.email,
                mobile: userInfo.phoneNumber
            }
            setupOnlinePayment(formData, userInfo)
        }
    }
    const setupOnlinePayment = (formData={}, userInfo={}) => {
        let params = {
            "key": RAZOR_PAY_KEY,
            // "key": "rzp_live_x5PdyxY6pBcPeC",
            "currency": selectedItem.currencyType,
            "amount": selectedItem.cost ? selectedItem.cost * 100 : selectedItem.discountedCost * 100,
            "name": userInfo.displayName,
            "description": "Test Transaction",
            "image": `${imageBasePath}logo_512.png`,
            "handler": function (response){
                // console.log('handler response', response)
                if(type == "danceBooking"){
                    createBookingApi({...formData, paymentId: response.razorpay_payment_id})
                }else{
                    buySubscriptionApi({...formData, paymentId: response.razorpay_payment_id})
                }
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
    }
    const buySubscriptionApi = (formData) => {
        globalPostService(`buySubscription`, formData)
        .then(response => {
            setBookingLoader(false)
            if(response.success == true){
                history.push({pathname: `${props.location.pathname}/success`, state: { selectedItem: {...selectedItem, payment_method: (response.data && response.data.payment_method) ? response.data.payment_method : 'online'  }}})
            }else if(response.message && !response.success){
                toastFlashMessage(response.message, 'error')
            }else if(response.error){
                toastFlashMessage(response.error, 'error')
            }
        })
        // .catch(err => {
        //     setBookingLoader(false)
        //     toastFlashMessage('Something went wrong, Please try again!', 'error')
        // })
    }
    const handleChangePayment = (e) => {
        setPayment(e.target.value)
    }
    return(
        <section className="booking-section">
            <Header onBack={onBack} title={props.isLoggedIn ? "Review your selection" : "Booking details"}/>
            <Container className="booking-container" style={bookingLoader ? { opacity: 0.2} :{}}>
                <p className="secondaryText metaText">{`SELECTED ${type == "danceBooking" ? 'CLASS' : 'SUBSCRIPTION'}`}</p>
                { loader ? <DanceInformationLoader /> : type == "danceBooking" ? <DanceInformationCard dance={selectedItem} category={category}/> : <Suspense fallback={<></>}><SubscriptionInformation subscription={selectedItem} /></Suspense>}
                <Grid container spacing={0} className="dance-attributes">
                    <Grid item xs={7}>
                        <div className="timeWrapper">
                            <p className="secondaryText">{type == "danceBooking" ? 'DATE & TIME' : 'DURATION'}</p>
                            {loader ? <Skeleton variant="rect" height={24} width={160}/> : type == "danceBooking" ? <h3 className="heading3">{`${moment(selectedItem.eventDate).format('DD MMM')}, ${moment(selectedItem.class_start_time).format('hh:mm A')}`}</h3> : <h3 className="heading3">{`${selectedItem.months} ${selectedItem.months > 1 ? 'months' : 'month'}`}</h3>}
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="amountWrapper">
                            <p className="secondaryText">AMOUNT</p>
                            {loader ? <Skeleton variant="rect" height={24}  /> : <h3 className="heading3 cost"><span>{`${currencySymbol[selectedItem.currencyType]}${selectedItem.actualCost}`}</span>{`${currencySymbol[selectedItem.currencyType]}${selectedItem.discountedCost}`}</h3>}
                        </div>
                    </Grid>
                </Grid>
                <Suspense fallback={<></>}>
                    { props.isLoggedIn ? <LoggedInUserInfo user={props.userInfo} logout={logout} handleSubmit={handleSubmit}/>: 
                    <>
                        <div className="login-button-wrapper">
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