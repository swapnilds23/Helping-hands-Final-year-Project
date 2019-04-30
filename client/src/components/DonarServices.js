import React, { Component } from 'react'
import { Row, Button } from 'antd';

class DonarService extends Component {


  render(){

    return(

         <div align="center" className="divDonor">
          <br />
          <br />
          <br />
          <br />
          <br />
             <Row>
              <Button className="btn" shape="round" size="large" margin="10px" onClick ={() => this.props.setService("Money")}>
                  Donate Money
              </Button>
            </Row>
            <Row>
            <br />
            </Row>
            <Row >
              <Button className="btn" shape="round" margin="10px" size="large" onClick ={() => this.props.setService("Food")}>
                Donate Food
              </Button>
            </Row>
            <Row>
            <br />
            </Row>
            <Row >
              <Button className="btn" shape="round" margin="10px" size="large" onClick ={() =>this.props.setService("Clothes")}>
                Donate Clothes
              </Button>
            </Row>
        </div>

    )
  }
}

export default DonarService;
