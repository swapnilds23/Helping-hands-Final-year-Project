import React, { Component } from 'react';
import { Rate, Icon, Layout } from 'antd';
import './App.css';
import { withRouter } from 'react-router-dom';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const { Content } = Layout;

class Greeting extends Component {

  state = {
      value: 0,
      user:null,
      amount:null
    }

    handleChange = (value) => {
      this.setState({ value });
      this.props.history.push("/")
    }

    componentWillMount(){
      const userId = this.props.location.state.userId;
      const amount = this.props.location.state.amount;
      this.setState ({
        user: userId,
        amount: amount
      })
    }

render() {
      const { value, user, amount } = this.state;
      return (
        <Layout>
          <Content style={{
            margin: '5% 2%', padding: 24, background: '#fff', minHeight: 500,
          }}>
          <div >
              <br />
             <p className="greetText"> <Icon type="check-circle" theme="filled" style={{ color: '#73d13d' }} />
              {' '} Payment Successful !</p>
            <h3 className="gText"> Thank you {user}! Your payment of ${amount/100}  has been received</h3>
            <h3 className="gText"> How do you like our service so far?</h3>
          </div>
          <span className="star">
            <Rate allowHalf tooltips={desc} value={value} onChange={this.handleChange}  />
            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
          </span>
          </Content>
        </Layout>
      )
   }
}

export default withRouter(Greeting);
