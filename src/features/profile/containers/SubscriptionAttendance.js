import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, CircularProgress } from '@material-ui/core';
import '../../../assets/styles/subscription-attendance-module.scss'
import { globalPostService } from '../../../utils/globalApiServices';
import { toastFlashMessage } from '../../../utils';

export default function SubscriptionAttendance(props){
    let location = useLocation()
    const [loader, setLoader] = useState(true)
    const [loaderStatus, setLoaderStatus] = useState('Fetching the dance class details...')

    const markAttendanceApi = (danceId) => {
        globalPostService(`subscription/danceClass/attendance`, { danceClassId : danceId })
        .then(response => {
            if(response.success == true){
                console.log('marked attendance successfully')
            }else if(response.message && !response.success){
                // toastFlashMessage(response.message, 'error')
            }
        })
        
    }
    const fetchDanceClassDetail = (danceId) => {
        globalPostService(`danceClassByDate`, { userDanceClassID : danceId })
        .then(response => {
            if(response.success == true){
                const danceInfo = response.data && response.data.length ? response.data[0] : {}
                markAttendanceApi(danceId)
                if(danceInfo.zoomLink){
                    setLoaderStatus('Redirecting you to Zoom link ...')
                    setTimeout(() => {
                        setLoader(false)
                        setLoaderStatus('')
                        window.open(danceInfo.zoomLink, '_blank');
                        setTimeout(() => {
                            props.history.push('/')
                        }, 100);
                    }, 500);
                }
            }else if(response.message && !response.success){
                toastFlashMessage(response.message, 'error')
            }
        })
    }
    useEffect(() => {
        if(location.search){
            const query = new URLSearchParams(location.search);
            if(query.get('token')){
                // localStorage.setItem('idToken', JSON.stringify(query.get('token')))
                if(query.get('danceId')){
                    fetchDanceClassDetail(query.get('danceId'))
                }
            }
        }else{
            props.history.push('/')
        }
    }, [])
    return(
        <section className="subscription-attendance-section">
            <Container className="subscription-attendance-container">
                {
                    loader ? <div className="screen-loader-wrapper">
                        <CircularProgress className="loader"/>
                        <p className="paragraph">{loaderStatus}</p>
                    </div> : null
                }
            </Container>
        </section>
    )
}