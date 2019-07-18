import React, { Component } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import './signup.css';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom';

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
          password: '',
          canSubmit: false,
          redirect_after_signup_successful: false
        };
    }

    onChange = (e) => {
        if(e.target.value === '' || e.target.value === null) {
            this.setState({
                canSubmit: false
            })
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    checkIfEmpty(str, attrName) {
        if(str === '' || str === null || str === 0) {
            cogoToast.error(attrName + " cannot be blank");
            return true;
        }
        return false;
    }

    checkValidAadhar(str, attrName) {
        var return_true = true;
        if(str.length !== 12) {
            cogoToast.error(attrName + " needs to be of 12 digits");
            return_true = false;
        }
        if(parseInt(str) === NaN) {
            cogoToast.error(attrName + " should not contain any characters other than digits");
            return_true = false;
        }
        if(return_true) return true;
        return false;
    }

    checkValidContact(str, attrName) {
        var return_true = true;
        if(str.length !== 10) {
            cogoToast.error(attrName + " needs to be of 10 digits");
            return_true = false;
        }
        if(parseInt(str) === NaN) {
            cogoToast.error(attrName + " should not contain any characters other than digits");
            return_true = false;
        }
        if(return_true) return true;
        return false;
    }

    checkValidEmail(str, attrName) {        
        if (/^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(str)) {
          return true;
        }
        cogoToast.error(attrName + " is not valid");
    }



    handleUpload = (event) => {
        var canSubmitForm = true;
        event.preventDefault();
        document.getElementById("spinner").style.display = "block";
        if(this.checkIfEmpty(this.state.user_name, 'User name')) canSubmitForm = false;
        if(this.checkIfEmpty(this.state.aadhar_num, 'Aadhar Number')) canSubmitForm = false;
        if(this.checkIfEmpty(this.state.email_id, 'Email id')) canSubmitForm = false;
        if(this.checkIfEmpty(this.state.city, 'City')) canSubmitForm = false;
        if(this.checkIfEmpty(this.state.country, 'Country')) canSubmitForm = false;
        if(this.checkIfEmpty(this.state.password, 'Password')) canSubmitForm = false;
        if(!this.checkValidAadhar(this.state.aadhar_num, 'Aadhar number')) canSubmitForm = false;
        if(!this.checkValidContact(this.state.contact_num, 'Contact number')) canSubmitForm = false;
        if(!this.checkValidEmail(this.state.email_id, 'Email id')) canSubmitForm = false;

        if(!canSubmitForm) return;
            
        const data = new FormData(event.target);
        var targetUrl = 'http://localhost:3000/commit_user';
        fetch(targetUrl, {
        method: 'POST',
        credentials : 'include',
        body: data
        }).then(
        response => {
            response.json().then((op) => {
                console.log("RESPONSE"); 
                console.log(op);                  
                if(op['statusCode'] === 400) {                    
                    for (var error in op['errors']) {
                        cogoToast.error(error + " " + op['errors'][error]);
                    }
                } 
                else {
                    document.getElementById("spinner").style.display = "none";
                    cogoToast.success("You have signed up successfully. A verification email has been sent to your email id. Please verify your email id");
                    this.setState({                        
                        redirect_after_signup_successful: true
                    });
                    return;
                }                         
            });
        }
        );
    }

    render() {
        const { user_name, email_id, aadhar_num, contact_num, city, country, password } = this.state;
        if (this.state.redirect_after_signup_successful === true) {
            return <Redirect to='/index' />
        }
        return (
            <div className="App">
            <h1 className="header">Sign up!</h1>
            <center>
            {/* <form method="post" action="http://localhost:3000/commit_user"> */}
            <form onSubmit={this.handleUpload}>
                <br />
                <br />
                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Name</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} name="user_name" value={this.state.user_name} onChange={this.onChange} id="name" type="textbox" /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Aadhar Number</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="aadhar_num" type="textbox" name="aadhar_num" value={this.state.aadhar_num} onChange={this.onChange} /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Contact Number</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="contact_num" type="textbox" name="contact_num" value={this.state.contact_num} onChange={this.onChange} /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>City</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="city" type="textbox" name="city" value={this.state.city} onChange={this.onChange} /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Country</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="country" type="textbox" name="country" value={this.state.country} onChange={this.onChange} /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Email Id</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} id="email_id" type="textbox" name="email_id" value={this.state.email_id} onChange={this.onChange} /><br /><br />

                <div style={{width: '400px', textAlign: 'left', 'fontFamily': 'Poppins'}}>Password</div>
                <OutlinedInput style={{fontSize: '15px', fontFamily: 'Poppins', width: '400px'}} type="password" name="password" value={this.state.password} onChange={this.onChange} /><br /><br />        
                <input style={{backgroundColor: 'DodgerBlue', color: 'white', width: '400px', 'height': '50px'}} type="submit" name="Submit" />       
                <br />
                <div style={{display: 'none'}} id="spinner" className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
                <hr />
            </form>
            </center>
            </div>
        );
    }
}

export default Signup;