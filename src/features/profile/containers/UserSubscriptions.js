import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import { Header, SubscriptionCard } from '../../../shared_elements';
import { globalGetService } from '../../../utils/globalApiServices';
import { UserSubscriptionOverview, Shimmer } from '../components'
import { imageBasePath } from '../../../constants';
import { connect } from 'react-redux'
import { UPDATE_SUBSCRIPTIONS } from '../../../shared_elements/actions'
import '../../../assets/styles/user-subscription-module.scss'

function UserSubscriptions(props){
    const [loader, setLoader] = useState(true)
    // const [userSubscriptions, setUserSubscriptions] = useState([])
    const [subscriptions, setSubscriptions] = useState()
    
    useEffect(() => {
        globalGetService(`userSubscriptions`)
        .then(response => {
            if(response.success == true){
                const userSubscriptions = response.data
                props.updateUserSubscriptions(userSubscriptions)
                // setUserSubscriptions(userSubscriptions)
            }else{
                props.updateUserSubscriptions([])
            }
        })
    }, [props.userInfo])
    useEffect(() => {
        setLoader(true)
        globalGetService(`subscriptions`)
        .then(response => {
            setLoader(false)
            if(response.success === true){
                setSubscriptions(response.data)
            }
        })
    }, [])
    const handleGoBack = () => {
        if(props.location.state && props.location.state.prevPath){
            props.history.push(`${props.location.state.prevPath}`)
        }else{
            props.history.push('/profile')
        }
    }
    const { userSubscriptions } = props
    return(
        <section className="user-subscription-section">
            <Header title="Subscriptions" onBack={handleGoBack}/>
            <Container className="user-subscription-container">
            { loader ? <Shimmer type="user-subscriptions"/> : <>
                    {
                        (( userSubscriptions && userSubscriptions.length ) || ( subscriptions && Object.keys(subscriptions).length )) ? <><ul className="user-subscription-listing listUnstyled">
                            { userSubscriptions && userSubscriptions.length ? userSubscriptions.map((subscription, index) => <UserSubscriptionOverview key={index} subscription={subscription}/>) : null }
                            { subscriptions && Object.keys(subscriptions).length ? Object.keys(subscriptions).map((key, index) => {
                                if(subscriptions[key].length){
                                    const subscriptionCategory = subscriptions[key]
                                    if(!subscriptionCategory.some(cat => cat.status == "active")){
                                        return <li key={index} item xs={12} className="user-subscription-list-item">
                                            <h3 className="heading2 subscriptionTitle">{`${subscriptionCategory[0]?.name} subscription`}</h3>
                                            <SubscriptionCard subscriptionItem={subscriptionCategory[0]} active={false}/>
                                        </li>
                                    }
                                }
                            }): null}
                        </ul> 
                        <div className="end-wrapper textCenter">
                            <img src={`${imageBasePath}dancing_emoji.svg`}/>
                            <p className="paragraph">{`That’s all folks`}</p>
                        </div>
                        </>: <div className="end-wrapper textCenter">
                            <img src={`${imageBasePath}dance_group.svg`}/>
                            <p className="paragraph">{`This is not the end, my friend`}</p>
                        </div>
                    }
                </>
            }
            </Container>
        </section>
    )
}
const mapStateToProps = state => ({
    isLoggedIn: state.sharedReducers.isLoggedIn,
    userSubscriptions: state.sharedReducers.userSubscriptions,
})
const mapDispatchToProps = dispatch => ({
    updateUserSubscriptions : (userSubscriptions) => dispatch({
        type: UPDATE_SUBSCRIPTIONS,
        payload: userSubscriptions
    }),
})
export default connect(mapStateToProps, mapDispatchToProps)(UserSubscriptions)