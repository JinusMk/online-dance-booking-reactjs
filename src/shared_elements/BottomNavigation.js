import React from 'react'
import { Hidden, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { useHistory, useLocation } from "react-router-dom";

export default function BottomNavigationComponent(props){
    const [value, setValue] = React.useState(0);
    let history = useHistory();
    let location = useLocation();
    const navigateTo = (location) => {
        history.push(location)
    }
    return(
        <Hidden only={['lg', 'xl']}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className="bottom-navigation"
                >
                    <BottomNavigationAction onClick={() => navigateTo("/")} label="HOME" icon={(location.pathname === '/' || location.pathname == '/home') ? <img src={require('../assets/images/home_icon_active.svg')} /> : <img src={require('../assets/images/home_icon.svg')} />}/>
                    <BottomNavigationAction onClick={() => navigateTo("/schedule")} label="SCHEDULE" icon={location.pathname === '/schedule' ? <img src={require('../assets/images/schedule_icon_active.svg')} /> : <img src={require('../assets/images/schedule_icon.svg')} />}/>
                    <BottomNavigationAction onClick={() => navigateTo("/profile")} label="YOU" icon={location.pathname === '/profile' ? <img src={require('../assets/images/profile_icon_active.svg')} /> : <img src={require('../assets/images/profile_icon.svg')} />}/>
            </BottomNavigation>
        </Hidden>
    )
}