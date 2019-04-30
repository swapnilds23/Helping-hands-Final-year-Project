import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { graphql } from 'react-apollo';
import { CHARGES } from './../queries';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';

require("dotenv").config({path: ".env" });

class Charges extends React.Component {

  state={
    error:"",
    value:"",
    user:null
  }

  componentWillMount() {
    const user = localStorage.getItem('User_Id');
    this.setState({ user });
  }

  render() {
    const userId = this.state.user
    const amount = this.props.amount

    const args = {
      message: 'Error',
      description: this.state.error,
      duration: 7,
    }

    return (


      <StripeCheckout
        token={(token) => {
            const { id, email } = token
            // eslint-disable-next-line
            this.props.mutate({
                variables: {
                  source:id,
                  email: email,
                  userId: userId,
                  amount: amount
                }
            }). then((res)=>
               {
                  // console.log(res.data.createSubscription.username)
                  this.props.history.push({
                    pathname:'/greeting',
                    state: { userId: res.data.createCharges.username,
                             amount: amount }
                  })
               })
              .catch((errors)=> {
                  console.log(errors)
                  this.setState({error: errors.graphQLErrors.map(error => error.message)});
                }
              )
        }}
        billingAddress
        description="Helping Hands"
        image={require("./pay.png")}
        currency="USD"
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
        amount={this.props.amount}
      >
      { this.state.error ?

         notification.open(args)
          :
          null
      }
      <Button className="btn" icon="dollar" shape="round" size="large" margin="10px">
       Donate
     </Button>

     </StripeCheckout>
    )
  }
}

export default withRouter(graphql(CHARGES)(Charges))
