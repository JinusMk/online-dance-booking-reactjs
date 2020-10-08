import React from 'react'
import { imageBasePath } from '../constants';
import { Hidden, Grid } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'

export default function Header(props){
    const { onBack, title } = props
    let location = useLocation()
    let history = useHistory()
    const navigateTo = (path)  => {
        history.push(path)
    }
    return(<header>
        <Hidden only={['lg','xl', 'md']}>
        {title ? <h3 className="heading2">{title}</h3>: <img className="logo" src={`${imageBasePath}app_logo.svg`} />}
        {onBack ? <img className="back-arrow" src={`${imageBasePath}arrow_back_icon.svg`} onClick={onBack}/> : null}
        </Hidden>
        <Hidden only={['xs', 'sm']}>
            <Grid container className="header-wrapper" alignItems={'center'}>
                <Grid item xs={6}>
                    <div className="logo-wrapper">
                        <img className="logo" src={`${imageBasePath}app_logo.svg`} />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <ul className="listUnstyled nav-bar">
                        <li className={location.pathname === "/" ? 'active': ''}>
                            <div className="nav-item" onClick={() => navigateTo('/')}>
                                <img src={`${imageBasePath}home_icon_active.svg`} className="active"/>
                                <img src={`${imageBasePath}home_icon.svg`} className="in-active"/>
                                <span className="heading3">HOME</span>
                            </div>
                        </li>
                        <li className={location.pathname === "/schedule" ? 'active': ''}>
                            <div className="nav-item" onClick={() => navigateTo('/schedule')}>
                                <img src={`${imageBasePath}schedule_icon_active.svg`} className="active"/>
                                <img src={`${imageBasePath}schedule_icon_desktop.svg`} className="in-active"/>
                                <span className="heading3">SCHEDULE</span>
                            </div>
                        </li>
                        <li className={location.pathname === "/profile" ? 'active': ''}>
                            <div className="nav-item" onClick={() => navigateTo('/profile')}>
                                <img src={`${imageBasePath}profile_icon_active.svg`} className="active"/>
                                <img src={`${imageBasePath}profile_icon.svg`} className="in-active"/>
                                <span className="heading3">YOU</span>
                            </div>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </Hidden>
    </header>)
}