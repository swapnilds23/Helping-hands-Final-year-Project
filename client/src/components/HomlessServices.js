import React, { Component } from 'react'
import { Row, Button } from 'antd';

class Service extends Component {


  render(){

    return(

         <div align="center" >
          <br />
          <br />
          <br />
          <br />
          <br />
             <Row>
              <Button className="btn" shape="round" size="large" margin="10px" onClick ={() => this.props.setService("Shelter")}>
                  Shelter
              </Button>
            </Row>
            <Row>
            <br />
            </Row>
            <Row >
              <Button className="btn" shape="round" margin="10px" size="large" onClick ={() => this.props.setService("Food")}>
                Food
              </Button>
            </Row>
            <Row>
            <br />
            </Row>
            <Row >
              <Button className="btn" shape="round" margin="10px" size="large" onClick ={() =>this.props.setService("Clothes")}>
                Clothes
              </Button>
            </Row>
        </div>

    )
  }
}

export default Service;


// constructor(...args) {
//  super(...args);
//
//  this.state = {
//    service:''
//  };
//
//  this.handleShelter = this.handleShelter.bind(this);
//  this.handleFood = this.handleFood.bind(this);
//  this.handleClothes = this.handleClothes.bind(this);
// }
//
// handleShelter() {
//   let newState = this.state;
//     newState.service = 'shelter';
//     this.setState(newState);
// }
//
//
// handleFood() {
//   let newState = this.state;
//     newState.service = 'food';
//     this.setState(newState);
// }
//
// handleClothes() {
//   let newState = this.state;
//     newState.service = 'clothes';
//     this.setState(newState);
// }
