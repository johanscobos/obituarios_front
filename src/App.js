
import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import CreateUser from './components/createUser';
import CrudUser from './components/CrudUser';
import Header from './components/Header'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  
  return (
    
      <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render = {props=>(<Login{...props}/>)}></Route>
          {
            <div className="grid-container">
              <div className="container"><Header /> </div>
              <div>
              <Route path="/create-user" exact render = {props=>(<CreateUser{...props}/>)}></Route>
              <Route path="/crudUser" exact render = {props=>(<CrudUser{...props}/>)}></Route>
              </div>
            </div>

          }
          
        </Switch>
      </Router>
    </React.Fragment>
   
  );
}

export default App;
