import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { currencySymbol } from '../../../constants';

export default function SubscriptionPlans(props){
  let params = useParams()
  const { subscriptionInfo=[] } = props
  const [value, setValue] = useState(subscriptionInfo.length ? subscriptionInfo[0]._id : '');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const getSubscriptionTitle = (arr=[]) => {
      let title = ''
      arr.forEach((a, index) => {
          title += `${a.value}${index < arr.length - 1 ? ', ' : ''}`
      })
      return title
  }
  return(
        <div className="subscription-plans" id="subscription-plans">
            <h3 className="title heading2">Subscription plans</h3>
            <ul className="listUnstyled plans-wrapper">
                {
                    subscriptionInfo.map((subscription, index) => <li className="plans-item" key={index}>
                        <h3 className="heading3">{getSubscriptionTitle(subscription.weekDays)} - {moment(subscription.startTime).format('hh:mm A')}</h3>
                        <RadioGroup aria-label="subscriptionPlans" name="subscriptionPlans" className={"radioGroup"} value={value} onChange={handleChange}>
                            <FormControlLabel key={index} value={subscription._id} control={<Radio checked={subscription._id == value ? true: false }/>} label={<div className={`label ${value == subscription._id ? 'active': '' }`}>
                                <h3 className="heading3">{`${subscription.months} ${subscription.months > 1 ? 'months' : 'month'} - ${subscription.danceClasses} classes`}</h3>
                                <p className="paragraph">
                                    <span className="cost-old">{`${currencySymbol[subscription.currencyType]}${subscription.actualCost}`}</span>
                                    {`${currencySymbol[subscription.currencyType]} ${subscription.discountedCost}`}
                                    <span className="offer">Save {`${currencySymbol[subscription.currencyType]}`}{`${subscription.actualCost - subscription.discountedCost}`}</span>
                                </p>
                            </div>} />
                        </RadioGroup>
                    </li>) 
                }
            </ul>
            <p className="link">
                <Link to={`/subscription/${params.category}/${value}/booking`} className="primaryBtn">BUY SUBSCRIPTION</Link>
            </p>
        </div>
    )
}