import React, { useState } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Link } from 'react-router-dom'

export default function SubscriptionPlans(props){
    const { category } = props
    const [value, setValue] = useState(1);
    const [data, setData] = useState([
        {
            title: `Wed, Sat, Sun - 6 PM`,
            subscriptions: [
                {
                    id: 1,
                    label: `1 month - 12 classes`,
                    cost_old: `2,500`,
                    cost: `2,100`,
                    offer: `400`
                },
                {
                    id: 2,
                    label: `3 months - 36 classes`,
                    cost_old: `7,500`,
                    cost: `5,700`,
                    offer: `1,800`
                }
            ]
        },
        {
            title: `Weekend - Sat, Sun - 6 PM`,
            subscriptions: [
                {
                    id: 3,
                    label: `1 month - 12 classes`,
                    cost_old: `2,000`,
                    cost: `1,400`,
                    offer: `600`
                },
                {
                    id: 4,
                    label: `3 months - 36 classes`,
                    cost_old: `7,500`,
                    cost: `5,700`,
                    offer: `1,800`
                }
            ]
        }
    ])
  const handleChange = (event) => {
    setValue(event.target.value);
  };
    return(
        <div className="subscription-plans">
            <h3 className="title heading2">Subscription plans</h3>
            <ul className="listUnstyled plans-wrapper">
                {
                    data.map((item, index) => <li className="plans-item" key={index}>
                        <h3 className="heading3">{item.title}</h3>
                        <RadioGroup aria-label="subscriptionPlans" name="subscriptionPlans" className={"radioGroup"} value={value} onChange={handleChange}>
                            {
                                item.subscriptions.map((subscription, index) => <FormControlLabel key={index} value={item.id} control={<Radio />} label={<div className={`label ${value == item.id ? 'active': '' }`}>
                                    <h3 className="heading3">{subscription.label}</h3>
                                    <p className="paragraph">
                                        <span className="cost-old">{`₹${subscription.cost_old}`}</span>
                                        ₹{subscription.cost}
                                        <span className="offer">Save ₹{`${subscription.offer}`}</span>
                                    </p>
                                </div>} />)
                            }
                        </RadioGroup>
                </li>)
                }
            </ul>
            <p className="link">
                <Link to="" className="primaryBtn">BUY SUBSCRIPTION</Link>
            </p>
        </div>
    )
}