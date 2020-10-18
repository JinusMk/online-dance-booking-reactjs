import React, { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { Container } from '@material-ui/core';
import { DanceInformationCard } from '../../../shared_elements'
import { Tabs, Tab } from '@material-ui/core'
import moment from 'moment'
import ScrollspyNav from "react-scrollspy-nav";
import { globalGetService } from '../../../utils/globalApiServices';
import { imageBasePath } from '../../../constants';
import '../../../assets/styles/schedule-module.scss'
import ScheduleLoader from '../components/ScheduleLoader';

export default function Schedule(props){
    const [loader, setLoader] = useState(true)
    const [scheduleData, setScheduleData] = useState({
        "12-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "category": 1,
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
                },
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "category": 1,
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
            ],
            "hip-hop": [
                {
                    "id": 31,
                    "title": "Hip-hop",
                    "rating": 4.5,
                    "img": "",
                    "category": 2,
                    "rating_count": 50,
                    "cost_old": 2000,
                    "cost": 1000,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 50,
                        "rating": 4.5,
                        "expert": "Hip-hop",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast filling",
                    "description": "asd",
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "8:10 AM",
                    "class_end_time": "9:10 AM"
                }
            ],
            "zumba": [
                {
                    "id": 38,
                    "title": "Zumba",
                    "rating": 4.5,
                    "img": "",
                    "category": 3,
                    "rating_count": 0,
                    "cost_old": 200,
                    "cost": 100,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 0,
                        "rating": 4.5,
                        "expert": "Zumba",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast-filling",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "10:11 AM",
                    "class_end_time": "11:11 AM"
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
                    "category": 1,
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
            ],
            "hip-hop": [
                {
                    "id": 31,
                    "title": "Hip-hop",
                    "rating": 4.5,
                    "img": "",
                    "category": 2,
                    "rating_count": 50,
                    "cost_old": 2000,
                    "cost": 1000,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 50,
                        "rating": 4.5,
                        "expert": "Hip-hop",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast filling",
                    "description": "asd",
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "8:10 AM",
                    "class_end_time": "9:10 AM"
                }
            ],
            "zumba": [
                {
                    "id": 38,
                    "title": "Zumba",
                    "rating": 4.5,
                    "img": "",
                    "rating_count": 0,
                    "cost_old": 200,
                    "category": 3,
                    "cost": 100,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 0,
                        "rating": 4.5,
                        "expert": "Zumba",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast-filling",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "10:11 AM",
                    "class_end_time": "11:11 AM"
                }
            ]
        },             
        "14-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "category": 1,
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
                },
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "category": 1,
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
            ],
            "hip-hop": [
                {
                    "id": 31,
                    "title": "Hip-hop",
                    "rating": 4.5,
                    "img": "",
                    "category": 2,
                    "rating_count": 50,
                    "cost_old": 2000,
                    "cost": 1000,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 50,
                        "rating": 4.5,
                        "expert": "Hip-hop",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast filling",
                    "description": "asd",
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "8:10 AM",
                    "class_end_time": "9:10 AM"
                }
            ],
            "zumba": [
                {
                    "id": 38,
                    "title": "Zumba",
                    "rating": 4.5,
                    "img": "",
                    "category": 3,
                    "rating_count": 0,
                    "cost_old": 200,
                    "cost": 100,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 0,
                        "rating": 4.5,
                        "expert": "Zumba",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast-filling",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "10:11 AM",
                    "class_end_time": "11:11 AM"
                }
            ]
        },
        "15-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "rating_count": 20,
                    "cost_old": 20,
                    "category": 1,
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
            ],
            "hip-hop": [
                {
                    "id": 31,
                    "title": "Hip-hop",
                    "rating": 4.5,
                    "img": "",
                    "category": 2,
                    "rating_count": 50,
                    "cost_old": 2000,
                    "cost": 1000,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 50,
                        "rating": 4.5,
                        "expert": "Hip-hop",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast filling",
                    "description": "asd",
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "8:10 AM",
                    "class_end_time": "9:10 AM"
                }
            ],
            "zumba": [
                {
                    "id": 38,
                    "title": "Zumba",
                    "rating": 4.5,
                    "img": "",
                    "rating_count": 0,
                    "cost_old": 200,
                    "category": 3,
                    "cost": 100,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 0,
                        "rating": 4.5,
                        "expert": "Zumba",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast-filling",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "10:11 AM",
                    "class_end_time": "11:11 AM"
                }
            ]
        },             
        "16-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "category": 1,
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
                },
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "category": 1,
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
            ],
            "hip-hop": [
                {
                    "id": 31,
                    "title": "Hip-hop",
                    "rating": 4.5,
                    "img": "",
                    "category": 2,
                    "rating_count": 50,
                    "cost_old": 2000,
                    "cost": 1000,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 50,
                        "rating": 4.5,
                        "expert": "Hip-hop",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast filling",
                    "description": "asd",
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "8:10 AM",
                    "class_end_time": "9:10 AM"
                }
            ],
            "zumba": [
                {
                    "id": 38,
                    "title": "Zumba",
                    "rating": 4.5,
                    "img": "",
                    "category": 3,
                    "rating_count": 0,
                    "cost_old": 200,
                    "cost": 100,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 0,
                        "rating": 4.5,
                        "expert": "Zumba",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast-filling",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "10:11 AM",
                    "class_end_time": "11:11 AM"
                }
            ]
        },
        "17-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "rating_count": 20,
                    "cost_old": 20,
                    "category": 1,
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
            ],
            "hip-hop": [
                {
                    "id": 31,
                    "title": "Hip-hop",
                    "rating": 4.5,
                    "img": "",
                    "category": 2,
                    "rating_count": 50,
                    "cost_old": 2000,
                    "cost": 1000,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 50,
                        "rating": 4.5,
                        "expert": "Hip-hop",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast filling",
                    "description": "asd",
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "8:10 AM",
                    "class_end_time": "9:10 AM"
                }
            ],
            "zumba": [
                {
                    "id": 38,
                    "title": "Zumba",
                    "rating": 4.5,
                    "img": "",
                    "rating_count": 0,
                    "cost_old": 200,
                    "category": 3,
                    "cost": 100,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 0,
                        "rating": 4.5,
                        "expert": "Zumba",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast-filling",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "10:11 AM",
                    "class_end_time": "11:11 AM"
                }
            ]
        },             
        "18-10-2020": {
            "bollywood": [
                {
                    "id": 11,
                    "title": "Bollywood",
                    "rating": 2,
                    "img": "",
                    "rating_count": 20,
                    "cost_old": 20,
                    "category": 1,
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
            ],
            "hip-hop": [
                {
                    "id": 31,
                    "title": "Hip-hop",
                    "rating": 4.5,
                    "img": "",
                    "category": 2,
                    "rating_count": 50,
                    "cost_old": 2000,
                    "cost": 1000,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 50,
                        "rating": 4.5,
                        "expert": "Hip-hop",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast filling",
                    "description": "asd",
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "8:10 AM",
                    "class_end_time": "9:10 AM"
                }
            ],
            "zumba": [
                {
                    "id": 38,
                    "title": "Zumba",
                    "rating": 4.5,
                    "img": "",
                    "rating_count": 0,
                    "cost_old": 200,
                    "category": 3,
                    "cost": 100,
                    "instructor": {
                        "name": "New admin",
                        "img": "",
                        "ratingCount": 0,
                        "rating": 4.5,
                        "expert": "Zumba",
                        "experience": "5 years",
                        "classes": "51"
                    },
                    "slot": "morning",
                    "label": "fast-filling",
                    "description": null,
                    "duration": "1 hours",
                    "participants": 0,
                    "class_start_time": "10:11 AM",
                    "class_end_time": "11:11 AM"
                }
            ]
        },             
    })
    useEffect(() => {
        const location = props.location
        let hash = location.hash;
        hash = hash.substring(1, hash.length);
        const element = document.getElementById(`${hash}`);
        if(element){
            const yOffset = -170; 
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }else{
            window.scrollTo({ top: 1, behavior: 'smooth' });
        }
        // globalGetService('dance-classes', {})
        // .then(response => {
        //     console.log('response', response)
        // })
        setTimeout(() => {
            setLoader(false)
        }, 1000);
    }, [])
    
    return(
        <section className="schedule-section">
            <Container className="schedule-container">
                {
                    loader ? <ScheduleLoader/> : <div className="dance-listing-wrapper">
                    <div className="date-picker-wrapper">
                        <div className="time-slots-tabs-wrapper">
                            <Tabs
                                // value={6}
                                // onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="on"
                                className="time-slots-tabs"
                                aria-label="scrollable force tabs example"
                            >
                                <ScrollspyNav
                                        scrollTargetIds={['date-1', 'date-2', 'date-3', 'date-4', 'date-5', 'date-6', 'date-7']}
                                        offset={-115}
                                        activeNavClass="is-current"
                                        headerBackground="true"
                                        scrollDuration={500}
                                    >
                                     <ul>
                                        {Object.keys(scheduleData).map((date, index) => <li key={index}><a href={`#date-${index+1}`} onChange={e => console.log('e.target', e.target)}>
                                            <Tab key={index} label={<div className="date-item-wrapper">
                                                <p className="secondaryText month">{moment(date, 'DD-MM-YYYY').format('MMM')}</p>
                                                <div className="day-wrapper" >
                                                    <h3 className="heading1">{moment(date, 'DD-MM-YYYY').format('D') < 10 ? `0${moment(date, 'DD-MM-YYYY').format('D')}` : moment(date, 'DD-MM-YYYY').format('D')}</h3>
                                                    <p className="secondaryText">{moment(date, 'DD-MM-YYYY').format('ddd')}</p>
                                                </div>
                                        </div>}/></a> </li>)}
                                    </ul>
                                </ScrollspyNav>
                            </Tabs>
                        </div>
                    </div>
                    {
                        Object.keys(scheduleData) && Object.keys(scheduleData).map((item, index) => 
                            <div className="dance-item-date-wrapper" id={`date-${index+1}`} key={index}>
                                <h3 className="heading2 title">{moment(item, 'DD-MM-YYYY').format('DD MMM')}</h3>
                                {
                                    Object.keys(scheduleData[item]).map((danceForm, dindex) => <DanceInformationCard key={dindex} danceClasses={scheduleData[item][danceForm]} type="schedule" dance={scheduleData[item][danceForm][0]} sectionId={`date-${index+1}`} category={danceForm}/>)
                                }
                            </div>)
                    }
                    <div className="list-footer textCenter">
                        <img src={`${imageBasePath}dancing_emoji.svg`}/>
                        <p className="paragraph">That’s all for this day</p>
                    </div>
                </div>
                }
            </Container>
        </section>
    )
}