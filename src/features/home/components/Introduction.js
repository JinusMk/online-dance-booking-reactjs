import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1279 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 1279, min: 960 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 959, min: 599 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 599, min: 0 },
      items: 1
    }
  };
export default function Introduction(props){
    console.log('this.props.deviceType', props.deviceType)
    return(
        <div className="introduction-blk">
            <Carousel 
                responsive={responsive}
                swipeable={true}
                showDots={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                containerClass="carousel-container home"
            >
                <div className="carousel-item">
                    <img src={require('../../../assets/images/intro_picture1.svg')}/>
                    <p className="heading3 textCenter">Dance online, 1000 happy feet <br/> and counting.</p>
                </div>
                <div className="carousel-item">
                    <img src={require('../../../assets/images/intro_picture2.svg')}/>
                    <p className="heading3 textCenter">Groove to the beats right in your <br/>living room.</p>
                </div>
            </Carousel>
        </div>
    )
}