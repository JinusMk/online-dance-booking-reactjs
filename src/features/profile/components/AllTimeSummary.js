import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import { globalGetService } from '../../../utils/globalApiServices';

export default function AllTimeSummary(props){
    let params = useParams()
    const [loader, setLoader] = useState(true)
    const [attendedCount, setAttendedCount] = useState(0)
    const [calorieInfo, setCalorieInfo] = useState('')
    const [weightInfo, setWeightInfo] = useState('')

    useEffect(() => {
        setLoader(true)
        globalGetService(`userSubscriptions/${params.subscriptionId}`)
        .then(response => {
            if(response.success == true){
                setAttendedCount(response.data?.danceClassesAttended)
                setLoader(false)
            }
        })
    }, [params.subscriptionId])

    useEffect(() => {
        setLoader(true)
        globalGetService(`calorie/${params.subscriptionId}`)
        .then(response => {
            if(response.success == true){
                setCalorieInfo(response.data)
                setLoader(false)
            }
        })
    }, [params.subscriptionId])
    const fetchCurrentWeight = () => {
        setLoader(true)
        globalGetService(`weightLog`)
        .then(response => {
            if(response.success == true){
                setLoader(false)
                setWeightInfo(response.data.length ? response.data[0] : '')
            }
        })
    }
    useEffect(() => {
        fetchCurrentWeight()
    }, [params.subscriptionId])
    useEffect(() => {
        if(props.updateCurrentWeight){
            debugger
            fetchCurrentWeight()
            props.setUpdateCurrentWeight(false)
        }
    }, [props.updateCurrentWeight])
    return(
        <div className="all-time-summary">
            <p className="secondaryText label">ALL TIME SUMMARY</p>
            <Grid container className="summary-wrapper">
                <Grid item xs={4}>
                    <div className="summary-item textCenter">
                        <h1 className="heading1">{loader ? '--' : attendedCount}</h1>
                        <p className="secondaryText">CLASSES <br/>COMPLETED</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="summary-item textCenter">
                        <h1 className="heading1">{(!loader && calorieInfo?.calories) ? calorieInfo?.calories : '0'}<span>{(!loader && calorieInfo?.units) ? calorieInfo?.units : 'k'}</span></h1>
                        <p className="secondaryText">CALORIES <br/> BURNED</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="summary-item textCenter">
                        <h1 className="heading1">{(!loader && weightInfo?.weight) ? weightInfo?.weight : '--'}<span>{(!loader && weightInfo?.units) ? weightInfo?.units : ''}</span></h1>
                        <p className="secondaryText">CURRENT <br/>WEIGHT</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}