import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Alerts from './Components/Alerts/Alerts';
import PrivateRoute from './Components/Routing/PrivateRoute';

import ContactState from './Context/Contact/ContactState';
import AuthState from './Context/Auth/AuthState';
import AlertState from './Context/Alert/AlertState';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment> 
              <Navbar />
              <div className="container"> 
                <Alerts />
                <Switch> 
                  <PrivateRoute exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/register' component={Register}/>
                  <Route exact path='/login' component={Login}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>  
  );
}

export default App;
