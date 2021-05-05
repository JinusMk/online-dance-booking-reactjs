import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Header } from '../../../shared_elements';
import { Container, Grid } from '@material-ui/core';
import { AllTimeSummary } from '../components'
import '../../../assets/styles/user-progress-module.scss'
import { globalGetService } from '../../../utils/globalApiServices';

const CalorieGraph = lazy(() => import('../components/CalorieGraph'))
const TrackWeightLoss = lazy(() => import('../components/TrackWeightLoss'))
const ClassCalendar = lazy(() => import('../components/ClassCalendar'))

export default function UserProgress(props){
    const [updateCurrentWeight, setUpdateCurrentWeight] = useState(false)
    const [updateCaloriesBurnt, setUpdateCaloriesBurnt] = useState(false)
    const [subscriptionInfo, setSubscriptionInfo] = useState('')

    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push('/user-subscriptions')
        }
    }
    useEffect(() => {
        globalGetService(`userSubscriptions/${props.match.params.subscriptionId}`)
        .then(response => {
            if(response.success == true){
                setSubscriptionInfo(response.data)
            }
        })
    }, [props.match.params.subscriptionId])
    return(
        <section className="user-progress-section">
            <Header title={subscriptionInfo && subscriptionInfo?.subscription?.name ? `${subscriptionInfo?.subscription?.name} progress` : `Your progress`} onBack={handleGoBack}/>
            <Container className="user-progress-container">
                <Grid container className="progress-overview-blk wrapper">
                    <Grid item xs={12}>
                        <h3 className="heading2 activityLabel">Yay, you’re doing good!</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <AllTimeSummary subscriptionInfo={subscriptionInfo} setUpdateCurrentWeight={setUpdateCurrentWeight} updateCurrentWeight={updateCurrentWeight} setUpdateCaloriesBurnt={setUpdateCaloriesBurnt} updateCaloriesBurnt={updateCaloriesBurnt}/>
                    </Grid>
                </Grid>
                <Grid container className="calorie-graph-blk wrapper">
                    <Grid item xs={12}>
                        <Suspense fallback={<></>}>
                            <CalorieGraph setUpdateCaloriesBurnt={setUpdateCaloriesBurnt}/>
                        </Suspense>
                    </Grid>
                </Grid>
                <Grid container className="weight-loss-blk wrapper">
                    <Grid item xs={12}>
                        <Suspense fallback={<></>}>
                            <TrackWeightLoss setUpdateCurrentWeight={setUpdateCurrentWeight}/>
                        </Suspense>
                    </Grid>
                </Grid>
                <Grid container className="class-calendar wrapper" style={{borderBottom: 'none'}}>
                    <Grid item xs={12}>
                        <Suspense fallback={<></>}>
                            <ClassCalendar subscriptionInfo={subscriptionInfo}/>
                        </Suspense>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}