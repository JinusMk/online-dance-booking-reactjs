import React, { useEffect, useState } from 'react'
import { Header, DanceInformationCard, AuthPopup } from  '../../../shared_elements'
import { Container, Grid } from '@material-ui/core';
import moment from 'moment'
import { UserInformationForm, LoggedInUserInfo } from '../components'
import { AUTH_STATUS_UPDATE } from '../../../shared_elements/actions'
import { connect } from 'react-redux'
import firebase from '../../../utils/firebase'
import { toastFlashMessage } from '../../../utils'
import '../../../assets/styles/booking-module.scss'

function Booking(props){
    const [ dance, setDance ] = useState({
        id: 1, rating: 4.5,img: require('../../../assets/images/zumba_logo_card.svg'), title: "Zumba", ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86'
    })
    const [selectedDate, setSelectedDate] = useState(moment())
    const [selectedTime, setSelectedTime] = useState('')
    const [openAuthPopup, setOpenAuthPopup] = useState(false)
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
    const logout = () => {
        if(window.confirm('ARE YOU SURE YOU WANT TO LOGOUT ?')){
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
                {props.isLoggedIn ? <LoggedInUserInfo user={props.userInfo} logout={logout} handleSubmit={() => console.log('handleSubmit clicked booking')}/>: <><div className="login-button-wrapper">
                        <p className="secondaryText">HAVE AN ACCOUNT ?</p>
                        <p><a className="secondaryBtn" onClick={() => setOpenAuthPopup(true)}>TAP HERE TO LOGIN</a></p>
                    </div>
                    <UserInformationForm />                    
                    </>
                }
            </Container>
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
    userInfo: state.sharedReducers.userInfo
})
// const mapDispatchToProps = (dispath) => ({
//     updateAuthStatus : (flag) => dispath({
//         type: AUTH_STATUS_UPDATE,
//         payload: flag
//     })
// })
export default connect(mapStateToProps)(Booking)