import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core';
import { Header } from '../../../shared_elements';
import { globalGetService } from '../../../utils/globalApiServices';
import { UserSubscriptionOverview } from '../components'
import { imageBasePath } from '../../../constants';
import '../../../assets/styles/user-subscription-module.scss'

export default function UserSubscriptions(props){
    const [loader, setLoader] = useState(true)
    const [userSubscriptions, setUserSubscriptions] = useState([])

    useEffect(() => {
        globalGetService(`userSubscriptions`)
        .then(response => {
            if(response.success === true){
                setLoader(false)
                const userSubsctiption = response.data
                setUserSubscriptions(userSubsctiption)
            }
        })
    }, [props.userInfo])
    return(
        <section className="user-subscription-section">
            <Header title="Subscriptions" onBack={() => props.history.push('/profile')}/>
            <Container className="user-subscription-container">
            {
                loader ? 'Loading...' : userSubscriptions && userSubscriptions.length ? <Grid container className="user-subscription-listing">
                    {
                        userSubscriptions.map((subscription, index) => <UserSubscriptionOverview key={index} subscription={subscription}/>)
                    }
                </Grid>:  <div className="end-wrapper textCenter">
                    <img src={`${imageBasePath}dance_group.svg`}/>
                    <p className="paragraph">{`This is not the end, my friend`}</p>
                </div>
            }
            </Container>
        </section>
    )
}