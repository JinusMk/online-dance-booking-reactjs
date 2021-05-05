import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'
import { imageBasePath } from '../../../constants';
import { checkNumberOfDaysLeft } from '../../../utils';
import { globalGetService } from '../../../utils/globalApiServices';

export default function UserSubscriptionOverview(props){
    const { subscription } = props
    const [caloriesBurnt, setCaloriesBurnt] = useState(0)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if(subscription && subscription._id){
            globalGetService(`calorie/${subscription._id}`)
            .then(response => {
                setLoader(false)
                if(response.success == true){
                    const calorieLog = response.data
                    let sum = 0
                    calorieLog.forEach((log) => {
                        sum+=Number(log.calories)
                    })
                    setCaloriesBurnt(sum)
                }
            })
        }
    }, [subscription])

    let location = useLocation()
    
    return(
        <li className="user-subscription-list-item">
            <h3 className="heading2 subscriptionTitle">{`${subscription.subscription?.name} subscription`}</h3>
            <div className="user-subscription-overview">
                {checkNumberOfDaysLeft(subscription.endDate) < 0 ? <label className="expire secondaryText">EXPIRED</label> : checkNumberOfDaysLeft(subscription.endDate) <=7 ? <label className="expire secondaryText">EXPIRING SOON</label> : <label className="active secondaryText">ACTIVE</label> }
                <Grid className="overview-info" container spacing={0}>
                    <Grid item xs={4}>
                        <div className="overview-item textCenter">
                            <h1 className="heading1">{subscription.danceClassesAttended}<span>/{subscription.subscription?.danceClasses}</span></h1>
                            <p className="secondaryText">CLASSES <br/>COMPLETED</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} >
                        <div className="overview-item textCenter">
                            <h1 className="heading1">{loader ? '--' : caloriesBurnt ? caloriesBurnt : 0}<span>k</span></h1>
                            <p className="secondaryText">CALORIES <br/> BURNED</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} >
                        <div className="overview-item textCenter">
                            <img src={`${imageBasePath}badge_icon_${subscription.badge ? subscription.badge : 0}.svg`} />
                            <p className="secondaryText">LEVEL</p>
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <div className="bottom-blk">
                              {checkNumberOfDaysLeft(subscription.endDate) < 0 ? <p className="paragraph textCenter danger">{`EXpired on ${moment(subscription.endDate).format(`DD MMM YYYY`)}`}</p> : checkNumberOfDaysLeft(subscription.endDate) <= 7 ? <p className="paragraph textCenter danger">{`Active till ${moment(subscription.endDate).format(`DD MMM YYYY`)}`}</p> : <p className="paragraph textCenter">{`Active till ${moment(subscription.endDate).format(`DD MMM YYYY`)}`}</p>}
                            {checkNumberOfDaysLeft(subscription.endDate) < 0 ? <p><Link to={{pathname: `/subscription/${subscription?.subscription?.slug}`, state: { prevPath: `${location.pathname}`}}}>RENEW SUBSCRIPTION</Link></p> : checkNumberOfDaysLeft(subscription.endDate) <= 7 ? <p><Link to={{pathname: `/subscription/${subscription?.subscription?.slug}`, state: { prevPath: `${location.pathname}`}}}>RENEW SUBSCRIPTION</Link></p> : <p><Link to={{pathname: `/user-subscriptions/${subscription._id}/progress`, state: { prevPath: `${location.pathname}`}}} className="primaryBtn">SEE MY PROGRESS</Link></p>}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </li>
    )
}