import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import Skeleton from '@material-ui/lab/Skeleton';
import { responsiveCarousel, imageBasePath } from '../../../constants'
import "react-multi-carousel/lib/styles.css";
import { globalGetService, globalPostService } from '../../../utils/globalApiServices';
import { connect } from 'react-redux'
import { DanceAlert, SubscriptionAlert } from '../../../shared_elements';
import { checkIsFinished } from '../../../utils';
import { UPDATE_BANNER } from '../actions'
import { UPDATE_SUBSCRIPTIONS, UPDATE_TODAY_DANCECLASSES } from '../../../shared_elements/actions'

function Introduction(props){
    const [imgLoader, setImgLoader] = useState(true)
    // const [introductionData, setIntroductionData] = useState([])
    const [loader, setLoader] = useState(true)
    const [showBanner, setShowBanner] = useState(true)

    useEffect(() => {
        if(!(props.bannerData && props.bannerData.length)){
            globalGetService(`banners`)
            .then(response => {
                if(response.success === true){
                    props.updateBanner(response.data)
                    // setIntroductionData(response.data)
                    setLoader(false)
                }else{
                    props.updateBanner('')
                }
            })
        }
    }, [])
    useEffect(() => {
        if(props.isLoggedIn){
            globalGetService(`userSubscriptions`)
            .then(response => {
                if(response.success === true){
                    const userSubscriptions = response.data
                    props.updateUserSubscriptions(userSubscriptions)
                    // setUserSubscriptions(userSubscriptions)
                }else{
                    props.updateUserSubscriptions([])
                }
            })
        }
    }, [props.isLoggedIn])

    useEffect(() => {
        if(props.isLoggedIn){
            globalPostService(`todayDanceClasses`, { date : new Date() })
            .then(response => {
                if(response.success == true){
                    props.updateTodaysDanceClasses(response.data)
                    // setUpcomingDances(response.data)
                }else{
                    props.updateTodaysDanceClasses('')
                }
            })
        }
    }, [props.isLoggedIn])

    const { upcomingDances, userSubscriptions } = props
    
    return(
        // (upcomingDance && !checkIsFinished(upcomingDance.class_booked_end_time)) ? <DanceAlert dance={upcomingDance}/>
        <div className="introduction-blk">
           {upcomingDances && (upcomingDances.bookings.length || upcomingDances.subscriptions.length) ? <>
            {
                upcomingDances.bookings && upcomingDances.bookings.length ? upcomingDances.bookings.map((dance, index) => !checkIsFinished(dance.danceClass?.endTime) ? <DanceAlert type="today" setShowBanner={setShowBanner} dance={dance} key={index}/> : null): null
            }
            {
                upcomingDances.subscriptions && upcomingDances.subscriptions.length ? upcomingDances.subscriptions.map((dance, index) => !checkIsFinished(dance.endTime) ? <DanceAlert type="subscription" setShowBanner={setShowBanner} dance={dance} key={index}/> : null): null
            }
           </> : null}
           { (userSubscriptions && userSubscriptions.length) ? <SubscriptionAlert setShowBanner={setShowBanner} userSubscriptions={userSubscriptions} /> :  null}
           { showBanner ? <Carousel 
                responsive={{...responsiveCarousel, superLargeDesktop: {...responsiveCarousel.superLargeDesktop, items: 2}}}
                swipeable={true}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                containerClass="carousel-container home"
            >
                {
                    props.bannerData && props.bannerData.length ?  props.bannerData.map((item, index) => <div className="carousel-item" key={index}>
                        {imgLoader ? <div style={{marginBottom: 8}}><Skeleton variant="rect" height={'50vh'}/></div> : null}
                        <img src={item.image} alt="#" style={imgLoader ? {display: 'none'} : {minHeight: '50vh'}} onLoad={() => setImgLoader(false)}/>
                        <p className="heading1">{item.description}</p>
                    </div>) : [0,1,2].map(item => <div key={item} style={{marginBottom: 8}}><Skeleton variant="rect" height={`53vh`}/></div>)
                }
            </Carousel> : null
           }
        </div>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userSubscriptions: state.sharedReducers.userSubscriptions,
    upcomingDances: state.sharedReducers.todayDanceClasses,
    bannerData: state.homeReducer.bannerData
})
const mapDispatchToProps = dispatch => ({
    updateUserSubscriptions : (userSubscriptions) => dispatch({
        type: UPDATE_SUBSCRIPTIONS,
        payload: userSubscriptions
    }),
    updateTodaysDanceClasses : (todayDanceClasses) => dispatch({
        type: UPDATE_TODAY_DANCECLASSES,
        payload: todayDanceClasses
    }),
    updateBanner : (bannerData) => dispatch({
        type: UPDATE_BANNER,
        payload: bannerData
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(Introduction)