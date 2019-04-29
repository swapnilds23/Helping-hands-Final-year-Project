import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

//Styling
import 'antd/dist/antd.css';

//import components
import App from './components/App';
import NavigationBar from './components/navbar';
import Donar from './components/donar';
import Homeless from './components/homeless';
import DonarLogin from'./components/Login';
import Greeting from './components/Greeting';
import RegistrationForm from './components/DonarRegistration';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import  ApolloClient  from 'apollo-boost';
import  { ApolloProvider }  from 'react-apollo';

const client = new ApolloClient ({
    uri: 'http://localhost:4444/graphql',
    credentials: 'include'
    ,
    onError: (networkError) => {
      if(networkError){
        console.log('Network Error', networkError);
        }
      }
});

const Root=()=>(
  <Router>
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route path="/"  exact component={App} />
        <Route path="/login" render ={() => <DonarLogin showModel ={true} />} />
        <Route path="/register" render ={() => <RegistrationForm showModel ={true} />} />
        <Route path="/donar"  component={Donar}/>
        <Route path="/homeless"  component={Homeless}/>
        <Route path="/greeting"  component={Greeting}/>
       </Switch>
    </Fragment>
  </Router>
);


// const RootWithSession = WithSession(Root);

ReactDOM.render(
    <ApolloProvider client = {client}>
        <Root />
    </ApolloProvider>,
document.getElementById('root')
);
