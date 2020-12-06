import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core';
import { Header } from '../../../shared_elements';
import { globalGetService } from '../../../utils/globalApiServices';
import { reviewsData } from '../../../constants'
import '../../../assets/styles/reviews-listing-module.scss'
import { ReviewCard } from '../components';

export default function ReviewsListing(props){
    const [reviews, setReviews] = useState(reviewsData)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        globalGetService(`review-list`)
        .then(response => {
            if(response.success === true){
                setLoader(false)
                setReviews([...reviewsData, ...response.data.filter(item => item.description )])
            }
        })
    }, [])
    return(
        <section className="reviews-listing-section">
            <Header onBack={() => props.history.push('/')} title="Letzdancers speak" />
            <Container className="reviews-listing-container">
                {
                    loader ? 'Loading...' : <Grid container className="" spacing={3}>
                        {
                            reviews.map((review, index) => <Grid item xs={12} md={4} sm={6}>
                                <ReviewCard key={index} review={review} type="detail"/>
                            </Grid>)
                        }
                    </Grid>
                }
            </Container>
        </section>
    )
}