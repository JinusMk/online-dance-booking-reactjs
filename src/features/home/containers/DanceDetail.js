import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import {  DanceInfo } from '../components'
// import { instructorsData } from '../../../constants';
import { globalPostService, globalGetService } from '../../../utils/globalApiServices';
import '../../../assets/styles/dance-detail-module.scss'

const InstructorCard = React.lazy(() => import('../components/InstructorCard'));
const TimeSlots = React.lazy(() => import('../components/TimeSlots'));
const HowWorks = React.lazy(() => import('../components/HowWorks'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));
const Reviews = React.lazy(() => import('../components/Reviews'));
const DanceSubscription = React.lazy(() => import('../components/DanceSubscription'))


export default function DanceDetail(props){
    const [ category, setCategory ] = useState('')
    const [ loader, setLoader ] = useState(true)
    const [ danceInfo, setDanceInfo ] = useState({})
    const [ danceClasses, setDanceClasses ] = useState({})
    const [instructor, setInstructor] = useState('')

    const getDanceInfo = (danceClasses) => {//danceClasses, slug
        const availableDates = Object.keys(danceClasses)
        if(availableDates && availableDates.length){
            let category = Object.keys(danceClasses[availableDates[0]]) && Object.keys(danceClasses[availableDates[0]]).length ? Object.keys(danceClasses[availableDates[0]])[0] : props.match.params.slug
            const classArray = danceClasses[availableDates[0]][category]
            if(classArray && classArray.length){
                setDanceInfo(classArray[0])
                setLoader(false)
            }
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const slug = props.match.params.slug
        setCategory(slug)
        globalPostService(`dance/category/1`, { categoryId: props.match.params.categoryId })
        .then(response => {
            if(response.success == true){
                setDanceClasses(response.data.dance_classes)
                getDanceInfo(response.data.dance_classes)
            }
        })
    }, [])
    useEffect(() => {
        globalGetService(`category/${props.match.params.categoryId}`)
        .then(response => {
            if(response.success == true){
                setInstructor(response.data?.length ? response.data[0] : '')
            }else{
                setInstructor('')
            }
        })
    }, [])
    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push('/')
        }
    }
    return(
        <section className="dance-detail-section">
            <Header onBack={handleGoBack} title={danceInfo?.title}/>
            <Container className="dance-detail-container">
                    {/* <Gallery category={category == "hiphop-kids" ? 'hip-hop' : category} loader={loader}/> */}
                    <DanceInfo dance={danceInfo} loader={loader}/>
                        <Suspense fallback={<></>}>
                        {loader ? '' : <>
                                <TimeSlots danceClasses={danceClasses} category={category}/>
                                {instructor ? <div className="instructor block">
                                    <h3 className="heading2 title">Instructor</h3>
                                    <InstructorCard instructor={instructor}/>
                                </div> : null}
                                <Reviews title={danceInfo?.title} categoryId={props.match.params.categoryId == "602243825d42a126b059ec28" ? '602243485d42a126b059ec27' : props.match.params.categoryId} />
                                <DanceSubscription categoryId={props.match.params.categoryId}/>
                                <HowWorks />
                                <ContactUs /> 
                            </>
                        }
                        </Suspense>
            </Container>
        </section>
    )
}