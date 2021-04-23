import React, { useState, useEffect } from 'react'
import { UserProgressDrawer } from '../../../shared_elements'

export default function CalorieGraph(){
    const [addCalorieLog, setAddCalorieLog] = useState(false)
    
    const handleLogCalories = () => {
        setAddCalorieLog(true)
    }
    return(
        <>
        <div className="calorie-graph">
            <h3 className="heading2">Calorie Graph</h3>
            <div className="graph-indicators">
                <p className="secondaryText instructor">
                    <span></span>
                    INSTRUCTOR
                </p>
                <p className="secondaryText user">
                    <span></span>
                    YOU
                </p>
            </div>
            <div className="graph-wrapper"></div>
            <div className="">
                <p className="paragraph">Data is from the instructor’s fitness watch and is indicative. Log your calorie count if you have a fitness watch.</p>
            </div>
            <p>
                <a onClick={() => handleLogCalories()}></a>
            </p>
        </div>
        <UserProgressDrawer 
            open={addCalorieLog}
            handleClose={() => setAddCalorieLog(false)}
        />
        </>
    )
}