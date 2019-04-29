import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {  Menu } from 'antd';

class NavigationBar extends Component {

  render(){
      return(

              <div>
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
                            <NavLink to="/about" className="navText">About US</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to="/login" className="navText">Login</NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to="/register" className="navText">Sign Up</NavLink>
                        </Menu.Item>

                  </Menu>
              </div>

      )
   }
}

export default NavigationBar;
