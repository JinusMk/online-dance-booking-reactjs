import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { globalGetService } from '../../../utils/globalApiServices';
import { UserProgressDrawer } from './'
import { imageBasePath } from '../../../constants';
import { Link } from 'react-router-dom'
import moment from 'moment'
import LineChart from 'react-linechart'

export default function TrackWeightLoss(props){
    let location = useLocation()
    const [weightLog, setWeightLog] = useState('')
    const [weightGoal, setWeightGoal] = useState('')
    const [loader, setLoader] = useState(true)
    const [openWeightGoal, setOpenWeightGoal] = useState(false)
    const [openEditWeightGoal, setOpenEditWeightGoal] = useState(false)
    const [openLogWeight, setOpenLogWeight] = useState(false)
    const [graphLoader, setGraphLoader] = useState(true)
    const [graphWidth, setGraphWidth] = useState(0)
    const [graphData, setGraphData] = useState([{			
        id: 'goal',		
        name: 'GOAL',				
        color: "rgba(14, 122, 203, 0.2)", 
        // points: [{x: `2020-03-10`, y: 60}, {x: `2020-03-13`, y: 55}, {x: "2020-03-16", y:65}, {x: "2020-03-20", y:60}, {x: "2020-03-25", y:60}] 
    },
    {		
        id: 'user',			
        name: 'WEIGHT',						
        color: "#0E7ACB", 
        // points: [{x: `2020-03-10`, y: 50}, {x: "2020-03-13", y: 50}, {x: "2020-03-16", y: 50}, {x: "2020-03-20", y: 50}, {x: "2020-03-25", y: 50}] 
    }])
    const getClientWidth = () => {
        const width = document.getElementById('weight-loss').clientWidth
        setGraphWidth(width)
    }
    const fetchWeightLogs = (weightGoalData=[]) => {
        globalGetService(`weightLog`)
        .then(response => {
            if(response.success == true){
                setGraphLoader(true)
                let weightLog = response.data
                let updatedGraphData = graphData
                updatedGraphData.forEach((entry, index) => {
                    if(entry.id == 'user'){
                        updatedGraphData[index] = {
                            ...updatedGraphData[index],
                            points: weightLog.map((item, itemIndex) => {
                                return { x: moment(item.date).format(`YYYY-MM-DD`), y: item.weight}
                            })
                        }
                    }else{
                        updatedGraphData[index] = {
                            ...updatedGraphData[index],
                            points: weightLog.map((item, itemIndex) => {
                                return { x: moment(item.date).format(`YYYY-MM-DD`), y: weightGoal[0]?.goalWeight ? weightGoal[0].goalWeight : weightGoalData[0]?.goalWeight}
                            })
                        }
                    }
                })
                setGraphData(updatedGraphData)
                setWeightLog(weightLog)
                setGraphLoader(false)
            }
        })
    }

    const fetchWeightGoal = () => {
        setLoader(true)
        globalGetService(`weightGoal`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                setWeightGoal(response.data)
                fetchWeightLogs(response.data)
            }
        })
    }
    useEffect(() => {
        fetchWeightGoal()
        getClientWidth()
    }, [])
    const handleCloseDrawer = () => {
        setOpenWeightGoal(false)
        setOpenEditWeightGoal(false)
        setOpenLogWeight(false)
    }
    return(
    <>
    <div className="weight-loss" id="weight-loss">
        {loader ? 'Loading...' : weightGoal ? <>
            <div className="weight-loss-graph">
                <h3 className="heading2 label">Current weight <Link to={{pathname: `/user-weights`, state: { prevPath: `${location.pathname}`, weightGoal: weightGoal}}} className="see-log paragraph">See log<span></span><img src={`${imageBasePath}right_arrow_icon.svg`}/></Link></h3>
                {
                    graphLoader ? 'Loading...' :<div className="chart-wrapper"> <LineChart 						
                        width={graphWidth ? graphWidth : 350} 
                        height={225}
                        showLegends={true}
                        legendPosition="top-right"
                        data={graphData}
                        xLabel=""
                        yLabel=""
                        margins={{ top: 20, right: 20, bottom: 20, left: 30 }}
                        isDate={true}
                        // yMin={0}
                        ticks={5}
                        interpolate= "cardinal"
                    />
                    </div>
                }
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
        forceUpdateData={(openWeightGoal || openEditWeightGoal) ? () => {fetchWeightGoal(); openWeightGoal ? props.setUpdateCurrentWeight(true) : console.log()} : openLogWeight ? () => {fetchWeightLogs(); props.setUpdateCurrentWeight(true)} : () => console.log('')}
        currentWeight={weightLog ? weightLog[0]?.weight : weightGoal ? weightGoal[0].currentWeight : ''}
    />
    </>
    )
}