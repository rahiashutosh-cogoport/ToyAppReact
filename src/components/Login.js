import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email_id: '',
      password: '',
      redirect_after_login_successful: false,
      valid_email: false
    };

    this.emailValidCheck = this.emailValidCheck.bind(this);
  }

  componentDidMount() {
    $(document).ready(() => {
      var email = ReactDOM.findDOMNode(this.refs.user_email).value;
      console.log(email);
    })    
  }

  handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    var targetUrl = 'http://localhost:3000/login';
    fetch(targetUrl, {
      method: 'POST',
      credentials : 'include',
      body: data
    }).then(
      response => {
        response.json().then((op) => {                   
          if(op["logged_in"] === true && op['token'] != null) {
            this.setState({
              redirect_after_login_successful: true
            })
          }
        });
      }
    );
  }

  emailValidCheck(ev) {
    var email_entered = ev.target.value;
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email_entered)) {
      this.setState({
        valid_email: true
      })
    }
    else {
      this.setState({
        valid_email: false
      })
    }
  }

  render() {
    if (this.state.redirect_after_login_successful === true) {
      return <Redirect to='/rates' />
    }
    return (
      <div style={{'marginTop': '210px'}}>
        <center>
        <h1>Login</h1> <br /><br />
        <form onSubmit={this.handleUpload}>
          <div style={{width: '300px', 'textAlign': 'left', 'fontFamily': 'Poppins'}}>Email Id</div>
          <OutlinedInput onChange={this.emailValidCheck} ref="user_email" style={{fontSize: '15px', fontFamily: 'Poppins', width: '300px'}} name="email_id" type="textbox"></OutlinedInput>
          {
            this.state.valid_email
            && <i style={{marginLeft: '10px', color: 'green'}} className="fas fa-check-circle"></i>
          }
          
          <br/><br />

          <div style={{width: '300px', 'textAlign': 'left', 'fontFamily': 'Poppins'}}>Password</div>
          <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '300px'}}  name="password" type="password"></OutlinedInput>
          <br /><br />
          <input style={{backgroundColor: 'DodgerBlue', color: 'white', width: '300px', 'height': '50px'}} type="submit" value="Submit"></input>
        </form>
        </center>
      </div>
    );
  }
}

export default Login;