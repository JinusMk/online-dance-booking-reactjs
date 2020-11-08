import React, { useState } from 'react'
import Carousel from "react-multi-carousel";
import Skeleton from '@material-ui/lab/Skeleton';
import { responsiveCarousel, imageBasePath } from '../../../constants'
import "react-multi-carousel/lib/styles.css";

const introductionData =[
    {id: '', img: `${imageBasePath}intro_img_1.svg`, value: 'Dance Online - Learn | Have Fun | Get Fit'},
    {id: '', img: `${imageBasePath}intro_img_3.svg`, value: 'Dance Online - Learn from Expert Instructors'},
    {id: '', img: `${imageBasePath}intro_img_2.svg`, value: 'Dance Online - Exclusive Kids Batch available'},
]

export default function Introduction(props){
    const [imgLoader, setImgLoader] = useState(true)
    return(
        <div className="introduction-blk">
            <Carousel 
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
                        <img src={item.img} alt="#" style={imgLoader ? {display: 'none'}: {minHeight: 280}} onLoad={() => setImgLoader(false)}/>
                        <p className="heading1">{item.value}</p>
                    </div>)
                }
            </Carousel>
        </div>
    )
}