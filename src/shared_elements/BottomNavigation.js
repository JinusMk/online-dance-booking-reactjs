import React, { useEffect } from 'react'
import { Hidden, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { useHistory, useLocation } from "react-router-dom";
import { imageBasePath } from '../constants';

export default function BottomNavigationComponent(props){
    const [value, setValue] = React.useState(null);
    let history = useHistory();
    let location = useLocation();
    useEffect(() => {
        if(location.pathname === '/' || location.pathname == '/home'){
            setValue(0)
        }else if(location.pathname == '/schedule'){
            setValue(1)
        }else if (location.pathname == '/profile'){
            setValue(2)
        }
    }, [location.pathname])
    const navigateTo = (location) => {
        history.push(location)
    }
    return(
        <Hidden only={['lg', 'xl', 'md']}>
            <BottomNavigation
                // value={location.pathname === '/' || location.pathname == '/home' ? 0 : location.pathname === '/schedule' ? 1 : location.pathname === '/profile' ? 2 : 0}
                value={value}
                onChange={(event, value) => setValue(value)}
                showLabels
                className="bottom-navigation"
                >
                    <BottomNavigationAction onClick={() => { setValue(0); navigateTo("/");}} label="HOME" icon={(location.pathname === '/' || location.pathname == '/home') ? <img src={`${imageBasePath}home_icon_active.svg`} /> : <img src={`${imageBasePath}home_icon.svg`} />}/>
                    <BottomNavigationAction onClick={() => {setValue(1); navigateTo("/schedule")}} label="SCHEDULE" icon={location.pathname === '/schedule' ? <img src={`${imageBasePath}schedule_icon_active.svg`} /> : <img src={`${imageBasePath}schedule_icon.svg`} />}/>
                    <BottomNavigationAction onClick={() => {setValue(2); navigateTo("/profile")}} label="YOU" icon={location.pathname === '/profile' ? <img src={`${imageBasePath}profile_icon_active.svg`} /> : <img src={`${imageBasePath}profile_icon.svg`} />}/>
            </BottomNavigation>
        </Hidden>
    )
}