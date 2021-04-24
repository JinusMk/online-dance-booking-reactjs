import React, { lazy, Suspense } from 'react'
import { Header } from '../../../shared_elements';
import { Container, Grid } from '@material-ui/core';
import { AllTimeSummary } from '../components'
import '../../../assets/styles/user-progress-module.scss'

const CalorieGraph = lazy(() => import('../components/CalorieGraph'))
const TrackWeightLoss = lazy(() => import('../components/TrackWeightLoss'))

export default function UserProgress(props){
    
    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push('/user-subscriptions')
        }
    }
    return(
        <section className="user-progress-section">
            <Header title="Your progress" onBack={handleGoBack}/>
            <Container className="user-progress-container">
                <Grid container className="progress-overview-blk wrapper">
                    <Grid item xs={12}>
                        <h3 className="heading2 activityLabel">Yay, you’re doing good!</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <AllTimeSummary />
                    </Grid>
                </Grid>
                <Grid container className="calorie-graph-blk wrapper">
                    <Grid item xs={12}>
                        <Suspense fallback={<></>}>
                            <CalorieGraph />
                        </Suspense>
                    </Grid>
                </Grid>
                <Grid container className="weight-loss-blk wrapper">
                    <Grid item xs={12}>
                        <Suspense fallback={<></>}>
                            <TrackWeightLoss />
                        </Suspense>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}