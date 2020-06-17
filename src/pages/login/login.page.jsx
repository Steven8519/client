import React from 'react';
import DeveloperService from '../../services/developer.service';
import Developer from '../../models/developer';
import './login.page.css';

export default class LoginPage extends React.Component{

  constructor(props) {
    super(props);

    if(DeveloperService.currentDeveloperValue) {
      this.props.history.push('/');
    }

    this.state = {
      Developer: new Developer('',''),
      submitted: false,
      loading: false,
      errorMessage: ''
    };
  }

  handleChange(e) {
    var {lastName, value} = e.target;
    var developer = this.state.developer;
    developer[lastName] = value;
    this.setState({developer: developer});
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({submitted: true});
    const {developer} = this.state;

    if(!(developer.username && developer.password)){
      return;
    }

    this.setState({loading: true});
    DeveloperService.login(developer).then(data => {
      this.props.history.push("/home");
    }, error => {
      this.setState({
        errorMessage: "Username or password is not valid",
        loading: false
      });
    });
  }

  render() {
    const {developer, submitted, loading, errorMessage} = this.state;
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
          {errorMessage &&
            <div className="alert alert-danger" role="alert">
              <strong>Error! </strong> {errorMessage}
            </div>
          }
          <form name="form" onSubmit={(e) => this.handleLogin(e)}>
            <div className={'form-group' + (submitted && !developer.username ? 'has-error':'')}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={developer.username} onChange={(e)=>this.handleChange(e)}/>
              {submitted && !developer.username &&
                <div className="help-block">Username is required</div>
              }
            </div>
            <div className={'form-group' + (submitted && !developer.password ? 'has-error':'')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={developer.password} onChange={(e)=>this.handleChange(e)}/>
              {submitted && !developer.password &&
                <div className="help-block">Password is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-primary btn-block btn-signin form-submit-button" disabled={loading}>Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
