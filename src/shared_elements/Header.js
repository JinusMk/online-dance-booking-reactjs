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
        {title ? <h3 className="heading2">{`${title[0].toUpperCase()}${title.slice(1)}`}</h3>: <img className="logo" src={`${imageBasePath}app_logo.svg`} alt=""/>}
        {onBack ? <img className="back-arrow" src={`${imageBasePath}arrow_back_icon.svg`} onClick={onBack} alt=""/> : null}
        </Hidden>
        <Hidden only={['xs', 'sm']}>
            <Grid container className="header-wrapper" alignItems={'center'}>
                <Grid item xs={6}>
                    <div className="logo-wrapper">
                        <img className="logo" src={`${imageBasePath}app_logo.svg`} alt=""/>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <ul className="listUnstyled nav-bar">
                        <li className={location.pathname === "/" ? 'active': ''}>
                            <div className="nav-item" onClick={() => navigateTo('/')}>
                                <img src={`${imageBasePath}home_icon_active.svg`} className="active" alt=""/>
                                <img src={`${imageBasePath}home_icon_desktop.svg`} className="in-active" alt=""/>
                                <span className="heading3">HOME</span>
                            </div>
                        </li>
                        <li className={location.pathname === "/schedule" ? 'active': ''}>
                            <div className="nav-item" onClick={() => navigateTo('/schedule')}>
                                <img src={`${imageBasePath}schedule_icon_active.svg`} className="active" alt=""/>
                                <img src={`${imageBasePath}schedule_icon_desktop.svg`} className="in-active" alt=""/>
                                <span className="heading3">SCHEDULE</span>
                            </div>
                        </li>
                        <li className={location.pathname === "/profile" ? 'active': ''}>
                            <div className="nav-item" onClick={() => navigateTo('/profile')}>
                                <img src={`${imageBasePath}profile_icon_active.svg`} className="active" alt=""/>
                                <img src={`${imageBasePath}profile_icon_desktop.svg`} className="in-active" alt=""/>
                                <span className="heading3">YOU</span>
                            </div>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </Hidden>
        <div className="whatsappFlotingBtn">
            <a
                href="https://wa.me/+6590023563"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg className="MuiSvgIcon-root whatsappIcon jss146" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"></path></svg>
            </a>
        </div>
    </header>)
}