import React, { useState, useEffect } from 'react'
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
    const { danceClasses, category } = props
    const [value, setValue] = useState(0);
    const [dates, setDates] = useState([])
    const [activeDateClasses, setActiveDateClasses] = useState([])
    useEffect(() => {

        const dates = Object.keys(danceClasses)
        setDates(dates)
        setActiveDateClasses(danceClasses[dates[0]][category])
    }, [danceClasses])
    const handleChange = (event, newValue) => {
        setActiveDateClasses(danceClasses[dates[newValue]][category])
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
                        dates.map((date, index) => <Tab key={index} label={<div className="date-item-wrapper">
                            <p className="secondaryText month">{moment(date, 'DD-MM-YYYY').format('MMM')}</p>
                            <div className="day-wrapper">
                                <h3 className="heading1">{moment(date, 'DD-MM-YYYY').format('D') < 10 ? `0${moment(date, 'DD-MM-YYYY').format('D')}` : moment(date, 'DD-MM-YYYY').format('D')}</h3>
                                <p className="secondaryText">{moment(date, 'DD-MM-YYYY').format('ddd')}</p>
                            </div>
                        </div>}/>)
                    }
                </Tabs>
                <TabPanel value={value} index={value}>
                    {activeDateClasses && activeDateClasses.filter(dance => dance.slot == "morning").length ? <TimeSlotList title="MORNING" timeSlots={activeDateClasses.filter(dance => dance.slot == "morning")} category={category}/>: null}
                    {activeDateClasses && activeDateClasses.filter(dance => dance.slot == "evening").length ? <TimeSlotList title="EVENING" timeSlots={activeDateClasses.filter(dance => dance.slot == "evening")} category={category}/> : null}
                </TabPanel>
            </div>
            <div className="see-all-blk hidden">
                <h3 className="heading3">Timings don’t suit you? </h3>
                <p className="paragraph">Explore all dance options available on Letzdance</p>
                <p><Link to="/schedule" className="secondaryBtn">SEE ALL DANCE TYPES</Link></p>
            </div>
        </div>
    )
}