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
    const [scheduleData, setScheduleData] = useState({})
    useEffect(() => {
        globalGetService('schedule', {})
        .then(response => {
            if(response.success == true){
                setScheduleData(response.data.dance_classes)
                setLoader(false)
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
            }
        })
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
                                        scrollTargetIds={['date-1', 'date-2', 'date-3', 'date-4', 'date-5', 'date-6']}
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