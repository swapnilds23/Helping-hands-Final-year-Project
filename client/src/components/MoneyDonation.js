import React, { Component } from 'react';
import TakeMoney from './StripeSubscription';
import UpdateCreditCard from './changeCreditCard';
import MoneyGraph from './MoneyGraph';
import Payments from './Payments'
import Greeting from './Greeting';
class MoneyDonation extends Component {

render() {
      return (
        // <div>
        // <TakeMoney />
        // <br />
        // <br />
        // <UpdateCreditCard />
        // </div>
        //<Payments />
        //<Greeting />
        <MoneyGraph />
      )
   }
}

export default MoneyDonation;
