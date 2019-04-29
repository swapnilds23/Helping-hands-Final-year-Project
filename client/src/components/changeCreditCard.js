import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { graphql } from 'react-apollo';
import { UPDATE_CARD_DETAILS } from './../queries';
import { Button } from 'antd';
require("dotenv").config({path: ".env" });


class UpdateCreditCard extends React.Component {

  state={
    error:""
  }

  render() {
    return (
      // ...
      <StripeCheckout
        token={(token) => {
            const { id, email } = token
            this.props.mutate({
                variables: {
                  source:id,
                  email: email
                }
            }). then((res)=>
               { //console.log(res.data.login.id)
                  console.log(res.data)
               })
              .catch((errors)=> {
                  this.setState({error:errors.graphQLErrors.map(error => error.message)});
                }
              )
        }}
        name="Three Comma Co."
        description="Big Data Stuff"
        currency="USD"
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
        panelLabel="Pay with new credit card"
      >
        <Button type="primary" shape="round" size="large" margin="10px">
         Pay with new credit card
       </Button>
       </StripeCheckout>
    )
  }
}

export default graphql(UPDATE_CARD_DETAILS)(UpdateCreditCard)
