import React, { Component } from 'react'
import { Modal, Button, Form, Icon, Input, Alert } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import  './App.css';
import Captcha from './ReCaptcha';
import { graphql } from 'react-apollo';
import { LOGIN_DONAR } from './../queries';

class DonarLogin extends Component {

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
                 username: values.userName,
                 password: values.password
               }
         }). then((res)=>
            { //console.log(res.data.login.id)
              localStorage.setItem("User_Id", res.data.login.id);
              this.props.history.push('/donar')
            })
           .catch((errors)=> {
               this.setState({error:errors.graphQLErrors.map(error => error.message)});
             }
           )
       }
     });
   }


render() {
    const { getFieldDecorator } = this.props.form;

    let modalClose = () => {
      this.setState({ showModel: false })
      this.props.history.push('/')
    }

    return (
      <Modal
        centered
        visible = {this.state.showModel}
        onCancel={modalClose}
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

                <Form.Item>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
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

                  <Button type="primary" htmlType="submit" className="login-form-button" >
                    Log in
                  </Button>
                  If new user<Link to='/'> Register</Link>
                </Form.Item>

              </Form>
     </Modal>
    );
  }
}

export default withRouter(graphql(LOGIN_DONAR)(Form.create({ name: 'normal_login' })(DonarLogin)));
