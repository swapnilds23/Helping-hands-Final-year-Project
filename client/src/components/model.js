 import React, { Component } from 'react'
 import  HomelessLogin from './HomelessLogin';
 import RegistrationForm from './DonarRegistration';


class Model extends Component {

 render() {

     if(this.props.type === 'Donar'){
         return (
            <RegistrationForm showModel = {this.props.visible} />
          )
      } else {
          return(
            <HomelessLogin {...this.props} />
          )
        }
    }
 }

 export default Model;
