import React, { Component } from 'react'
import Model from './model'
import { Layout, Row, Button } from 'antd';
const { Content, Footer} = Layout;


class App extends Component {
  constructor(...args) {
   super(...args);

   this.state = {
     showModel: false,
     type:''
   };

   this.handleDonarModel = this.handleDonarModel.bind(this);
   this.handleHomelessModel = this.handleHomelessModel.bind(this);
 }

  handleDonarModel() {
    let newState = this.state;
      newState.showModel = true;
      newState.type = 'Donar';
      this.setState(newState);
  }


  handleHomelessModel() {
    let newState = this.state;
      newState.showModel = true;
      newState.type = 'Homeless';
      this.setState(newState);
  }

  render(){
        let modalClose = () => this.setState({ showModel: false });
    return(

      <Layout >

           <Content className ="divMain" style={{
             margin: '5% 2%', padding: 24,  minHeight: 500,
           }}
         >
         <div className="center-align ">

             <Row>
             <br />
             <br />
             <br />
             <br />
             <br />
             <Button className="btn" shape="round" size="large" margin="10px" onClick ={this.handleDonarModel}>
                  Helper
              </Button>
            </Row>
            <Row>
            <br />
            </Row>
            <Row >
              <Button className="btn" shape="round" margin="10px" size="large" onClick ={this.handleHomelessModel}>
                Homeless
              </Button>
            </Row>
        </div>

        {this.state.showModel ?
              <Model
                visible={this.state.showModel}
                type={this.state.type}
                onCancel={modalClose}
              /> :
              null
          }

         </Content>
        <Footer style={{ textAlign: 'center' }}>
          Helping handle
        </Footer>
       </Layout>
    )
  }
}

export default App;
