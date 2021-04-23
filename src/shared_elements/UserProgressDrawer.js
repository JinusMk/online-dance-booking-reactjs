import React, { useState, useEffect } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { isMobile } from 'react-device-detect'
import { toastFlashMessage } from '../utils'

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
                    //progress drawer
               </SwipeableDrawer>
            ))}
        </>
    )
}