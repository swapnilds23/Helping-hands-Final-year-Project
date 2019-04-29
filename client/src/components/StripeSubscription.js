import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { graphql } from 'react-apollo';
import { DONAR_SUBSCRIPTION } from './../queries';
import { Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';

require("dotenv").config({path: ".env" });

class TakeMoney extends React.Component {

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
                    state: { userId: res.data.createSubscription.username,
                             amount: amount }
                  })
               })
              .catch((errors)=> {
                  console.log(errors)
                  this.setState({error: errors.graphQLErrors.map(error => error.message)});
                }
              )
        }}
        currency="USD"
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
        amount={this.props.amount}
      >
      { this.state.error ?

         notification.open(args)
          :
          null
      }
      <Button  style={{backgroundColor: "#52c41a", fontFamily: "Georgia", fontWeight: "bold", boxShadow: "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)"}} icon="dollar" size="large" margin="10px">
       Donate Now
     </Button>

     </StripeCheckout>
    )
  }
}

export default withRouter(graphql(DONAR_SUBSCRIPTION)(TakeMoney))
