import React, { Component } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './signup.css';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
          user_name: '',
          email_id: '',
          aadhar_num: 0,
          contact_num: 0,
          city: '',
          country: '',
          password: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { user_name, email_id, aadhar_num, contact_num, city, country, password } = this.state;
        return (
            <div className="App">
            <h1 className="header">Sign up!</h1>
            <center>
            <form method="post" action="http://localhost:3000/commit_user">
                <br />
                <br />
                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Name</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} name="user_name" value={user_name} onChange={this.onChange} id="name" type="textbox" /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Aadhar Number</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="aadhar_num" type="textbox" name="aadhar_num" /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Contact Number</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="contact_num" type="textbox" name="contact_num" /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>City</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="city" type="textbox" name="city" /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Country</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="country" type="textbox" name="country" /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Email Id</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="email_id" type="textbox" name="email_id" /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Password</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} type="password" name="password" /><br /><br />        
                <input style={{backgroundColor: 'DodgerBlue', color: 'white', width: '400px', 'height': '50px'}} type="submit" name="Submit" />       
                <hr />
            </form>
            </center>
            </div>
        );
    }
}

export default Signup;