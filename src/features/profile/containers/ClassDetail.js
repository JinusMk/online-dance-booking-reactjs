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
import { ReviewCard, RecapItem } from '../../home/components';

function ClassDetail(props){
    const [loader, setLoader] = useState(true)
    const [danceInfo, setDanceInfo] = useState(null)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [publicLink, setPublicLink] = useState('')

    useEffect(() => {
        if(props.match.params.danceCategory && props.match.params.danceId){
            globalGetService(`dance-classes/${props.match.params.danceId}`)
            .then(response => {
                if(response.success == true){
                    setDanceInfo(response.data)
                    setLoader(false)
                }else if(response.message && !response.success){
                    toastFlashMessage(response.message, 'error')
                }else if(response.error){
                    toastFlashMessage(response.error, 'error')
                }
            })
            setCategory(props.match.params.danceCategory)
        }else if(props.match.params.subscriptionCategory && props.match.params.danceId){
            setCategory(props.match.params.subscriptionCategory)
            setType('subscription')
            globalPostService(`danceClassByDate`, { userDanceClassID : props.match.params.danceId })
            .then(response => {
                if(response.success == true){
                    setDanceInfo(response.data && response.data.length ? response.data[0] : {})
                    setPublicLink(response.publicLink)
                    setLoader(false)
                }else if(response.message && !response.success){
                    toastFlashMessage(response.message, 'error')
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
                            {loader ? <Skeleton variant="rect" height={24} width={160}/> : <h3 className="heading3">{`${moment(danceInfo.eventDate).format('DD MMM YYYY')}, ${moment(danceInfo.startTime).format(`hh:mm A`)}`}</h3>}
                        </div>
                    </Grid>
                    {loader ? null :<> 
                        {type == "subscription" ? <Grid item xs={12}>
                            <div className="calories-burnt-info">
                                <p className="secondaryText">CALORIES BURNED</p>
                                <h3 className="heading3">{`~ ${danceInfo.instructor?.calories ? danceInfo.instructor.calories : `--`} Calories`}</h3>
                                <p className="paragraph info">(Data from the instructor’s fitness watch)</p>
                            </div>
                        </Grid>: null}
                        <Grid item xs={12}>
                            <div className="review-block">
                                {(danceInfo.review && danceInfo.review?.danceRating) ? <ReviewDetails review={danceInfo.review}/> : <AddReviewCard category={category} danceId={danceInfo._id}/>}
                            </div>
                        </Grid>
                        {type == "subscription" ? <> <Grid item xs={12}>
                            <div className="part-of-subscription">
                                <p className="secondaryText">PART OF SUBSCRIPTION</p>
                                <h3 className="heading3">{`${danceInfo.title ? danceInfo.title : category} (${danceInfo.danceClassNumber} of ${danceInfo.totalDanceClasses})`}</h3>
                            </div>
                        </Grid>
                        {danceInfo.instructor?.feedback ? <Grid item xs={12}>
                            <div className="instructor-feedback">
                                <p className="secondaryText">INSTRUCTOR FEEDBACK</p>
                                <ReviewCard review={{
                                    description: danceInfo.instructor?.feedback,
                                    name: danceInfo.instructor?.name,
                                    reviwed_by: danceInfo.instructor?.name,
                                    category: category,
                                    class_date: moment(danceInfo.eventDate).format('DD-MM-YYYY'),
                                    img: danceInfo.instructor?.image
                                }} page="detail" type="instructor-review"/>
                            </div>
                        </Grid> : null}
                        {/* {danceInfo.record ? <RecordingVideo 
                            recordingData={{
                                // img: ,
                                media: `${publicLink}/${danceInfo.record}`,
                                category: danceInfo.category?.name,
                                instructor: danceInfo.instructor?.name,
                                participants: danceInfo.participants,
                                date: danceInfo.eventDate
                            }}
                        /> : null} */}
                        </> : <Grid item xs={12}>
                            <div className="payment-info">
                                <p className="secondaryText">{'PAID ONLINE'}</p>
                                <h3 className="heading3 cost"><span className="cost-old">{`${currencySymbol[danceInfo.currencyType]}${danceInfo.actualCost}`}</span>{`${currencySymbol[danceInfo.currencyType]}${danceInfo.discountedCost}`}</h3>
                            </div>
                        </Grid>}
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