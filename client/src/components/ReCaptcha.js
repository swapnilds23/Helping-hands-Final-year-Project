import React, { Component } from 'react';
import  Recaptcha  from 'react-recaptcha';
import { message } from 'antd';

class CaptchaComponent extends Component {

  constructor(props, context) {
    super(props, context);

    // this.state ={
    //   isVerified: false
    // }
    // this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }



  // handleSubscribe() {
  //     if (this.state.isVerified) {
  //         message.success('You are successfully verified');
  //     }else{
  //       message.error('Please verify that you are a human!');
  //     }
  // }

  recaptchaLoaded(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    console.log("captcha loaded Successfully")
  }

  verifyCallback(response){
    if (response) {
        message.success('You are successfully verified');
    }else{
      message.error('Please verify that you are a human!');
    }
  }

  render() {
    return (
      <div>
        <Recaptcha
            render="explicit"
            sitekey="6LdD-6AUAAAAAHetFpyacFNJ6NfWyNSI_llUACLh"
            onloadCallback={this.recaptchaLoaded}
            verifyCallback={this.verifyCallback}
        />

      </div>
    );
  };
};
export default CaptchaComponent;
