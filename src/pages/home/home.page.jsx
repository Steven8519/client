import React from 'react';
import UserService from '../../services/user.service';
import {User} from '../../models/user';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      errorMessage: '',
      infoMessage: '',
      currentUser: new User()
    };
  }

  componentDidMount() {
    UserService.currentUser.subscribe(data => {
      this.setState({
        currentUser: data
      });
    });
  }


  render() {
    const {} = this.state;
    return (
      <div className="col-md-12">

      </div>
    );
  }
  
}
