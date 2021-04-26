import React, { useState, useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { isMobile } from 'react-device-detect'
import { LogCalorieForm, WeightGoal } from './'

export default function UserProgressDrawer(props){
    const [state, setState] = useState({
        bottom: false,
        right: false
    })
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        props.handleClose(open)
        setState({ ...state, [anchor]: open });
    };
    const renderForm = (type) => {
        switch(type){
            case "calorieLog" : 
                return <LogCalorieForm {...props}/>
            case 'setWeightGoal':
                return <WeightGoal {...props}/>
            case 'editWeightGoal':
                return <WeightGoal {...props}/>
            case 'logWeight':
                return <WeightGoal {...props}/>
        }
    }
    
    return(
        <>
        {[isMobile ? 'bottom': 'right'].map((anchor) => (
                <SwipeableDrawer
                    key={anchor}
                    onOpen={(e) => e.preventDefault()}
                    anchor={anchor}
                    open={props.open}
                    onClose={toggleDrawer(anchor, false)}
                    className="custom-drawer progress"
                >
                    <div className="user-progress-form-wrapper" id="user-progress-form-wrapper">
                        {renderForm(props.type)}
                    </div>
               </SwipeableDrawer>
            ))}
        </>
    )
}

