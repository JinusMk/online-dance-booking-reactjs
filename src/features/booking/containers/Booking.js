import React, { useEffect, useState } from 'react'
import { Header, DanceInformationCard, AuthPopup } from  '../../../shared_elements'
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { UserInformationForm, LoggedInUserInfo } from '../components'
import { connect } from 'react-redux'
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils'
import { globalGetService } from '../../../utils/globalApiServices';
import '../../../assets/styles/booking-module.scss'

function Booking(props){
    const [openAuthPopup, setOpenAuthPopup] = useState(false)
    const [category, setCategory] = useState(props.match.params.slug)
    const [selectedDance, setSelectedDance] = useState(
        {
            "id": 11,
            "title": "Bollywood",
            "rating": 2,
            "img": "",
            "rating_count": 20,
            "cost_old": 20,
            "cost": 10,
            "date": '12-10-2020',
            "instructor": {
                "name": "New admin",
                "img": "",
                "ratingCount": 20,
                "rating": 2,
                "expert": "Bollywood",
                "experience": "5 years",
                "classes": "51"
            },
            "slot": "evening",
            "label": "aa",
            "description": null,
            "duration": "1 hours",
            "participants": 0,
            "class_start_time": "5:57 PM",
            "class_end_time": "6:57 PM"
        }
    )
    const [loader, setLoader] = useState(true)

    let history = useHistory()
    useEffect(() => {
        setLoader(false)
        // globalGetService(`dance-classes/${props.match.params.id}`, {})
        // .then(response => {
        //     console.log('response', response)
        // })
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
                console.log('logout success', res)
                toastFlashMessage(`YOU'RE NOW LOGGED OUT`, 'success')
                localStorage.clear()
            })
            .catch(err => {
                console.log('logout error', err)
            })
        }
    }
    const handleSubmit = (userInfo) => {
        console.log('booking continue clicked', userInfo)
        history.push({pathname: `/dance/${selectedDance.id}/booking/success`, state: { selectedDance: selectedDance }})
    }
    return(
        <section className="booking-section">
            <Header onBack={onBack} title={props.isLoggedIn ? "Review your selection" : "Just one more step"}/>
            {loader ? 'Loading...' :  <Container className="booking-container">
                <p className="secondaryText metaText">SELECTED CLASS</p>
                <DanceInformationCard dance={selectedDance} category={category}/>
                <Grid container spacing={0} className="dance-attributes">
                    <Grid item xs={7}>
                        <div className="timeWrapper">
                            <p className="secondaryText">DATE & TIME</p>
                            <h3 className="heading3">{`${moment(selectedDance.date, 'DD-MM-YYYY').format('DD MMM')}, ${selectedDance.class_start_time}`}</h3>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="amountWrapper">
                            <p className="secondaryText">AMOUNT</p>
                            <h3 className="heading3 cost"><span>₹{selectedDance.cost_old}</span>₹{selectedDance.cost}</h3>
                        </div>
                    </Grid>
                </Grid>
                {props.isLoggedIn ? <LoggedInUserInfo user={props.userInfo} logout={logout} handleSubmit={handleSubmit}/>: <><div className="login-button-wrapper">
                        <p className="secondaryText">HAVE AN ACCOUNT ?</p>
                        <p><a className="secondaryBtn" onClick={() => setOpenAuthPopup(true)}>TAP HERE TO LOGIN</a></p>
                    </div>
                    <UserInformationForm handleSubmit={handleSubmit}/>                    
                    </>
                }
            </Container>
            }
            {
                <AuthPopup 
                    open={openAuthPopup}
                    handleClose={() => setOpenAuthPopup(false)}
                />
            }
        </section>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userInfo: state.sharedReducers.userInfo,
})
export default connect(mapStateToProps)(Booking)