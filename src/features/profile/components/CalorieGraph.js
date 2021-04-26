import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserProgressDrawer, GRAPH_OPTONS } from './'
import { globalGetService } from '../../../utils/globalApiServices';
// import LineChart from 'react-linechart'
// import moment from 'moment'
import { Chart } from "react-google-charts";
import '../../../../node_modules/react-linechart/dist/styles.css';

export default function CalorieGraph(props){
    let params = useParams()
    const [addCalorieLog, setAddCalorieLog] = useState(false)
    const [graphLoader, setGraphLoader] = useState(true)
    // const [graphWidth, setGraphWidth] = useState(0)
    const [graphOptions] = useState({
        ...GRAPH_OPTONS,
        legend: {
            position: ''
        },
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

    // const [calorieLogs, setCalorieLogs] = useState([{			
    //     id: 'instructor',		
    //     name: 'INSTRUCTOR',				
    //     color: "#039445", 
    //     // points: [{x: moment().format(`YYYY-MM-DD`), y: 2}, {x: `2021-04-26`, y: 5}, {x: "2021-04-29", y:10}, {x: "2021-04-30", y:10}, {x: "2021-05-02", y:10}, {x: "2021-05-10", y:10}] 
    // },
    // {		
    //     id: 'user',			
    //     name: 'YOU',						
    //     color: "#0E7ACB", 
    //     // points: [{x: moment().format(`YYYY-MM-DD`), y: 4}, {x: "2021-04-26", y: 2}, {x: "2021-04-27", y: 15}] 
    // }])

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
                // debugger
                // updatedCalorieLogs.forEach((log, index) => {
                //     if(log.id == 'instructor'){
                //         updatedCalorieLogs[index] = {...updatedCalorieLogs[index],
                //             points: instructorCalorieLogs.map(item => {
                //                 return { x: moment(item.createdAt).format(`YYYY-MM-DD`), y: item.calories}
                //             })
                //         }
                //     }else{
                //         updatedCalorieLogs[index] = {...updatedCalorieLogs[index],
                //             points: userCalorieLogs.map(item => {
                //                 return { x: moment(item.createdAt).format(`YYYY-MM-DD`), y: item.calories}
                //             })
                //         }
                //     }
                // })
                userCalorieLogs.forEach(item => {
                    let option = [new Date(item.date), 0, Number(item.calories)]
                    updatedGraphData.push(option)
                })
                updatedGraphData.forEach((option, index) => {
                    if(index >= 1){
                        option[1] = instructorCalorieLogs.find(item => new Date(item.date) == option[0]) ? Number(instructorCalorieLogs.find(item => new Date(item.date) == option[0]).calories) : option[2]
                    }
                })
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
        // getClientWidth()
    }, [params.subscriptionId])

    const handleLogCalories = () => {
        setAddCalorieLog(true)
    }
    // const getClientWidth = () => {
    //     const width = document.getElementById('calorie-graph').clientWidth
    //     setGraphWidth(width)
    // }
    return(
        <>
        <div className="calorie-graph" id="calorie-graph">
            <h3 className="heading2 label">Calorie Graph</h3>
            {loader || graphLoader || !graphData ? null : <div className="graph-indicators">
                <p className="secondaryText instructor">
                    INSTRUCTOR
                </p>
                <p className="secondaryText user">
                    YOU
                </p>
            </div>}
            <div className="graph-wrapper">
                {(loader || graphLoader) ? 'Loading...' :  graphData ? 
                // <LineChart 						
                //     width={graphWidth ? graphWidth : 350} 
                //     height={250}
                //     showLegends={false}
                //     data={calorieLogs}
                //     xLabel=""
                //     yLabel=""
                //     margins={{ top: 20, right: 20, bottom: 20, left: 30 }}
                //     isDate={true}
                //     yMin={0}
                //     ticks={5}
                //     // hideYAxis={true}
                //     // pointClass="graph-point-class"
                //     // labelClass="graph-label-class"
                //     // xDisplay
                //     interpolate= "cardinal"
                // /> 
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