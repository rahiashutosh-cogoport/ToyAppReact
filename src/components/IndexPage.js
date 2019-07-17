import React, { Component } from 'react';

class IndexPage extends Component {
    render() {
        return(
            <div>
                <center>
                    <h1 style={{fontFamily: 'Poppins', color: 'DodgerBlue'}}>Rates Search API</h1>                
                    <p style={{fontFamily: 'Poppins', color: 'grey'}}>Move over to <a href="http://localhost:3001/signup">Sign Up.</a></p>
                    <p style={{fontFamily: 'Poppins', color: 'grey'}}>Move over to <a href="http://localhost:3001/login">Log In.</a></p>
                    <p style={{fontFamily: 'Poppins', color: 'grey'}}>Move over to <a href="http://localhost:3001/rates">Dashboard.</a></p>
                </center>                
            </div>
        )
    }
}

export default IndexPage;