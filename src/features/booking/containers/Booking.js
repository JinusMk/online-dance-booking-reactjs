import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Header, DanceInformationCard, DanceInformationLoader } from  '../../../shared_elements'
import { Container, Grid, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils'
import { globalGetService, globalPostService } from '../../../utils/globalApiServices';
import Skeleton from '@material-ui/lab/Skeleton';
import '../../../assets/styles/booking-module.scss'

const LoggedInUserInfo = lazy(() => import ('../components/LoggedInUserInfo'))
const UserInformationForm = lazy(() => import ('../components/UserInformationForm'))
const AuthPopup = lazy(() => import('../../../shared_elements/AuthPopup'))

function Booking(props){
    const [openAuthPopup, setOpenAuthPopup] = useState(false)
    const [category, setCategory] = useState(props.match.params.slug)
    const [selectedDance, setSelectedDance] = useState({})
    const [loader, setLoader] = useState(true)
    const [bookingLoader, setBookingLoader] = useState(false)
    let history = useHistory()

    useEffect(() => {
        globalGetService(`dance-classes/${props.match.params.id}`, {})
        .then(response => {
            if(response.success == true){
                setSelectedDance(response.data)
                setLoader(false)
            }
        })
    }, [])
    const onBack = () => {
        if(props.location.state && props.location.state.sectionId){
            props.history.push(`/schedule#${props.location.state.sectionId}`)
        }else{
            props.history.push(`/dance/${props.match.params.slug}`)
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
    const handleSubmit = (userInfo) => {
        // console.log('booking continue clicked', userInfo)
        const formData = {
            dance_id: selectedDance.id,
            name: userInfo.displayName,
            email: userInfo.email,
            mobile: userInfo.phoneNumber,
            uid: userInfo.uid
        }
        // console.log('formData booking', formData)
        setBookingLoader(true)
        globalPostService(`bookings/create`, formData)
        .then(response => {
            // console.log('response booking', response)
            setBookingLoader(false)
            if(response.success == true){
                history.push({pathname: `${props.location.pathname}/success`, state: { selectedDance: {...selectedDance, payment_method: response.data.payment_method }}})
            }
        })
        .catch(err => {
            setBookingLoader(false)
            toastFlashMessage('Something went wrong, Please try again!', 'error')
        })
    }
    return(
        <section className="booking-section">
            <Header onBack={onBack} title={props.isLoggedIn ? "Review your selection" : "Booking details"}/>
            <Container className="booking-container" style={bookingLoader ? { opacity: 0.2} :{}}>
                <p className="secondaryText metaText">SELECTED CLASS</p>
                { loader ? <DanceInformationLoader /> : <DanceInformationCard dance={selectedDance} category={category}/>}
                <Grid container spacing={0} className="dance-attributes">
                    <Grid item xs={7}>
                        <div className="timeWrapper">
                            <p className="secondaryText">DATE & TIME</p>
                            {loader ? <Skeleton variant="rect" height={24} width={160}/> : <h3 className="heading3">{`${moment(selectedDance.event_date, 'DD-MM-YYYY').format('DD MMM')}, ${selectedDance.class_start_time}`}</h3>}
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="amountWrapper">
                            <p className="secondaryText">AMOUNT</p>
                            {loader ? <Skeleton variant="rect" height={24}  /> : <h3 className="heading3 cost"><span>₹{selectedDance.cost_old}</span>₹{selectedDance.cost}</h3>}
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