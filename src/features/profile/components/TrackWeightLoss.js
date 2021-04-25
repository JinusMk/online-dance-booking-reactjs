import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { globalGetService } from '../../../utils/globalApiServices';
import { UserProgressDrawer } from './'
import { imageBasePath } from '../../../constants';
import { Link } from 'react-router-dom'

export default function TrackWeightLoss(props){
    let location = useLocation()
    const [weightLog, setWeightLog] = useState('')
    const [weightGoal, setWeightGoal] = useState('')
    const [loader, setLoader] = useState(true)
    const [openWeightGoal, setOpenWeightGoal] = useState(false)
    const [openEditWeightGoal, setOpenEditWeightGoal] = useState(false)
    const [openLogWeight, setOpenLogWeight] = useState(false)

    const fetchWeightLogs = () => {
        globalGetService(`weightLog`)
        .then(response => {
            if(response.success == true){
                setWeightLog(response.data)
            }
        })
    }

    const fetchWeightGoal = () => {
        setLoader(true)
        globalGetService(`weightGoal`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                fetchWeightLogs()
                setWeightGoal(response.data)
            }
        })
    }
    useEffect(() => {
        fetchWeightGoal()
    }, [])
    const handleCloseDrawer = () => {
        setOpenWeightGoal(false)
        setOpenEditWeightGoal(false)
        setOpenLogWeight(false)
    }
    return(
    <>
    <div className="weight-loss">
        {loader ? 'Loading...' : weightGoal ? <>
            <div className="weight-loss-graph">
                <h3 className="heading2 label">Current weight <Link to={{pathname: `/user-weights`, state: { prevPath: `${location.pathname}`, weightGoal: weightGoal}}} className="see-log paragraph">See log<span></span><img src={`${imageBasePath}right_arrow_icon.svg`}/></Link></h3>
                <p className="paragraph alert">Log your weight values regularly, and keep a track</p>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Link className="secondaryBtn" onClick={() => setOpenEditWeightGoal(true)}>EDIT GOAL</Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link className="secondaryBtn" onClick={() => setOpenLogWeight(true)}>LOG WEIGHT</Link>
                    </Grid>
                </Grid>
            </div>
        </> : <div className="track-weight-loss-wrapper">
            <h3 className="heading2 label">Track weight loss</h3>
            <p className="heading3 alert">Log your weight values regularly and keep a track. Get started by setting a goal.</p>
            <p><a className="secondaryBtn" onClick={() => setOpenWeightGoal(true)}>SET A WEIGHT GOAL</a></p>
        </div>}
    </div>
    <UserProgressDrawer 
        open={openWeightGoal || openEditWeightGoal || openLogWeight}
        handleClose={handleCloseDrawer}
        type={openWeightGoal ? 'setWeightGoal' : openEditWeightGoal ? 'editWeightGoal': openLogWeight ? "logWeight" : '' }
        forceUpdateData={(openWeightGoal || openEditWeightGoal) ? fetchWeightGoal : openLogWeight ? fetchWeightLogs : () => console.log('')}
        currentWeight={weightLog ? weightLog[0]?.weight : weightGoal ? weightGoal[0].currentWeight : ''}
    />
    </>
    )
}