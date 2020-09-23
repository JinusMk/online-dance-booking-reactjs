import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'
import moment from 'moment'
import { TimeSlotList } from '../../../shared_elements'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
        className="time-slots-tab-panel-wrapper"
      >
        {value === index && (
          children
        )}
      </div>
    );
  }

export default function TimeSlots(props){
    const [dates, setDates] = useState([
        {id:1, date: moment(), morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]},
        {id:2, date: moment().add(1, 'day'), morning: [{time: '10.00 AM', status: 'ALMOST FULL'}, {time: '11.00 AM', status: 'Disabled'}], evening: [{time: '6.00 PM', status: 'FAST FILLING'}, {time: '7.00 PM', status: 'Disabled'}]},
        {id:3, date: moment().add(2, 'day'), morning: [{time: '6.00 AM', status: 'FAST FILLING'}, {time: '12.00 PM', status: 'Disabled'}], evening: [{time: '4.00 PM', status: 'ALMOST FULL'}, {time: '8.00 PM', status: 'Disabled'}]},
        {id:4, date: moment().add(3, 'day'), morning: [{time: '7.00 AM', status: 'ALMOST FULL'}, {time: '10.30 AM', status: 'Disabled'}], evening: [{time: '5.00 PM', status: 'FAST FILLING'}, {time: '9.00 PM', status: 'Disabled'}]},
        {id:5, date: moment().add(4, 'day'), morning: [{time: '9.00 AM', status: 'FAST FILLING'}, {time: '11.30 AM', status: 'Disabled'}], evening: [{time: '7.00 PM', status: 'FAST FILLING'}, {time: '8.00 PM', status: 'Disabled'}]},
        {id:6, date: moment().add(5, 'day'), morning: [{time: '8.00 AM', status: 'ALMOST FULL'}, {time: '11.00 AM', status: 'Disabled'}], evening: [{time: '5.00 PM', status: 'ALMOST FULL'}, {time: '9.00 PM', status: 'Disabled'}]},
        {id:7, date: moment().add(6, 'day'), morning: [{time: '11.00 AM', status: ''}, {time: '11.45 AM', status: 'Disabled'}], evening: [{time: '6.00 PM', status: ''}, {time: '10.00 PM', status: 'Disabled'}]},
    ])
    const [value, setValue] = useState(0);
    const [activeDate, setActiveDate] = useState(dates[0])
    const handleChange = (event, newValue) => {
        setActiveDate(dates[newValue])
        setValue(newValue);
    };
    return(
        <div className="time-slots block">
            <div className="time-slots-tabs-wrapper">
                {/* <h3 className="heading3 month">{moment(activeDate.date).format('MMMM')}</h3> */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    className="time-slots-tabs"
                    aria-label="scrollable force tabs example"
                >
                    {
                        dates.map((item, index) => <Tab key={index} label={<div className="date-item-wrapper">
                            <p className="secondaryText month">{moment(activeDate.date).format('MMM')}</p>
                            <div className="day-wrapper">
                                <h3 className="heading1">{moment(item.date).format('D') < 10 ? `0${moment(item.date).format('D')}` : moment(item.date).format('D')}</h3>
                                <p className="secondaryText">{moment(item.date).format('ddd')}</p>
                            </div>
                        </div>}/>)
                    }
                </Tabs>
                <TabPanel value={value} index={value}>
                    <TimeSlotList title="MORNING" timeSlots={activeDate.morning} danceId={props.danceId}/>
                    <TimeSlotList title="EVENING" timeSlots={activeDate.evening} danceId={props.danceId}/>
                </TabPanel>
            </div>
            <div className="see-all-blk">
                <h3 className="heading3">Timings don’t suit you? </h3>
                <p className="paragraph">Explore all dance options available on Letzdance</p>
                <p><Link to="/schedule" className="secondaryBtn">SEE ALL DANCE TYPES</Link></p>
            </div>
        </div>
    )
}