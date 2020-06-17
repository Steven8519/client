import React from 'react';
import './App.css';
import {Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import HomePage from './pages/home/home.page';
import LoginPage from './pages/login/login.page';
import RegisterPage from './pages/register/register.page';
import DeveloperService from "../src/services/developer.service";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{
    faUser,
    faUserPlus,
    faSignInAlt,
    faHome,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Developer from "./models/developer";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: createBrowserHistory(),
            currentDeveloper: new Developer()
        };
    }

    componentDidMount() {
        DeveloperService.currentDeveloper.subscribe(data => {
            this.setState({currentDeveloper: data});
        });
    }

    logout() {
        DeveloperService.logOut().then(data => {
            this.state.history.push('/home');
        }, error => {
            this.setState({
                errorMessage: "Unexpected error occurred."
            });
        });
    }

    render() {
        const {history, currentDeveloper} = this.state;
        return (
            <Router history={history}>
                <div>
                    {this.state.currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a className="navbar-brand" href="https/reactjs.org">

                        </a>
                        <div className="navbar-nav mr-auto">
                            <Link to="/home" className="nav-item nav-link">
                                <FontAwesomeIcon icon={faHome}/> Home
                            </Link>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <Link to="/profile" className="nav-item nav-link">
                                <FontAwesomeIcon icon={faUser}/> {currentDeveloper.firstName}
                            </Link>
                            <a onClick={()=>this.logout()} className="nav-item nav-link">
                                <FontAwesomeIcon icon={faSignOutAlt}/> LogOut
                            </a>
                        </div>
                    </nav>
                    }
                    {!this.state.currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <a className="navbar-brand" href="https/reactjs.org">
                        </a>
                        <div className="navbar-nav mr-auto">
                            <Link to="/home" className="nav-item nav-link">
                                <FontAwesomeIcon icon={faHome}/> Home
                            </Link>
                        </div>
                        <div className="navbar-nav ml-auto">
                            <Link to="/register" className="nav-item nav-link">
                                <FontAwesomeIcon icon={faUserPlus}/> Register
                            </Link>
                            <Link to="/login" className="nav-item nav-link">
                                <FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Link>
                        </div>
                    </nav>
                    }
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/home" component={HomePage}/>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/register" component={RegisterPage}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}
