import React, { useEffect, useState } from 'react'
import { Container, Grid, TextField } from '@material-ui/core';
import { Skeleton, Rating} from '@material-ui/lab';
import { Header, DanceInformationLoader } from '../../../shared_elements';
import { globalGetService } from '../../../utils/globalApiServices';
import { imageBasePath } from '../../../constants';
import moment from 'moment'
import { toastFlashMessage } from '../../../utils';
import { globalPostService } from '../../../utils/globalApiServices'
import '../../../assets/styles/add-review-module.scss'

function AddReview(props){
    const [danceInfo, setDanceInfo] = useState({})
    const [loader, setLoader] = useState(true)
    const [imgLoader, setImgLoader] = useState(true)
    const [reviewData, setReviewData] = useState({
        instructor_rating: 0,
        dance_rating: 0,
        description: '',
        dance_id: props.match.params.danceId,
    })
    const [category, setCategory] = useState(props.match.params.danceCategory)
    const [error, setError] = useState({})
    const [reviewLoader, setReviewLoader] = useState(false)
    const [formWidth, setFormWidth] = useState(0)

    const handleChange = (key, val) => {
        setError({
            ...error,
            [key]: ''
        })
        setReviewData({
            ...reviewData,
            [key]: val
        })
    }

    useEffect(() => {
        globalGetService(`dance-classes/${props.match.params.danceId}`, {})
        .then(response => {
            if(response.success == true){
                setDanceInfo(response.data)
                setLoader(false)
            }else if(response.error){
                toastFlashMessage(response.error, 'error')
            }
        })
        setTimeout(() => {
            getClientWidth()
        }, 500);
    }, [])
    const getClientWidth = () => {
        const width = document.getElementById('review-form') && document.getElementById('review-form').clientWidth
        setFormWidth(width)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setReviewLoader(true)
        if(reviewData.description && reviewData.description.trim()){
            globalPostService(`review`, {...reviewData})
            .then(response => {
                setReviewLoader(false)
                if(response.success === true){
                    toastFlashMessage('Review submitted successfully', 'success')
                    handleGoBack()
                }else if(response.error){
                    toastFlashMessage(response.error, 'error')
                }
            })
            .catch(err => {
                setReviewLoader(false)
                toastFlashMessage('Something went wrong, please try again!', 'error')
            })
        }else{
            setReviewLoader(false)
            setReviewData({...reviewData, description: ''})
            setError({...error, description: 'Please enter something about the class'})
        }
    }
    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(props.location.state.prevPath)
        }else{
            props.history.push('/dance-history')
        }
    }
    return(
        <section className="add-review-section">
            <Header onBack={handleGoBack} title="Review class"/>
            <Container className="add-review-container">
                { <form onSubmit={handleSubmit} id="review-form">
                    {
                        loader ? <DanceInformationLoader /> : <>
                            <Grid container className="">
                                <Grid item xs={12}>
                                    <div className="dance-info wrapper flexCentered">
                                        {imgLoader ? <div><Skeleton variant="rect" height={72} width={72} style={{borderRadius: 8}}/></div> : null}
                                        <img src={`${imageBasePath}${category}_card_logo.svg`} className="logo" style={imgLoader ? {display: 'none'}: {}} onLoad={() => setImgLoader(false)}/>
                                        <div className="info">
                                            <h3 className="heading2">{danceInfo.title}</h3>
                                            <p className="heading3">{`${moment(danceInfo.event_date, 'DD-MM-YYYY').format('DD MMM')}, ${danceInfo.class_start_time}`}</p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="dance-rating wrapper">
                                        <h3 className="heading3 subTitle">{`Rate the class  |  ${danceInfo.title}`}</h3>
                                        <Rating
                                            name="customized-empty1"
                                            // defaultValue={4}
                                            // precision={0.5}
                                            value={reviewData.dance_rating}
                                            onChange={(e, newValue) => handleChange('dance_rating', newValue)}
                                            emptyIcon={<img src={`${imageBasePath}star-unfilled-icon.svg`} className="emptyIcon"/>}
                                            icon={<img src={`${imageBasePath}star-filled-icon.svg`} className="filledIcon"/>}
                                            className="custom-rating"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="instructor-rating wrapper">
                                        {/* <h3 className="heading3">{`Rate the instructor  |  ${danceInfo.instructor.name}`}</h3> */}
                                        <h3 className="heading3 subTitle">{`Rate the instructor  |  ${danceInfo.instructor && danceInfo.instructor.name}`}</h3>
                                        <Rating
                                            name="customized-empty2"
                                            // defaultValue={4}
                                            // precision={0.5}
                                            value={reviewData.instructor_rating}
                                            onChange={(e, newValue) => handleChange('instructor_rating', newValue)}
                                            emptyIcon={<img src={`${imageBasePath}star-unfilled-icon.svg`} className="emptyIcon"/>}
                                            icon={<img src={`${imageBasePath}star-filled-icon.svg`} className="filledIcon"/>}
                                            className="custom-rating"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="description wrapper">
                                        <h3 className={`heading3 subTitle ${error.description ? 'error' : ''}`}>{error.description ? error.description : `Say something about the class`} </h3>
                                        <div className="inputGroup">
                                            <TextField 
                                                value={reviewData.description}
                                                onChange={(e) => handleChange('description',e.target.value)}
                                                error={error.description ? true : false}
                                                placeholder="Tap to write"
                                                multiline={true}
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="footer" style={{maxWidth: formWidth ? formWidth : '100%'}}>
                                <p><a onClick={handleSubmit} className={`primaryBtn ${(reviewLoader || !(reviewData.instructor_rating && reviewData.dance_rating && reviewData.description) || Object.keys(error).find(k => error[k] != '')) ? 'disabled' : ''}`} >SUBMIT RATING</a></p>
                            </div>
                        </>
                    }
                </form>
                }
            </Container>
        </section>
    )
}
export default AddReview