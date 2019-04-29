import React, { Component } from 'react';
import { Rate, Icon } from 'antd';
import './App.css';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import { withRouter } from 'react-router-dom';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class Greeting extends Component {

  state = {
      value: 0,
      user:null,
      amount:null
    }

    handleChange = (value) => {
      this.setState({ value });
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
        <div>
          <div>
              <br />
             <p className="greetText"> <Icon type="check-circle" theme="filled" style={{ color: '#73d13d' }} />
              {' '} Payment Successful !</p>
            <h3 className="gText"> Thank you {user}! Your payment of {amount}  has been received</h3>
          </div>
          <br />
          <span>
            <Rate tooltips={desc} onChange={this.handleChange}  defaultValue={2.5}/>
            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
          </span>
        </div>
      )
   }
}

export default withRouter(Greeting);
