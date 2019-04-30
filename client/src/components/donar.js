import React, { Component } from 'react'
import { Steps, Button, message, Layout } from 'antd';
import "./App.css";
import ReactToPrint from 'react-to-print';
import DonarService from './DonarServices';
import ServiceProvider from './ServiceProvider';
import Direction from './Direction';

const Step = Steps.Step;
const { Content } = Layout;

class Donar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      serviceType: 'abc',
      destinationLat:null,
      destinationLng:null,
      homeLat:null,
      homeLng:null,
      steps:[{
              title: 'Select the Service',
              content: <DonarService setService={this.handleService}/>,
            }, {
              title: 'Select desired center',
              content: <ServiceProvider service={this.getService}  setDestination={this.setDestination}/>,
            }, {
              title: 'Take a Print',
              content: <Direction service={this.getService} orgLat={this.getLat} orgLng= {this.getLng} destLat ={this.geDesttLat} destLng ={this.getDestLng} ref={el => (this.componentRef = el)}/>,
            }]
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  getService = () => {
    return this.state.serviceType;
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleService = (type) => {
    let newState = this.state;
      newState.serviceType = type;
      this.setState(newState);
  }

  getLat = ()=> {
    return this.state.homeLat;
  }

  getLng = ()=> {
    return this.state.homeLng;
  }

  geDesttLat = ()=> {
    return this.state.destinationLat;
  }

  getDestLng = ()=> {
    return this.state.destinationLng;
  }

  setDestination = (lat, lng) => {
    let newState = this.state;
    newState.destinationLat = lat;
    newState.destinationLng = lng;
    this.setState(newState);
  }

  componentWillMount() {

    const location = window.navigator && window.navigator.geolocation;
    if (location ) {
      location.getCurrentPosition((position) => {
        this.setState({
          homeLat: position.coords.latitude,
          homeLng: position.coords.longitude
        })
      }, (error) => {
        this.setState({
          homeLat: 'err-latitude',
          homeLng: 'err-longitude'
        })
      })
    }
  }
  render() {
    const { current } = this.state;
    return (
      <Layout>

         <Content style={{
           margin: '5% 2%', padding: 24, background: '#fff', minHeight: 520,
         }}
         >
            <div>
              <Steps current={current}>
                {this.state.steps.map(item => <Step key={item.title} title={item.title} />)}
              </Steps>
              <div className="steps-content">{this.state.steps[current].content}</div>
              <div className="steps-action">
                {
                  current < this.state.steps.length - 1
                  && <Button className="btn_new" size="large" onClick={() => this.next()}>Next</Button>
                }
                {
                  current === this.state.steps.length - 1
                  && <ReactToPrint
                        trigger={() => <Button className="btn_new" size="large"  onClick={() => message.success('Processing complete!')}>Print</Button>}
                        content={() => this.componentRef}
                      />
                }
                {
                  current > 0
                  && (
                  <Button className="btn_new" size="large" style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    Previous
                  </Button>
                  )
                }
              </div>
            </div>
      </Content>
    </Layout>
    );
  }
}

export default Donar
