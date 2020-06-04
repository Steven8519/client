import React from 'react';
import './App.css';
import {Router, Link, Switch, Redirect, Route} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import RegisterPage from './pages/register/register.page';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: createBrowserHistory(),
    };
  }

  render() {
    const {history} = this.state;
    return(
      <Router history={history}>
        <div>
          <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/home" component={RegisterPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}