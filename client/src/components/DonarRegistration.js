import React from 'react'
import {
  Form, Input, Checkbox, Button, Modal, Alert
} from 'antd';
import Captcha from './ReCaptcha';
import { graphql } from 'react-apollo';
import { REGISTER_DONAR } from './../queries';
import { withRouter, Link } from 'react-router-dom';


class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false,
    error:"",
    autoCompleteResult: [],
    showModel:this.props.showModel
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // eslint-disable-next-line
        this.props.mutate({
            variables: {
              username: values.username,
              email: values.email,
              password: values.password
            }
        }). then(()=> this.props.history.push('/login'))
          .catch((errors)=> {
              this.setState({error:errors.graphQLErrors.map(error => error.message)});
            }
          )
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    let modalClose = () => {
      this.setState({ showModel: false })
      this.props.history.push('/')
    }

    return (

      <Modal
      centered
      onCancel={modalClose}
      visible = {this.state.showModel}
      footer={null}
      >

      <Form.Item />

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

          <Form {...formItemLayout} onSubmit={this.handleSubmit} >

                <Form.Item
                  label="Username"
                >
                    {getFieldDecorator('username', {
                      rules: [ {
                        required: true, message: 'Please input your username',
                      }],
                    })(
                      <Input />
                    )}
                </Form.Item>

                <Form.Item
                  label="E-mail"
                >
                    {getFieldDecorator('email', {
                      rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                      }, {
                        required: true, message: 'Please input your E-mail!',
                      }],
                    })(
                      <Input />
                    )}
                </Form.Item>

                <Form.Item
                  label="Password"
                >
                    {getFieldDecorator('password', {
                      rules: [{
                        required: true, message: 'Please input your password!',
                      }, {
                        validator: this.validateToNextPassword,
                      }],
                    })(
                      <Input type="password" />
                    )}
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                      rules: [{
                        required: true, message: 'Please confirm your password!',
                      }, {
                        validator: this.compareToFirstPassword,
                      }],
                    })(
                      <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
               </Form.Item>

                <Form.Item
                label="Captcha"
                >
                  <Captcha />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                    rules: [{
                      required: true, message: 'Please check the agreement',
                    }],
                  })(
                    <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                  )}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">Register</Button>
                   {' '}Or if registered<Link to='/login'> Login</Link>
                </Form.Item>

          </Form>

      </Modal>
    );
  }
}

export default withRouter(graphql(REGISTER_DONAR)(Form.create({ name: 'register' })(RegistrationForm)));
