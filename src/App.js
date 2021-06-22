
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
function App() {
  
  return (
    
      <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render = {props=>(<Login{...props}/>)}></Route>
          {
           <section>
              <Header />

            <div class="offcanvas offcanvas-start bg-dark bg-corporativo text-white sidebar-nav" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              
              <div class="offcanvas-body p-0">
                <nav class="navbar-dark">
                  <ul className="navbar-nav">
                    <li>
                      <div class="text-muted small fw-bold text-uppercase px-3">
                        SALAS
                      </div>
                    </li>
                    <li>
                      <a href="#" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faSearch}/><span>Crear</span></a>
                    </li>
                    <li className="my-4">
                      <hr/>
                    </li>
                  </ul>
                </nav>
                
              </div>
            </div>     

              <main className="mt-5 pt-3">
                <div className="container-fluid">
                  <div className="col-md-12">
                    <Route path="/create-user" exact render = {props=>(<CreateUser{...props}/>)}></Route>
                    <Route path="/crudUser" exact render = {props=>(<CrudUser{...props}/>)}></Route>
                  </div>               
                </div>
              </main>
              
              </section>
            
          }
          
          
        </Switch>
      </Router>
    </React.Fragment>
   
  );
}

export default App;
