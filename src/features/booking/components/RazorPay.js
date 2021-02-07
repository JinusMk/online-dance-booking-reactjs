import React, { Component } from 'react';

export default class RazorPay extends Component {
  constructor() {
    super()
    this.changeAmount = this.changeAmount.bind(this);
    this.openCheckout = this.openCheckout.bind(this);
    this.state = {
      amount: 0
    };
  }

  changeAmount(e) {
    this.setState({amount: (e.target.value * 100)})
  }

  openCheckout() {
    let options = {
      "key": "rzp_test_3a32WAb72hsqHj",
      "amount": this.state.amount,
      "name": "Merchant Name",
      "description": "Purchase Description",
      "image": "/your_logo.png",
      "handler": function (response){
        alert(response.razorpay_payment_id);
      },
      "prefill": {
        "name": "Harshil Mathur",
        "email": "harshil@razorpay.com"
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#F37254"
      }
    };
    
    let rzp = new window.Razorpay(options);
    rzp.open();
  }
  
  render () {
    return (
      <div>
        <input type='text' onChange={
           this.changeAmount
          } />
        <button onClick={this.openCheckout}>Pay  {this.state.amount/100}</button> 
      </div>
    )
  }
}