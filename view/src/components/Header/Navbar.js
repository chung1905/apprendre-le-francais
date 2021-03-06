import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      username: ''
    };

    this.fetchAuth();
    // bad way to refresh navbar, need improve
    window.rsNavbar = this.fetchAuth.bind(this);
  }

  fetchAuth = function () {
    fetch('/authenticate', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      },
      body: JSON.stringify({token: this.getToken()})
    }).then(res => res.json().then(this.onSuccess.bind(this)))
      .catch(err => console.log(err));
  };

  onSuccess = function (body) {
    if (body.success) {
      this.setState({
        isLoggedIn: true,
        username: body.username
      });
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  };

  getToken = function () {
    return localStorage.getItem('alf_user_token');
  };

  clearToken = function () {
    this.setState({
      isLoggedIn: false,
      username: ''
    });
    return localStorage.clear('alf_user_token');
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <span className="nav-link"><strong>Hello {this.state.username}</strong></span>
          </li>
          <li className="nav-item">
            <Link to="/user/upload" className="nav-link"><strong>Upload</strong></Link>
          </li>
          <li className="nav-item">
            <a onClick={this.clearToken.bind(this)} href={'#'} className="nav-link"><strong>Logout</strong></a>
          </li>
        </ul>
      );
    }
    return (
      <ul className="navbar-nav ml-auto">
        <div style={{display: 'none'}}>{this.state.username}</div>
        <li className="nav-item">
          <Link to="/user/signup" className="nav-link"><strong>Sign Up</strong></Link>
        </li>
        <li className="nav-item">
          <Link to="/user/login" className="nav-link"><strong>Login</strong></Link>
        </li>
      </ul>
    );
  }
}

export default Navbar;
