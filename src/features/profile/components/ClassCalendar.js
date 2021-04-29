import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation, useHistory } from 'react-router-dom'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment';
import { globalPostService, globalGetService } from '../../../utils/globalApiServices';
import { checkNumberOfDaysLeft, checkIsFinished } from '../../../utils';

export default function ClassCalendar(props){
    let params = useParams()
    let location = useLocation()
    let history = useHistory()

    const [danceClasses, setDanceClasses] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [subscriptionInfo, setSubscriptionInfo] = useState('')
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        globalGetService(`userSubscriptions/${params.subscriptionId}`)
        .then(response => {
            if(response.success == true){
                setSubscriptionInfo(response.data)
            }
        })
    }, [])

    useEffect(() => {
        globalPostService(`subscription/danceClasses`, { userSubscriptionId: params.subscriptionId })
        .then(response => {
            if(response.success == true){
                setLoader(false)
                setDanceClasses(response.data)
            }
        })
    }, [])

    const getSubscriptionTitle = (arr=[]) => {
        let title = ''
        arr.forEach((a, index) => {
            title += `${a.value}${index < arr.length - 1 ? ', ' : ''}`
        })
        return title
    }
    const navigateToDanceClass = (danceId) => {
        if(danceId && subscriptionInfo?.subscription?.slug){
            history.push({pathname: `/user-subscriptions/${subscriptionInfo?.subscription?.slug}/${danceId}`, state: { prevPath: `${location.pathname}` }})
        }
    }
    const renderDayInPicker = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
        if(dayInCurrentMonth){
            const activeDanceClass = danceClasses.find(danceClass => moment(danceClass.date).format(`MM/DD/YYYY`) == moment(date).format(`MM/DD/YYYY`) )
            if(danceClasses && activeDanceClass){ 
                if(checkNumberOfDaysLeft(activeDanceClass.date) < 0){ //already over
                    return <div onClick={() => navigateToDanceClass(activeDanceClass._id)} className={`dance-class-date over ${activeDanceClass.attended ? 'attended' : 'absent'}`}>
                                <h3 className="heading1">{moment(date).format(`DD`)}</h3>
                                <p className="secondaryText classTime">{moment(activeDanceClass.time).format(`hh:mm A`)}</p>
                                {activeDanceClass.attended ? <p className="secondaryText textCenter review">{activeDanceClass.feedback != "empty" ? <span className="feedback">F</span> : null}<span className="recording">{`R`}</span></p> : null}
                            </div>
                }else if(checkNumberOfDaysLeft(activeDanceClass.date) > 0){//future
                    return <div className="dance-class-date future">
                                <h3 className="heading1">{moment(date).format(`DD`)}</h3>
                                <p className="secondaryText classTime">{moment(activeDanceClass.time).format(`hh:mm A`)}</p>
                           </div>
                }else{//same day
                    return <div onClick={() => checkIsFinished(activeDanceClass.date) ? navigateToDanceClass(activeDanceClass._id) : console.log('')} className={`dance-class-date ${checkIsFinished(activeDanceClass.date) ?  activeDanceClass.attended ? 'attended' : 'over' : 'future'} ${moment().format('DD-MM-YYYY') == moment(date).format('DD-MM-YYYY') ? 'today' : ''}`} to={checkIsFinished(activeDanceClass.date) ? {pathname: `/user-subscriptions/${subscriptionInfo?.subscription?.slug}/${activeDanceClass._id}`, state: { prevPath: `${location.pathname}` }}: ''}>
                                <h3 className="heading1">{moment(date).format(`DD`)}</h3>
                            </div>
                }
            }else{
                // console.log(`checkNumberOfDaysLeft`, [checkNumberOfDaysLeft(date), moment(date).format(`MM/DD/YYYY`)])// dance day
                return <div className={`disabled-date ${moment().format('DD-MM-YYYY') == moment(date).format('DD-MM-YYYY') ? 'today' : ''}`}>
                            <h3 className="heading1">{moment(date).format(`DD`)}</h3>
                        </div>
            }
        }else{
            return dayComponent
        }  
    }
    return(
        <div className="class-calendar-blk">
            <h3 className="heading2">Class calendar</h3>
            <p className="paragraph classTime label">{subscriptionInfo ? `${getSubscriptionTitle(subscriptionInfo.subscription?.weekDays)} - ${moment(subscriptionInfo.subscription?.startTime).format('hh:mm A')}` : ''}</p>
            <div className="calendar-wrapper">
                {loader ? 'Loading...' : <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <DatePicker
                        renderDay={renderDayInPicker}
                        readOnly={true}
                        disableToolbar
                        variant="static"
                        showTodayButton
                        onChange={() => console.log('')}
                    />
                </MuiPickersUtilsProvider>}
                <div className="graph-info">
                    <p className="paragraph alert">Click on a date to join class, view class details, and more</p>
                    <ul className="listInline indicators">
                        <li>
                            <p className="seondaryText today">TODAY</p>
                        </li>
                        <li>
                            <p className="seondaryText upcoming">UPCOMING</p>
                        </li>
                        <li>
                            <p className="seondaryText attended">ATTENDED</p>
                        </li>
                        <li>
                            <p className="seondaryText absent">ABSENT</p>
                        </li>
                    </ul>
                    <ul className="review-feedback-indicators listInline">
                        <li>
                            <h3 className="heading3 feedback">F<span>INSTRUCTOR FEEDBACK</span></h3>
                        </li>
                        <li>
                            <h3 className="heading3 review">R<span>RECORDING AVAILABLE</span></h3>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}