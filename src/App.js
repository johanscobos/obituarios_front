
import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@popperjs/core'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './components/Login';
import CreateUser from './components/createUser';

import CrudUser from './components/CrudUser';
import Header from './components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Routes from './routes/routes'
function App() {
  
  return (

    <Routes/>
    
  );
}

export default App;
