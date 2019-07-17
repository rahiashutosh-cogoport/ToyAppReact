import React, { Component } from 'react';

class VerifyEmail extends Component {
    constructor() {
        super();

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event) {
        var otp = document.getElementById("otp").value;
        var targetUrl = 'http://localhost:3000/verify_email';
        var query = '?otp=' + otp.toString();
        fetch(targetUrl+query, {
            method: 'GET',
            credentials : 'include'
          }).then(
            response => {
              response.json().then((res) => {    
                console.log("RESPONSE: " + res);
              });
            }
        );
    }

    render() {
        return(
            <div>
                <h1>Email verification</h1>
                <label>Please enter your OTP: </label>
                <input id="otp" type="textbox" />
                <input type="submit" value="Submit" onClick={this.handleUpload} />
            </div>
        )
    }
}

export default VerifyEmail;