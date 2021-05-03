import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { UserProgressDrawer, GRAPH_OPTONS } from './'
import { globalGetService } from '../../../utils/globalApiServices';
import { Chart } from "react-google-charts";
import { imageBasePath } from '../../../constants';

export default function CalorieGraph(props){
    let params = useParams()
    let location = useLocation()
    const [addCalorieLog, setAddCalorieLog] = useState(false)
    const [graphLoader, setGraphLoader] = useState(true)
    // const [graphWidth, setGraphWidth] = useState(0)
    const [graphOptions, setGraphOptions] = useState({
        ...GRAPH_OPTONS,
        series: {
            0: { 
                curveType: 'function',
                color: `#039445`
            },
            1: { 
                curveType: 'function',
                color: `#0E7ACB`
            }
        },
        pointSize: 10,
        vAxis: {
            title: '',
            gridlines: {color: '#FFE5E9', count:1},
        },
    })

    const [graphData, setGraphData] = useState([
        [{ type: 'date', label: '' }, 'INSTRUCTOR', 'YOU'],
    ])
    const [loader, setLoader] = useState(true)
    
    const fetchCalorieLog = () => {
        setLoader(true)
        globalGetService(`calorie/${params.subscriptionId}`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                setGraphLoader(true)
                let userCalorieLogs = response.data.filter(log => log.createdBy == "user")
                let instructorCalorieLogs = response.data.filter(log => log.createdBy == "instructor")
                let updatedGraphData = [
                    [{ type: 'date', label: '' }, 'INSTRUCTOR', 'YOU'],
                ]
                userCalorieLogs.forEach(item => {
                    let option = [new Date(item.date), 0, Number(item.calories)]
                    updatedGraphData.push(option)
                })
                updatedGraphData.forEach((option, index) => {
                    if(index >= 1){
                        option[1] = instructorCalorieLogs.find(item => new Date(item.date) == option[0]) ? Number(instructorCalorieLogs.find(item => new Date(item.date) == option[0]).calories) : option[2]
                    }
                })
                // let hAxisTicks = []
                // userCalorieLogs.forEach(item => {
                //     hAxisTicks.push(new Date(`${new Date(item.date).getFullYear()}, ${new Date(item.date).getMonth()}`))
                // })
                // setGraphOptions({
                //     ...graphOptions,
                //     hAxis: {
                //         ticks: hAxisTicks
                //     }
                // })
                setGraphData(updatedGraphData)
                setGraphLoader(false)
            }else{
                setGraphData(null)
                setGraphLoader(false)
            }
        })
    }

    useEffect(() => {
        fetchCalorieLog()
    }, [params.subscriptionId])

    const handleLogCalories = () => {
        setAddCalorieLog(true)
    }
    return(
        <>
        <div className="calorie-graph" id="calorie-graph">
            <h3 className="heading2 label">Calorie Graph  <Link to={{pathname: `/user-subscriptions/${params.subscriptionId}/calories`, state: { prevPath: `${location.pathname}`}}} className="see-log paragraph">See log<span></span><img src={`${imageBasePath}right_arrow_icon.svg`}/></Link></h3>
            {/* {loader || graphLoader || !graphData ? null : <div className="graph-indicators">
                <p className="secondaryText instructor">
                    INSTRUCTOR
                </p>
                <p className="secondaryText user">
                    YOU
                </p>
            </div>} */}
            <div className="graph-wrapper">
                {(loader || graphLoader) ? 'Loading...' :  graphData ? 
                <Chart
                    height={'200px'}
                    chartType="LineChart"
                    loader={<div>Loading...</div>}
                    data={graphData}
                    width={"100%"}
                    options={graphOptions}
                /> : <p className="alert paragraph">No calorie logs found!</p>
                }
            </div>
            <div className="alert">
                <p className="paragraph">Data is from the instructor’s fitness watch and is indicative. Log your calorie count if you have a fitness watch.</p>
            </div>
            <p>
                <a className="secondaryBtn" onClick={() => handleLogCalories()}>LOG YOUR CALORIES</a>
            </p>
        </div>
        <UserProgressDrawer 
            open={addCalorieLog}
            handleClose={() => setAddCalorieLog(false)}
            type="calorieLog"
            updateCalorieGraph={() => {fetchCalorieLog(); props.setUpdateCaloriesBurnt(true)}}
        />
        </>
    )
}