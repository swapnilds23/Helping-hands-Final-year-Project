import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {  Menu, Layout } from 'antd';

const { Header } = Layout;
class NavigationBar extends Component {

  state={
    user:null
  }

  componentWillMount() {
    const user = localStorage.getItem('User_Id');
    this.setState({ user });
  }

  logout = ()=>{
    localStorage.setItem('User_Id', "");
    this.setState({user:null});
  }

  render(){
    console.log(this.state.user)
      return(
            <Layout >
              <Header>
                  <Menu
                    mode="horizontal"
                    style={{ lineHeight: '100px', position: 'fixed', width: '100%', zIndex: 100}}
                  >
                        <Menu.Item key="1">
                            <img alt="logo" src={require("./logo.png")} />
                            <NavLink to="/" />
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/" className="navText">Home</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to="/about" className="navText">About Us</NavLink>
                        </Menu.Item>
                        {
                          (this.state.user) ? (
                            <Menu.Item key="4">
                                <Link className="navText" to="/" onClick={this.logout}>Logout</Link>
                            </Menu.Item>
                          ) : (
                            <Menu.Item key="4">
                                <NavLink to="/login" className="navText">Login</NavLink>
                            </Menu.Item>
                          )

                        }
                        <Menu.Item key="5">
                            <NavLink to="/register" className="navText">Sign Up</NavLink>
                        </Menu.Item>

                  </Menu>
              </Header>

            </ Layout >

      )
   }
}

export default NavigationBar;
