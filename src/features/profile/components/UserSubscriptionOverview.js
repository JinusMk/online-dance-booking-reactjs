import React from 'react'
import { Grid } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'
import { imageBasePath } from '../../../constants';
import { checkNumberOfDaysLeft } from '../../../utils';

export default function UserSubscriptionOverview(props){
    let location = useLocation()
    const { subscription } = props
    return(
        <li item xs={12} className="user-subscription-list-item">
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
                            <h1 className="heading1">0<span>k</span></h1>
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
                            <p><Link to={{pathname: `/user-subscriptions/progress`, state: { prevPath: `${location.pathname}`}}} className="primaryBtn">SEE MY PROGRESS</Link></p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </li>
    )
}