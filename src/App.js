
import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import CreateUser from './components/createUser';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render = {props=>(<Login{...props}/>)}></Route>
          <Route path="/create-user" exact render = {props=>(<CreateUser{...props}/>)}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
