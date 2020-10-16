import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Header } from  '../../../shared_elements'
import { Container } from '@material-ui/core';
import { Gallery, DanceInfo, TimeSlots } from '../components'
import { instructorsData } from '../../../constants';
import { globalGetService } from '../../../utils/globalApiServices';
import '../../../assets/styles/dance-detail-module.scss'

const InstructorCard = React.lazy(() => import('../components/InstructorCard'));
const HowWorks = React.lazy(() => import('../components/HowWorks'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));

const categorySlug = {
    'bollywood' : 1,
    'hiphop' : 2,
    'zumba' : 3,
    'bollywood-kids': 4,
    'hiphop-kids': 5
}

export default function DanceDetail(props){
    const [ category, setCategory ] = useState('')
    const [ loader, setLoader ] = useState(true)
    const [ danceInfo, setDanceInfo ] = useState({})
    const [ danceClasses, setDanceClasses ] = useState({
        // id: 1, rating: 4.5,img: require('../../../assets/images/zumba_logo_card.svg'), title: "Zumba", ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86'
        "12-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "rating_count": 20,
                    "cost_old": 20,
                    "cost": 10,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 20,
                        "rating": 2,
                        "expert": "Bollywood",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "evening",
                    "label": "aa",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "5:57 PM",
                    "class_end_time": "6:57 PM"
                },
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "rating_count": 20,
                    "cost_old": 20,
                    "cost": 10,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 20,
                        "rating": 2,
                        "expert": "Bollywood",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "aa",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "5:57 PM",
                    "class_end_time": "6:57 PM"
                }
            ]
        },
        "13-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "rating_count": 20,
                    "cost_old": 20,
                    "cost": 10,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 20,
                        "rating": 2,
                        "expert": "Bollywood",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "Disabled",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "5:57 PM",
                    "class_end_time": "6:57 PM"
                },
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "rating_count": 20,
                    "cost_old": 20,
                    "cost": 10,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 20,
                        "rating": 2,
                        "expert": "Bollywood",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "evening",
                    "label": "aa",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "5:57 PM",
                    "class_end_time": "6:57 PM"
                }
            ]
        }
    })
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const slug = props.match.params.slug
        setCategory(slug)
        // globalGetService(`dance/category/${categorySlug[slug]}`, {})
        // .then(response => {
        //     console.log('response', response)
        // })
        getDanceInfo()
        setLoader(false)
    }, [])
    const getDanceInfo = () => {//danceClasses, slug
        const availableDates = Object.keys(danceClasses)
        let category = props.match.params.slug
        const classArray = danceClasses[availableDates[0]][category]
        if(classArray && classArray.length){
            setDanceInfo(classArray[0])
        }
    }
    return(
        <section className="dance-detail-section">
            <Header onBack={() => props.history.push('/')} title={category}/>
            <Container className="dance-detail-container">
                {loader ? 'Loading...' : <>
                    <Gallery category={category}/>
                    <DanceInfo dance={danceInfo} category={category}/>
                    <TimeSlots danceClasses={danceClasses} category={category}/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <div className="instructor block">
                            <h3 className="heading2 title">Instructor</h3>
                            <InstructorCard instructor={instructorsData.find(item => item.category == category)}/>
                        </div>
                        <HowWorks />
                        <ContactUs /> 
                    </Suspense>
                    </>
                }
            </Container>
        </section>
    )
}