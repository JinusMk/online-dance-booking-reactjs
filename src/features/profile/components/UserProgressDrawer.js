import React, { useState, useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { isMobile } from 'react-device-detect'
import { LogCalorieForm } from './'

export default function UserProgressDrawer(props){
    const { open, type } = props
    
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
            case "calorieLog" : {
                return <LogCalorieForm {...props}/>
            }
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
                    <div className="user-progress-form-wrapper">
                        {renderForm(props.type)}
                    </div>
               </SwipeableDrawer>
            ))}
        </>
    )
}

