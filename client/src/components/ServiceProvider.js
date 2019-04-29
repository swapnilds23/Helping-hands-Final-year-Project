import React, { Component } from 'react'
import MoneyGraph from './MoneyGraph';
import Food from './Food';
import Clothes from './Clothes';
import Shelter from './Shelter';

class ServiceProvider extends Component {
  constructor (props){
      super(props);
      this.state = {service: null}
  }

  componentWillMount(){
      this.setState({ service: this.props.service()});
  }
  render(){
      if(this.state.service === "Money"){
        return (
          <MoneyGraph />
        )
      } else if(this.state.service === "Food"){
        return (
          <Food {...this.props}/>
        )
      } else if(this.state.service === "Clothes"){
        return(
          <Clothes {...this.props} />
        )
      }else if(this.state.service === "Shelter"){
        return(
          <Shelter {...this.props}/>
        )
      }
  }
}

export default ServiceProvider;
