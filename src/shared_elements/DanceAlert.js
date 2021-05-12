import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import moment from 'moment'
import { checkIsFinished, toastFlashMessage } from '../utils';
import { globalPostService } from '../utils/globalApiServices';

export default function DanceAlert(props){
    const { dance, type } = props
    const [loader, setLoader] = useState(false)

    const handleClickJoinSubscriptionClass = (classId) => {
        // console.log('clicked join button with id', classId)
        setLoader(true)
        globalPostService(`danceClassByDate`, { userDanceClassID : classId })
        .then(response => {
            setLoader(false)
            if(response.success == true){
                // setDanceInfo(response.data && response.data.length ? response.data[0] : {})
                const danceInfo = response.data && response.data.length ? response.data[0] : {}
                if(danceInfo.zoomLink){
                    window.open(danceInfo.zoomLink, '_blank');
                }
            }else if(response.message && !response.success){
                toastFlashMessage(response.message, 'error')
            }
        })
    }
    useEffect(() =>{
        setLoader(false)
    }, [])
    return(
        <>
        {
            type == "subscription" ? <div className={`dance-alert-wrapper subscription`}> 
                <h3 className="heading3">{checkIsFinished(dance.startTime) ? `Your ${dance.category} class has already started !`: `Your ${dance.category} class is about to start!`}</h3>
                <p className="paragraph">{`Class ${dance.danceClassNumber}/${dance.totalDanceClasses} of the ${dance.category} subscription`}</p>
                <Grid container justify="" alignItems="center" className="alert-info">
                    <Grid item xs={6}>
                        <p className="secondaryText">{checkIsFinished(dance.startTime) ? 'STARTED ' : 'STARTS '}AT {moment(dance.startTime).format('hh:mm A') }</p>
                    </Grid>
                    <Grid xs={6}>
                        <p><a onClick={() => handleClickJoinSubscriptionClass(dance._id)} className={`secondaryBtn ${loader ? 'disabled' : ''}`}>JOIN CLASS</a></p> 
                    </Grid>
                </Grid>
            </div> : <div className={`dance-alert-wrapper`}>
                <h3 className="heading3">{checkIsFinished(dance.class_booked_start_time ? dance.class_booked_start_time : dance.danceClass?.startTime) ? `Your ${dance.category ? dance.category : dance.danceClass?.category?.name } class has already started !`: (moment().format('DD-MM-YYYY') == moment(dance.danceClass?.startTime).format(`DD-MM-YYYY`) || type == "today" ) ? `Your ${dance.category ? dance.category : dance.danceClass?.category?.name} class is about to start!` : `You have an upcoming ${dance.category ? dance.category : dance.danceClass?.category?.name} class`}</h3>
                <Grid container justify="" alignItems="center" className="alert-info">
                    <Grid item xs={6}>
                        <p className="secondaryText">{checkIsFinished(dance.class_booked_start_time ? dance.class_booked_start_time : dance.danceClass?.startTime) ? 'STARTED ' : 'STARTS '}AT {moment(dance.class_booked_start_time ? dance.class_booked_start_time : dance.danceClass?.startTime).format('hh:mm A')}</p>
                    </Grid>
                    {
                        ( moment().format('DD-MM-YYYY') == moment(dance.danceClass?.startTime).format(`DD-MM-YYYY`) || type == "today" ) ? <Grid xs={6}>
                            <p><a target="_blank" rel='noopener noreferrer' href={dance.zoom_link ? dance.zoom_link : dance.danceClass?.zoomLink} className="secondaryBtn">JOIN CLASS</a></p>
                        </Grid> : null
                    }
                </Grid>
            </div>
        }
        </>
    )
}