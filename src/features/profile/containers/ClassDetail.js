import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core';
import { Header, DanceInformationCard, DanceInformationLoader } from  '../../../shared_elements'
import { globalGetService } from '../../../utils/globalApiServices';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment'
import { AddReviewCard, ReviewDetails } from '../components'
import { toastFlashMessage } from '../../../utils';
import { currencySymbol } from '../../../constants';
import '../../../assets/styles/class-detail-module.scss'

function ClassDetail(props){
    const [loader, setLoader] = useState(true)
    const [danceInfo, setDanceInfo] = useState(null)
    const [category, setCategory] = useState(props.match.params.danceCategory)
    
    useEffect(() => {
        globalGetService(`dance-classes/${props.match.params.danceId}`)
            .then(response => {
                if(response.success == true){
                    setDanceInfo(response.data)
                    setLoader(false)
                }else if(response.error){
                    toastFlashMessage(response.error, 'error')
                }
        })
    }, [])
    return(
        <section className="class-detail-section">
            <Header onBack={() => props.history.push('/dance-history')} title="Dance" />
            <Container className="class-detail-container">
                {loader ? <DanceInformationLoader /> : <DanceInformationCard dance={danceInfo} category={category}/>}   
                <Grid container className="">
                    <Grid item xs={12}>
                        <div className="timeWrapper">
                            <p className="secondaryText">DATE & TIME</p>
                            {loader ? <Skeleton variant="rect" height={24} width={160}/> : <h3 className="heading3">{`${moment(danceInfo.event_date, 'DD-MM-YYYY').format('DD MMM YYYY')}, ${danceInfo.class_start_time}`}</h3>}
                        </div>
                    </Grid>
                    {loader ? null :<> <Grid item xs={12}>
                        <div className="review-block">
                            {(danceInfo.userDetails && danceInfo.userDetails.dance_rating) ? <ReviewDetails review={danceInfo.userDetails}/> : <AddReviewCard category={category} danceId={danceInfo.id}/>}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="payment-info">
                            <p className="secondaryText">{danceInfo.userDetails && danceInfo.userDetails.payment_method == "offline" ? 'PAY AT CLASS' : 'PAID VIA'}</p>
                            <h3 className="heading3 cost"><span className="cost-old">{`${currencySymbol[danceInfo.currencyType]}${danceInfo.cost_old}`}</span>{`${currencySymbol[danceInfo.currencyType]}${danceInfo.cost}`}</h3>
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