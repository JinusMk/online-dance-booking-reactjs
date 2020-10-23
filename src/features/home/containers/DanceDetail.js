import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import { Gallery, DanceInfo } from '../components'
import { instructorsData } from '../../../constants';
import { globalGetService } from '../../../utils/globalApiServices';
import '../../../assets/styles/dance-detail-module.scss'

const InstructorCard = React.lazy(() => import('../components/InstructorCard'));
const TimeSlots = React.lazy(() => import('../components/TimeSlots'));
const HowWorks = React.lazy(() => import('../components/HowWorks'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));
const Reviews = React.lazy(() => import('../components/Reviews'));

const categorySlug = {
    'bollywood' : 1,
    'hip-hop' : 2,
    'zumba' : 3,
    'bollywood-kids': 4,
    'hiphop-kids': 5
}

export default function DanceDetail(props){
    const [ category, setCategory ] = useState('')
    const [ loader, setLoader ] = useState(true)
    const [ danceInfo, setDanceInfo ] = useState({})
    const [ danceClasses, setDanceClasses ] = useState({})
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const slug = props.match.params.slug
        setCategory(slug)
        globalGetService(`dance/category/${categorySlug[slug]}`, {})
        .then(response => {
            if(response.success == true){
                setDanceClasses(response.data.dance_classes)
                getDanceInfo(response.data.dance_classes)
            }
        })
    }, [])
    const getDanceInfo = (danceClasses) => {//danceClasses, slug
        const availableDates = Object.keys(danceClasses)
        let category = props.match.params.slug
        const classArray = danceClasses[availableDates[0]][category]
        if(classArray && classArray.length){
            setDanceInfo(classArray[0])
            setLoader(false)
        }
    }
    return(
        <section className="dance-detail-section">
            <Header onBack={() => props.history.push('/')} title={category}/>
            <Container className="dance-detail-container">
                    <Gallery category={category == "hiphop-kids" ? 'hip-hop' : category} loader={loader}/>
                    <DanceInfo dance={danceInfo} category={category} loader={loader}/>
                        <Suspense fallback={<div>Loading...</div>}>
                        {loader ? '' : <>
                                <TimeSlots danceClasses={danceClasses} category={category}/>
                                <div className="instructor block">
                                    <h3 className="heading2 title">Instructor</h3>
                                    <InstructorCard instructor={instructorsData.find(item => item.category == category)}/>
                                </div>
                                <Reviews category={category == "hiphop-kids" ? 'hip-hop' : category} />
                                <HowWorks />
                                <ContactUs /> 
                            </>
                        }
                        </Suspense>
            </Container>
        </section>
    )
}