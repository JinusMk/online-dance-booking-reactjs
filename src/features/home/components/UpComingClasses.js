import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import { responsiveCarousel, imageBasePath } from '../../../constants'
import { DanceFormCard } from './index'
import { isMobile } from 'react-device-detect'
import { globalGetService } from '../../../utils/globalApiServices';
import "react-multi-carousel/lib/styles.css";

export default function UpComingClasses(props){
    const [loader, setLoader] = useState(true)
    const [dances, setDances] = useState({
        "Bollywood": {
            "letzdance_id": 11,
            "slug": "",
            "category": 1,
            "title": "Bollywood",
            "rating": 2,
            "duration": "1 hours",
            "cost_old": 20,
            "cost": 10,
            "rating_count": 20,
            "no_of_participants": 0,
            "instructor": {
                "name": "New admin",
                "img": "",
                "ratingCount": 20,
                "rating": 2,
                "expert": "Bollywood",
                "experience": "5 years",
                "classes": "51"
            },
            "card_type": "actual"
        },
        "Hip-hop": {
            "letzdance_id": 31,
            "slug": "",
            "category": 2,
            "title": "Hip-hop",
            "rating": 4.5,
            "duration": "1 hours",
            "cost_old": 2000,
            "cost": 1000,
            "rating_count": 50,
            "no_of_participants": 0,
            "instructor": {
                "name": "New admin",
                "img": "",
                "ratingCount": 50,
                "rating": 4.5,
                "expert": "Hip-hop",
                "experience": "5 years",
                "classes": "51"
            },
            "card_type": "actual"
        },
        "Zumba": {
            "letzdance_id": 38,
            "slug": "",
            "category": 3,
            "title": "Zumba",
            "rating": 4.5,
            "duration": "1 hours",
            "cost_old": 200,
            "cost": 100,
            "rating_count": 0,
            "no_of_participants": 0,
            "instructor": {
                "name": "New admin",
                "img": "",
                "ratingCount": 0,
                "rating": 4.5,
                "expert": "Zumba",
                "experience": "5 years",
                "classes": "51"
            },
            "card_type": "actual"
        }
    })
    const [currentDate, setCurrentDate] = useState('')
    let history = useHistory()
    useEffect(() => {
        // globalGetService('home-page', {})
        // .then(response => {
        //     console.log('response', response)
        // })
        setLoader(false)
        var d = new Date()
        setCurrentDate(d.getDate())
    }, [])
    return(
        <div className="upcoming-classes block">
            <h3 className="heading2 title">Upcoming dances <Link to="/schedule" className="see-all paragraph"><span>See all </span><img src={`${imageBasePath}right_arrow_icon.svg`} /></Link></h3>
            {
                loader ? 'Loading ...' : <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={isMobile ? true : false}
                infinite={false}
                partialVisible={isMobile ? true : false}
                arrows={isMobile ? false: true }
                containerClass="partially-visible-carousel-container upcoming-classes"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {Object.keys(dances).map((key, index) => <DanceFormCard key={index} dance={dances[key]}/>)}
                    <div className="see-full-schedule-wrapper textCenter" onClick={() => history.push('/schedule')}>
                        <div className="image-wrapper">
                            <img className="schedule-icon" src={`${imageBasePath}schedule_icon_outlined.svg`} />
                            {/* <p className="heading1">{moment().format('D')}</p> */}
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

{/* <div className="see-full-schedule-wrapper textCenter">
    <div className="image-wrapper">
        <img className="schedule-icon" src={`${imageBasePath}schedule_icon_outlined.svg`} />
        <span>{moment().format('D')}</span>
    </div>
    <h3 className="heading3">
        <span>See the full schedule</span>
        <img src={`${imageBasePath}down_arrow_icon.svg`} className="arrow"/>
    </h3>
</div> */}