import React, { Component, Children } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Layout from './Layout';
import LogIn from './LogIn'
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
      <Route path="/login" component={LogIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/" component={Layout}/>
      </Switch>
      </div>
    </Router>
  )
}

export default App;