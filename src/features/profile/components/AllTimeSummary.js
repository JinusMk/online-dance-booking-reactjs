import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core';
import { globalGetService } from '../../../utils/globalApiServices';

export default function AllTimeSummary(props){
    let params = useParams()
    const [loader, setLoader] = useState(true)
    const [attendedCount, setAttendedCount] = useState(0)
    const [caloriesBurnt, setCaloriesBurnt] = useState('')
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
        fetchCaloriesBurnt()
    }, [params.subscriptionId])
    const fetchCurrentWeight = () => {
        globalGetService(`weightLog`)
        .then(response => {
            if(response.success == true){
                setLoader(false)
                setWeightInfo(response.data.length ? response.data[0] : '')
            }
        })
    }
    const fetchCaloriesBurnt = () => {
        setLoader(true)
        globalGetService(`calorie/${params.subscriptionId}`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                let sum = 0
                response.data.forEach(cal => {
                    sum += Number(cal.calories)
                })
                setCaloriesBurnt(sum)
            }else{
                setCaloriesBurnt(0)
            }
        })
    }
    useEffect(() => {
        fetchCurrentWeight()
    }, [params.subscriptionId])

    useEffect(() => {
        if(props.updateCurrentWeight){
            fetchCurrentWeight()
            props.setUpdateCurrentWeight(false)
        }
        if(props.updateCaloriesBurnt){
            fetchCaloriesBurnt()
            props.setUpdateCaloriesBurnt(false)
        }
    }, [props.updateCurrentWeight, props.updateCaloriesBurnt])
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
                        <h1 className="heading1">{`${loader ? '--' : caloriesBurnt ? caloriesBurnt : 0}`}<span>k</span></h1>
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