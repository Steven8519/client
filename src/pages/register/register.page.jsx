import React from 'react';
import DeveloperService from '../../services/developer.service';
import Developer from '../../models/developer';

export default class RegisterPage extends React.Component{
    constructor(props) {
        super(props)

        if(DeveloperService.currentDeveloper) {
            this.props.history.push('/')
        }

        this.state = {
            developer: new Developer('','',''),
            submitted: false,
            loading: false,
            errorMessage: ''
        };
    }

    handleChange(e) {
        var { lastName, value } = e.target;
        var developer = this.state.developer;
        developer[lastName] = value;
        this.setState({developer: developer})
    }

    handleRegister(e) {
        e.preventDefault();
        this.setState({ submitted: true})
        const{developer} = this.state;

        if(developer.username && developer.password && developer.firstName && developer.lastName) {
            return;
        }

        this.setState({loading: true});
        DeveloperService.register(developer).then(data => {
            this.props.history.push("/login");
        }, error => {
            if(error.response.status === 409) {
                this.setState({
                    errorMessage: "Username is not available",
                    loading: false
                });
            } else {
                this.setState({
                    errorMessage: "Unexpected error occurred",
                    loading: false
                });
            }
        });
    }

    render() {
        const {developer, submitted, loading, errorMessage} = this.state;
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    {errorMessage &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Error! </strong> {errorMessage}
                        </div>
                    }
                    <form name="form" onSubmit={(e) => this.handleRegister(e)}>
                    <div className={'form-group' + submitted && !developer.username ? 'has-error': ''}>
                            <label htmlFor="username">Full Name</label>
                            <input type="text" className="form-control" name="username" value={developer.username} onChange={(e) => this.handleChange(e)}/>
                            {errorMessage && !developer.username &&
                                <div className="help-block">
                                    Full name is required
                                </div>

                            }
                        </div>
                        <div className={'form-group' + submitted && !developer.username ? 'has-error': ''}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={developer.username} onChange={(e) => this.handleChange(e)}/>
                            {errorMessage && !developer.username &&
                                <div className="help-block">
                                    Username is required
                                </div>

                            }
                        </div>
                        <div className={'form-group' + submitted && !developer.password ? 'has-error': ''}>
                            <label htmlFor="username">Password</label>
                            <input type="text" className="form-control" name="password" value={developer.password} onChange={(e) => this.handleChange(e)}/>
                            {errorMessage && !developer.username &&
                            <div className="help-block">
                                Password is required
                            </div>

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