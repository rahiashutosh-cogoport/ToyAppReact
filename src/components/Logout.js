import React, { Component } from 'react';

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            logged_out: false
        };
        var targetUrl = 'http://localhost:3000/logout';
        fetch(targetUrl, {
            method: 'GET',
            credentials : 'include'            
          }).then(
            response => {
              response.json().then((op) => { 
                console.log(op);                  
                if(op['logged_in'] === false && op['message'] === 'Logged out successfully') {                    
                    this.setState({
                        logged_out: true                        
                    })
                }
              });
            }
        );
    }

    render() {
        if(this.state.logged_out) {
            return(<div style={{fontFamily: 'Poppins', fontSize: '20px'}}>
            <center>
                <h1>Logged Out</h1>
                <p>You have logged out successfully. Click here to return to <a href="http://localhost:3001/index">index</a> page.</p>
            </center>
            </div>            
            );
        }
        else {
            return(<div style={{fontFamily: 'Poppins', fontSize: '20px'}}>
                <center>
                <h1>Error 500</h1>
                <p>An unexpected error occurred. Click here to return to <a href="http://localhost:3001/index">index</a> page.</p>
                </center>
            </div>);
        }
    }
}

export default Logout;