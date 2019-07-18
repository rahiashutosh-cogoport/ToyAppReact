import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Signup from './components/signup';
import Login from './components/Login';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import RatesDrawer from './components/RatesDrawer';
import VerifyEmail from './components/VerifyEmail';
import IndexPage from './components/IndexPage';
import Logout from './components/Logout';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/rates" component={RatesDrawer} />
        <Route path="/verify_email" component={VerifyEmail} />
        <Route path="/index" component={IndexPage} />
        <Route path="/logout" component={Logout} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
