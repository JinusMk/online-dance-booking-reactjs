import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserProgressDrawer } from './'
import { globalGetService } from '../../../utils/globalApiServices';

export default function CalorieGraph(){
    let params = useParams()
    const [addCalorieLog, setAddCalorieLog] = useState(false)
    const [calorieLogs, setCalorieLogs] = useState([])
    const [loader, setLoader] = useState(true)

    const fetchCalorieLog = () => {
        setLoader(true)
        globalGetService(`calorie/${params.subscriptionId}`)
        .then(response => {
            setLoader(false)
            if(response.success == true){
                setCalorieLogs(response.data)
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
        <div className="calorie-graph">
            <h3 className="heading2 label">Calorie Graph</h3>
            <div className="graph-indicators">
                <p className="secondaryText instructor">
                    INSTRUCTOR
                </p>
                <p className="secondaryText user">
                    YOU
                </p>
            </div>
            <div className="graph-wrapper">
                {loader ? 'Loading...' : ''}
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
            updateCalorieGraph={fetchCalorieLog}
        />
        </>
    )
}