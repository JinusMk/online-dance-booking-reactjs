import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, imageBasePath } from '../../../constants'
import { isMobile } from 'react-device-detect'
import { globalGetService } from '../../../utils/globalApiServices';
import Skeleton from '@material-ui/lab/Skeleton';
import { UPDATE_DANCEFORMS } from '../actions'
import { connect } from 'react-redux'
import "react-multi-carousel/lib/styles.css";

const DanceFormCard = lazy(() => import('./DanceFormCard'))

function UpComingClasses(props){
    const [loader, setLoader] = useState(true)
    const [dances, setDances] = useState({})
    const [currentDate, setCurrentDate] = useState('')
    let history = useHistory()
    useEffect(() => {
        if(props.danceForms && Object.keys(props.danceForms) && Object.keys(props.danceForms).length){
            setLoader(false)
            setDances(props.danceForms)
        }else{
            globalGetService('home-page', {})
            .then(response => {
                if(response.success == true){
                    setLoader(false)
                    setDances(response.data)
                    props.updateDanceForms(response.data)
                }
            })
        }
        var d = new Date()
        setCurrentDate(d.getDate())
    }, [])
    return(
        <div className="upcoming-classes block">
            <h3 className="heading2 title">Upcoming classes <Link to="/schedule" className="see-all paragraph"><span>See all </span><img src={`${imageBasePath}right_arrow_icon.svg`} /></Link></h3>
            {
                loader ? <Carousel 
                    responsive={responsiveCarousel}
                    swipeable={true}
                    showDots={isMobile ? true : false}
                    infinite={false}
                    partialVisible={isMobile ? true : false}
                    arrows={isMobile ? true: true }
                    containerClass="partially-visible-carousel-container upcoming-classes"
                    dotListClass="custom-dot-list"
                    itemClass="carousel-item"
                    renderDotsOutside={true}
                >
                    {[0,1,2,3].map((item, index) => <div key={index} className="dance-form-skeletop-wrapper">
                        <Skeleton variant="rect" height={270} className="card"/>
                    </div>)}
                </Carousel> : <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={isMobile ? true : false}
                infinite={false}
                partialVisible={isMobile ? true : false}
                arrows={isMobile ? true: true }
                containerClass="partially-visible-carousel-container upcoming-classes"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {Object.keys(dances).map((key, index) => <Suspense fallback={<></>}><DanceFormCard key={index} dance={dances[key]}/></Suspense>)}
                    <div className="see-full-schedule-wrapper textCenter" onClick={() => history.push('/schedule')}>
                        <div className="image-wrapper">
                            <img className="schedule-icon" src={`${imageBasePath}schedule_icon_outlined.svg`} />
                            <p className="heading1">{currentDate}</p>
                        </div>
                        <h3 className="heading3">
                            <span>See the full schedule</span>
                            <img src={`${imageBasePath}down_arrow_icon.svg`} className="arrow"/>
                        </h3>
                    </div>
                </Carousel>
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    danceForms : state.homeReducer.danceForms
})
const mapDispatchToProps = (dispatch) => ({
    updateDanceForms : (danceForms) => dispatch({
        type: UPDATE_DANCEFORMS,
        payload: danceForms
    })
})
export default connect(mapStateToProps, mapDispatchToProps)(UpComingClasses)