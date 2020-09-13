import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import { responsiveCarousel } from '../../../constants'
import "react-multi-carousel/lib/styles.css";

export default function LastWeekRecap(props){
    const [dances, setDances] = useState([
        {id: 1, img: require('../../../assets/images/last_week_recap_zumba.svg'), category: 'Zumba', instructor: 'Angel Bensy', participants: '55', date: '22 may 2020' }, 
        {id: 2, img: require('../../../assets/images/last_week_recap_bollywood.svg'), category: 'Bollywood', instructor: 'Manas (Jacob & Co)', participants: '73', date: '22 may 2020' }, 
        {id: 3, img: require('../../../assets/images/last_week_recap_zumba.svg'), category: 'HipHop', instructor: 'Angel Bensy', participants: '55', date: '22 may 2020' },
    ])
    return(
        <div className="last-week-recap block">
            <h3 className="heading2 title">Last week recap</h3>
            <Carousel 
                responsive={responsiveCarousel}
                swipeable={true}
                showDots={true}
                infinite={false}
                autoPlaySpeed={5000}
                partialVisible={true}
                arrows={false}
                containerClass="partially-visible-carousel-container last-week-recap"
                dotListClass="custom-dot-list"
                itemClass="carousel-item"
                renderDotsOutside={true}
            >
                {
                    dances.map((item, index) => <div className="last-wek-recap-item">
                        <img src={item.img}/>
                        <h3 className="heading3">{`${item.category} | ${item.instructor}`}</h3>
                        <p className="paragraph">{`${item.participants} dancers | ${item.date}`}</p>
                    </div>)
                }
            </Carousel>
        </div>
    )
}