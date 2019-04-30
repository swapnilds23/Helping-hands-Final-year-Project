import React, { Component } from 'react';
import TakeMoney from './StripeSubscription';
import Charges from './ApplyCharges';
import { Tabs, Card, Col, Row, Radio } from 'antd';
import './App.css';
import NumericInput from './InputNumber';

const TabPane = Tabs.TabPane;

class Payments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null };
  }

  onChange = (value) => {
    console.log(value)
  this.setState( {value: parseInt(value, 10)} );
  }


render() {
      //console.log(this.state.value)
      return (

        <div className="card-container">
          <Tabs type="card">

            <TabPane tab="Monthly Donation" key="1">

            <div style={{ background: '#ECECEC', padding: '30px' }}>

              <Row type ="flex" justify="start" >
                <h2 className="uText"> Here's what your monthly donation could achieve in a Year:</h2>
              </Row>

              <Row type="flex" justify="space-around" >

                <Col span={6}>

                    <Card
                      hoverable = {true}
                      style={{ width: 240 }}
                      bordered={false}
                      cover={<img alt="example" src={require("./five-dollars.jpg")} />}
                    >
                      <Radio value={500} onChange={this.onChange} />
                    </Card>
                </Col>

                <Col span={6}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="example" src={require("./ten-dollars.jpg")} />}
                    >
                      <Radio value={1000} onChange={this.onChange} />
                    </Card>
                </Col>

                <Col span={6}>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="example" src={require("./fifteen-dollars.jpg")} />}
                    >
                      <Radio value={1500} onChange={this.onChange} />
                    </Card>
                </Col>

                <Col span={6}>



                  <Row style={{ marginBottom: 14 }}>
                    <br/>
                    <br/>
                    <br />
                    <br/>
                    <br/>
                    <TakeMoney amount={this.state.value}/>
                  </Row>

                </Col>

              </Row>
            </div>
            </TabPane>

            <TabPane tab="One-off Donation" key="2">
                <div className="div1">
                <br />
                <br />
                <h1 className="headingtag"><b>
                  <p>Small Effort<br/>
                    Make Big Change</p>
                    <NumericInput style={{ width: 150, height: 40}}  onChange={this.onChange} />
                    {' '}
                    <Charges amount={this.state.value}/>
                  </b></h1>
                </div>
            </TabPane>

          </Tabs>
        </div>
      )
   }
}

export default Payments;
