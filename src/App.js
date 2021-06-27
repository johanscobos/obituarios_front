
import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import CreateUser from './components/createUser';
import CrudUser from './components/CrudUser';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Routes from './routes/routes';
function App() {
  
  return (
    <React.Fragment>
        <Routes/>
    </React.Fragment>
  );
}

export default App;
