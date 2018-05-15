import React, { Component } from 'react';
import '../styles/App.css';
import Jokes from './Jokes';
import Results from './Results';
import { Button } from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <ul className="topnav">
                <li><Link to="/">Dad Jokes</Link></li>
                <li><Link to="/dashboard">Voting Dashboard</Link></li>
                <li className="righty"><a href="https://github.com/nicoviarnes">Git Repo</a></li>
            </ul>  
            <hr/>

            <Route path="/" exact={true} component={Jokes} />
            <Route path="/dashboard" component={Results} />

          </div>
        </div>
      </Router>
    );
  }
}
export default App;