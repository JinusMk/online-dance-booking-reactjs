import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { globalGetService } from '../../../utils/globalApiServices';
import { UserProgressDrawer, GRAPH_OPTONS } from './'
import { imageBasePath } from '../../../constants';
import { Link } from 'react-router-dom'
// import LineChart from 'react-linechart'
import { Chart } from "react-google-charts";

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
    const [graphOptions, setGraphOptions] = useState({
        ...GRAPH_OPTONS,
        vAxis: {
         ...GRAPH_OPTONS['vAxis'],
        //  minValue: 40
        }
    })
    const [graphData, setGraphData] = useState([
        [{ type: 'date', label: '' }, 'GOAL', 'WEIGHT'],
    ])
    const fetchWeightLogs = (weightGoalData=[]) => {
        globalGetService(`weightLog?sortBy=date&OrderBy=asc`)
        .then(response => {
            if(response.success == true){
                setGraphLoader(true)
                let weightLog = response.data
                let updatedGraphData = graphData
                weightLog.forEach(item => {
                    let option = [new Date(item.date), weightGoal[0]?.goalWeight ? Number(weightGoal[0].goalWeight) : Number(weightGoalData[0]?.goalWeight), Number(item.weight)]
                    updatedGraphData.push(option)
                })
                // let hAxisTicks = []
                // weightLog.forEach(item => {
                //     hAxisTicks.push(new Date(`${new Date(item.date).getFullYear()}, ${new Date(item.date).getMonth()}`))
                // })
                // setGraphOptions({
                //     ...graphOptions,
                //     vAxis: {
                //         minValue: 40
                //     },
                //     hAxis: {
                //         ticks: hAxisTicks
                //     }
                // })
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
                {/* {
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
                } */}
                {
                    graphLoader ? 'Loading...' : <div className="chart-wrapper">
                        <Chart
                            height={'200px'}
                            chartType="LineChart"
                            loader={<div>Loading...</div>}
                            data={graphData}
                            width={"100%"}
                            options={graphOptions}
                        />
                    </div>
                }
                <p className="paragraph alert">Log your weight values regularly, and keep a track</p>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <a className="secondaryBtn" onClick={() => setOpenEditWeightGoal(true)}>EDIT GOAL</a>
                    </Grid>
                    <Grid item xs={6}>
                        <a className="secondaryBtn" onClick={() => setOpenLogWeight(true)}>LOG WEIGHT</a>
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
        forceUpdateData={ openWeightGoal ? () => { fetchWeightGoal();props.setUpdateCurrentWeight(true)}: openEditWeightGoal ? fetchWeightGoal : openLogWeight ? () => {fetchWeightLogs(); props.setUpdateCurrentWeight(true)} : () => console.log('')}
        currentWeight={weightLog ? weightLog[0]?.weight : weightGoal ? weightGoal[0].currentWeight : ''}
    />
    </>
    )
}