import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core';
import { Header, DanceInformationCard, DanceInformationLoader } from  '../../../shared_elements'
import { globalGetService, globalPostService } from '../../../utils/globalApiServices';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment'
import { AddReviewCard, ReviewDetails } from '../components'
import { toastFlashMessage } from '../../../utils';
import { currencySymbol } from '../../../constants';
import '../../../assets/styles/class-detail-module.scss'

function ClassDetail(props){
    const [loader, setLoader] = useState(true)
    const [danceInfo, setDanceInfo] = useState(null)
    const [category, setCategory] = useState('')
    
    useEffect(() => {
        if(props.match.params.danceCategory && props.match.params.danceId){
            globalGetService(`dance-classes/${props.match.params.danceId}`)
            .then(response => {
                if(response.success == true){
                    setDanceInfo(response.data)
                    setLoader(false)
                }else if(response.error){
                    toastFlashMessage(response.error, 'error')
                }
            })
            setCategory(props.match.params.danceCategory)
        }else if(props.match.params.subscriptionCategory && props.match.params.danceId){
            setCategory(props.match.params.subscriptionCategory)
            globalPostService(`danceClassByDate`, { userDanceClassID : props.match.params.danceId })
            .then(response => {
                if(response.success == true){
                    setDanceInfo(response.data)
                    setLoader(false)
                }else if(response.error){
                    toastFlashMessage(response.error, 'error')
                }
            })
        }
    }, [])
    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push('/dance-history')
        }
    }
    return(
        <section className="class-detail-section">
            <Header onBack={handleGoBack} title="Dance" />
            <Container className="class-detail-container">
                {loader ? <DanceInformationLoader /> : <DanceInformationCard dance={danceInfo} category={category}/>}   
                <Grid container className="">
                    <Grid item xs={12}>
                        <div className="timeWrapper">
                            <p className="secondaryText">DATE & TIME</p>
                            {loader ? <Skeleton variant="rect" height={24} width={160}/> : <h3 className="heading3">{`${moment(danceInfo.event_date, 'DD-MM-YYYY').format('DD MMM YYYY')}, ${moment(danceInfo.startTime).format(`hh:mm A`)}`}</h3>}
                        </div>
                    </Grid>
                    {loader ? null :<> <Grid item xs={12}>
                        <div className="review-block">
                            {(danceInfo.review && danceInfo.review?.danceRating) ? <ReviewDetails review={danceInfo.review}/> : <AddReviewCard category={category} danceId={danceInfo.id}/>}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="payment-info">
                            <p className="secondaryText">{danceInfo.userDetails && danceInfo.userDetails.payment_method == "offline" ? 'PAY AT CLASS' : 'PAID ONLINE'}</p>
                            <h3 className="heading3 cost"><span className="cost-old">{`${currencySymbol[danceInfo.currencyType]}${danceInfo.actualCost}`}</span>{`${currencySymbol[danceInfo.currencyType]}${danceInfo.discountedCost}`}</h3>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="need-help">
                            <p className="secondaryText">NEED HELP ON THIS BOOKING ?</p>
                            <p className="paragraph link"><a>Contact admin@letzdance.co</a></p>
                        </div>
                    </Grid>
                    </>}
                </Grid>
            </Container>
        </section>
    )
}
export default ClassDetail