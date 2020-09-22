import React, { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { Container } from '@material-ui/core';
import { DanceInformationCard } from '../../../shared_elements'
import { Tabs, Tab } from '@material-ui/core'
import moment from 'moment'
import '../../../assets/styles/schedule-module.scss'
import ScrollspyNav from "react-scrollspy-nav";

export default function Schedule(props){
    const [scheduleData, setScheduleData] = useState(
        {
            [moment()] : [{id: 1, title: 'Bollywood', rating: 4.5, img: require('../../../assets/images/bollywood_logo_card.svg'), ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}, {id: 2, rating: 4.5,title: 'Zumba', img: require('../../../assets/images/zumba_logo_card.svg'), ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}, {id: 3, rating: 4.5,title: 'HipHop', img: require('../../../assets/images/zumba_logo_card.svg'), ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', date: moment(), morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}],
            [moment().add(1, 'day')] : [{id: 1, rating: 4.5, img: require('../../../assets/images/zumba_logo_card.svg'),title: 'Zumba', ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}, {id: 2, rating: 4.5, img: require('../../../assets/images/bollywood_logo_card.svg'),title: 'Bollywood', ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}],
            [moment().add(2, 'day')] : [{id: 1, rating: 4.5, img: require('../../../assets/images/bollywood_logo_card.svg'),title: 'Bollywood', ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}],
            [moment().add(3, 'day')] : [{id: 1, rating: 4.5, img: require('../../../assets/images/zumba_logo_card.svg'),title: 'Zumba', ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}],
            [moment().add(4, 'day')] : [{id: 1, rating: 4.5, img: require('../../../assets/images/bollywood_logo_card.svg'),title: 'Bollywood', ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}],
            [moment().add(5, 'day')] : [{id: 1, rating: 4.5, img: require('../../../assets/images/zumba_logo_card.svg'),title: 'Zumba', ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}],
            [moment().add(6, 'day')] : [{id: 1, rating: 4.5, img: require('../../../assets/images/bollywood_logo_card.svg'), title: 'Bollywood',ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}, {id: 2, rating: 4.5,title: 'Zumba', img: require('../../../assets/images/zumba_logo_card.svg'), ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}, {id: 3, title: 'HipHop', rating: 4.5, img: require('../../../assets/images/bollywood_logo_card.svg'), ratingCount: 89, costOld: '₹199', cost: '₹99', instructor: { name: 'Angel Bensy', img: require('../../../assets/images/instructor_1.svg'), ratingCount: 89, rating: 4.5, expert: 'Zumba expert', experience: '5 years', classes: '51' },duration: '1 hour', participants: '86', date: moment(), morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]}],
        }
    )
    useEffect(() => {
        window.scrollTo({
            top: 1,
            behavior: 'smooth'
        });
    }, [])
    
    return(
        <section className="schedule-section">
            <Container className="schedule-container">
                <div className="dance-listing-wrapper">
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
                                        offset={-140}
                                        activeNavClass="is-current"
                                        headerBackground="true"
                                        scrollDuration={500}
                                    >
                                     <ul>
                                        {Object.keys(scheduleData).map((item, index) => <li><a href={`#date-${index+1}`} onChange={e => console.log('e.target', e.target)}>
                                            <Tab key={index} label={<div className="date-item-wrapper">
                                                <p className="secondaryText month">{moment(item).format('MMM')}</p>
                                                <div className="day-wrapper" >
                                                    <h3 className="heading1">{moment(item).format('D') < 10 ? `0${moment(item).format('D')}` : moment(item).format('D')}</h3>
                                                    <p className="secondaryText">{moment(item).format('ddd')}</p>
                                                </div>
                                        </div>}/></a> </li>)}
                                    </ul>
                                </ScrollspyNav>
                            </Tabs>
                        </div>
                    </div>
                    {
                        Object.keys(scheduleData).map((item, index) => 
                            <div className="dance-item-date-wrapper" id={`date-${index+1}`} key={index}>
                                <h3 className="heading2 title">{moment(item).format('DD MMM')}</h3>
                                {
                                    scheduleData[item].length && scheduleData[item].map((dance, dindex) => <DanceInformationCard key={dindex} type="schedule" dance={dance}/>)
                                }
                            </div>)
                    }
                    <div className="list-footer textCenter">
                        <img src={require('../../../assets/images/dancing_emoji.svg')}/>
                        <p className="paragraph">That’s all for this day</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}