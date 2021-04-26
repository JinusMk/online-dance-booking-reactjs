import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { currencySymbol } from '../../../constants';

export default function SubscriptionPlans(props){
  let params = useParams()
  const { subscriptions } = props
  const [subscriptionInfo, setSubscriptionInfo] = useState([])
  const [value, setValue] = useState('');
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
  useEffect(() => {
    if(subscriptions.length){
        setValue(subscriptions[0]._id)
        let updatedSubscriptionInfo = []
        let addressed = []
        subscriptions.forEach(item => {
            if(!addressed.includes(item._id)){
                let filtered = subscriptions.filter(sub => `${getSubscriptionTitle(sub.weekDays)} - ${moment(sub.startTime).format('hh:mm A')}` == `${getSubscriptionTitle(item.weekDays)} - ${moment(item.startTime).format('hh:mm A')}` )
                if(filtered.length > 1){
                    filtered.forEach(filterItem => {
                        addressed.push(filterItem._id)
                    })
                    updatedSubscriptionInfo.push(filtered)
                }else{
                    addressed.push(filtered[0]._id)
                    updatedSubscriptionInfo.push(filtered)
                }
            }
        })
        setSubscriptionInfo(updatedSubscriptionInfo)
    }else{
        setSubscriptionInfo([])
    }
    // setSubscriptionInfo(subscriptionInfo)
  }, [subscriptions])
  return(
        <div className="subscription-plans" id="subscription-plans">
            <h3 className="title heading2">Subscription plans</h3>
            <ul className="listUnstyled plans-wrapper">
                {
                    subscriptionInfo.length ? subscriptionInfo.map((subscription, index) => 
                    <li className="plans-item" key={index}>
                        <h3 className="heading3">{getSubscriptionTitle(subscription[0].weekDays)} - {moment(subscription[0].startTime).format('hh:mm A')}</h3>
                        {
                            subscription.map((subItem, sIndex) => <RadioGroup key={sIndex} aria-label="subscriptionPlans" name="subscriptionPlans" className={"radioGroup"} value={value} onChange={handleChange}>
                                <FormControlLabel key={index} value={subItem._id} control={<Radio checked={subItem._id == value ? true: false }/>} label={<div className={`label ${value == subItem._id ? 'active': '' }`}>
                                    <h3 className="heading3">{`${subItem.months} ${subItem.months > 1 ? 'months' : 'month'} - ${subItem.danceClasses} classes`}</h3>
                                    <p className="paragraph">
                                        <span className="cost-old">{`${currencySymbol[subItem.currencyType]}${subItem.actualCost}`}</span>
                                        {`${currencySymbol[subItem.currencyType]} ${subItem.discountedCost}`}
                                        <span className="offer">Save {`${currencySymbol[subItem.currencyType]}`}{`${subItem.actualCost - subItem.discountedCost}`}</span>
                                    </p>
                                </div>} />
                            </RadioGroup>)
                        }
                    </li>) : null
                }
            </ul>
            <p className="link">
                <Link to={`/subscription/${params.category}/${value}/booking`} className={`primaryBtn ${value ? '' : 'disabled'}`}>BUY SUBSCRIPTION</Link>
            </p>
        </div>
    )
}