import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import Skeleton from '@material-ui/lab/Skeleton';
import { responsiveCarousel, imageBasePath } from '../../../constants'
import "react-multi-carousel/lib/styles.css";
import moment from 'moment'
import { globalGetService } from '../../../utils/globalApiServices';
import { connect } from 'react-redux'
import { DanceAlert, SubscriptionAlert } from '../../../shared_elements';
import { checkIsFinished } from '../../../utils';

const introductionData =[
    {id: '', img: `${imageBasePath}intro_img_1.svg`, value: 'Dance Online - Learn | Have Fun | Get Fit'},
    {id: '', img: `${imageBasePath}intro_img_3.svg`, value: 'Dance Online - Learn from Expert Instructors'},
    {id: '', img: `${imageBasePath}intro_img_2.svg`, value: 'Dance Online - Exclusive Kids Batch available'},
]

function Introduction(props){
    const [imgLoader, setImgLoader] = useState(true)
    const [upcomingDance, setUpcomingDance] = useState(null)
    const [userSubsctiption, setUserSubscriptions] = useState([])
    // const [introductionData, setIntroductionData] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        globalGetService(`banners`)
        .then(response => {
            if(response.success === true){
                // setIntroductionData(response.data)
                setLoader(false)
            }
        })
        if(props.isLoggedIn){
            globalGetService(`dance-history`)
            .then(response => {
                if(response.success == true){
                    const dances = response.data
                    if(typeof dances == 'object' && Object.keys(dances).find(date => date == moment().format('DD-MM-YYYY'))){
                        const upcomingDance = dances[moment().format('DD-MM-YYYY')][0]
                        setUpcomingDance(upcomingDance)
                    }else{
                        setUpcomingDance(null)
                    }
                }
            })
            globalGetService(`userSubscriptions`)
            .then(response => {
                if(response.success === true){
                    const userSubsctiption = response.data
                    setUserSubscriptions(userSubsctiption)
                }
            })
        }
    }, [props.isLoggedIn])
    return(
        <div className="introduction-blk">
           { (userSubsctiption && userSubsctiption.length) ? <SubscriptionAlert userSubscription={userSubsctiption} /> : (upcomingDance && !checkIsFinished(upcomingDance.class_booked_end_time)) ? <DanceAlert dance={upcomingDance}/> : <Carousel 
                responsive={{...responsiveCarousel, superLargeDesktop: {...responsiveCarousel.superLargeDesktop, items: 2}}}
                swipeable={true}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                containerClass="carousel-container home"
            >
                {
                    introductionData.map((item, index) => <div className="carousel-item" key={index}>
                        {imgLoader ? <div style={{marginBottom: 8}}><Skeleton variant="rect" height={280}/></div> : null}
                        <img src={item.img} alt="#" style={imgLoader ? {display: 'none'} : {minHeight: 280}} onLoad={() => setImgLoader(false)}/>
                        <p className="heading1">{item.value}</p>
                    </div>)
                }

                {/* {
                    loader ? [0,1,2].map(item => <div style={{marginBottom: 8}}><Skeleton variant="rect" height={280}/></div>) : introductionData.map((item, index) => <div className="carousel-item" key={index}>
                        {imgLoader ? <div style={{marginBottom: 8}}><Skeleton variant="rect" height={280}/></div> : null}
                        <img src={item.image} alt="#" style={imgLoader ? {display: 'none'} : {minHeight: 280}} onLoad={() => setImgLoader(false)}/>
                        <p className="heading1">{item.description}</p>
                    </div>)
                } */}
            </Carousel>}
        </div>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
})
export default connect(mapStateToProps, null)(Introduction)