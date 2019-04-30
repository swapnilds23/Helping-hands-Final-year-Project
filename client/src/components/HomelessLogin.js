import React, { Component } from 'react'
import { Modal, Button, Form, Icon, Input, Checkbox, Alert } from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import  './App.css';
import Captcha from './ReCaptcha';
import { graphql } from 'react-apollo';
import { LOGIN_HOMELESS } from './../queries';

class HomelessLogin extends Component {
  state = {
    error:"",
    showModel: this.props.showModel
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // eslint-disable-next-line
        this.props.mutate({
            variables: {
              name: values.userName,
              ssn: values.ssn
            }
        }). then((res)=>
           { //console.log(res.data.login.id)
             //localStorage.setItem("User_Id", res.data.login.id);
             //console.log(document.cookie.id)
             this.props.history.push('/homeless')
           })

      }
    });
  }

render() {
const { getFieldDecorator } = this.props.form;
    return (
      <Modal
      centered
      {...this.props}
      footer={null}
      >

      { this.state.error ?

          <Alert
            message="Error"
            description={this.state.error}
            type="error"
            showIcon
          />
          :
          null
      }

      <Form onSubmit={this.handleSubmit} className="login-form">

        <Form.Item >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        
        <Form.Item >
          {getFieldDecorator('ssn', {
            rules: [{ required: true, message: 'Please input your ssn!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>

        <Form.Item
        label="Captcha"
        >
          <Captcha />
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>

        </Form.Item>
      </Form>
    </Modal>


    );
  }
}

export default  withRouter(graphql(LOGIN_HOMELESS)(Form.create({ name: 'normal_login' })(HomelessLogin)));
