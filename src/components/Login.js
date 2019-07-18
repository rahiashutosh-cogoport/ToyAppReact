import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import cogoToast from 'cogo-toast';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
  constructor() {
    super();    
    this.state = {
      email_id: '',
      password: '',
      redirect_after_login_successful: false,
      valid_email: false,      
      user_logged_in_token: cookies.get('_toy-app-psql_session'),
      x: 0
    };

    this.emailValidCheck = this.emailValidCheck.bind(this); 
    this.checkOnce = this.checkOnce.bind(this); 
    fetch('http://localhost:3000/logged_in', {
      method: 'GET',
      credentials : 'include'
    }).then(
      response => {
        response.json().then((op) => {                   
          console.log(op);
        });
      }
    );    
    
  }

  handleUpload = (event) => {
    event.preventDefault();
    if(!this.state.valid_email) {
      cogoToast.error('Please enter a valid email address');
      return;
    }    
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
          if(op["logged_in"] === false) {
            cogoToast.error('Incorrect password');
            return;
          }
        });
      }
    );
  }

  emailValidCheck(ev) {
    var email_entered = ev.target.value;
    if (/^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email_entered)) {
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

  componentDidMount() {
    this.setState({
      x: 1,
      user_logged_in_token: cookies.get('user_token')
    })
    this.forceUpdate();
    console.log("document.cookie" + document.cookie);
  }

  checkOnce() {    
    this.setState({
      x: 1,
      user_logged_in_token: cookies.get('user_token')
    })
    console.log("IN CHECK ONCE: user_logged_in_token= " + this.state.user_logged_in_token);
    console.log("document.cookie" + document.cookie);
  }

  render() {    
    if(this.state.x === 0) this.checkOnce();
    if(this.state.user_logged_in_token !== undefined) {
      cogoToast.info('You are already logged in. Cannot log in again');
      return <Redirect to='/index' />
    }
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
          <br /><br />
          Not registered yet? <a href="http://localhost:3001/signup">Sign up here.</a>
        </form>
        </center>
      </div>
    );
  }
}

export default Login;