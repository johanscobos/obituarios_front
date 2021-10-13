
import React from 'react';
//import './assets/css/App.css';

import 'bootstrap/dist/css/bootstrap.css';
import '@popperjs/core'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/css/style.css';
import {BrowserRouter,Switch,Route, Redirect,Link,NavLink} from 'react-router-dom'
import Routes from './routes/routes'
import Login from './components/Login';
import CrudUser from './components/CrudUser';
import CrudObituario from './components/CrudObituario';
import CrudSala from './components/crudSalas';
import CrudSede from './components/crudSedes';
import CrudCementerios from './components/crudCementerios';
import CrudIglesia from './components/crudIglesia';
import HeaderDasboard from './components/HeaderDasboard';
import Home from './components/Home';
import { isAuthenticated } from './services/authentication';
import { isRol } from './services/roles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch,faUser,faBible,faStoreAlt,faGripHorizontal,faArchway,faNetworkWired,faChurch} from '@fortawesome/free-solid-svg-icons'
function App() {
  const isAuth= isAuthenticated();
  const isRole=isRol();
  return (
<BrowserRouter>
    
    <Switch>          
    <Route path="/" exact><Home /></Route>
    <Route path="/login" exact render = {props=>(<Login{...props}/>)}></Route>

       <section className="test">
          <HeaderDasboard/>

        <div className="offcanvas offcanvas-start bg-dark  menu-lateral text-white sidebar-nav" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          
          <div className="offcanvas-body p-0">
            <nav className="navbar-dark">
              <ul className="navbar-nav menu-barra_lateral">                 
                <li className="menu-barra_lateral_item">
                 {isRole == "1"?<NavLink exact to="/CrudUser" className="nav-link px-3 btn-active-menu"><FontAwesomeIcon className="me-2" icon={faUser}/><span>Usuarios</span></NavLink>:null}
                </li>
                <li className="menu-barra_lateral_item">
                {isRole == "1" || isRole == "2" || isRole == "3"? <NavLink exact to="/crudObituario" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faBible}/><span>Obituarios</span></NavLink>:null}
                </li>
                <li className="menu-barra_lateral_item">
                {isRole == "1" || isRole == "2" ? <NavLink exact to="/crudSedes" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faStoreAlt}/><span>Sedes de Velación</span></NavLink> : null}
                </li>
                <li className="menu-barra_lateral_item">
                {isRole == "1" || isRole == "2" ? <NavLink exact to="/crudSala" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faGripHorizontal}/><span>Salas de Velación</span></NavLink> : null}
                </li>
                <li className="menu-barra_lateral_item">
                {isRole == "1" || isRole == "2" ?  <NavLink exact to="/crudCementerios" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faArchway}/><span>Cementerios</span></NavLink> : null}
                </li>
                <li className="menu-barra_lateral_item">
                {isRole == "1" || isRole == "2" ? <NavLink exact to="/crudIglesia" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faChurch}/><span>Iglesias</span></NavLink> : null}
                </li>
                
              </ul>
            </nav> 
            
          </div>
        </div>     

          <main className="mt-5 pt-3">
            <div className="container-fluid">
              <div className="col-md-12">
             {isAuth ? 
             <Route path="/crudUser" exact render = {props=>(<CrudUser{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
              </div>

              <div className="col-md-12">
             {isAuth? 
             <Route path="/crudObituario" exact render = {props=>(<CrudObituario{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
              </div>   

              <div className="col-md-12">
              {isAuth ? 
              <Route path="/crudSala" exact render = {props=>(<CrudSala{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
              </div>    

              <div className="col-md-12">
              {isAuth? 
              <Route path="/crudSedes" exact render = {props=>(<CrudSede{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
              </div>  

              <div className="col-md-12">
              {isAuth ? 
              <Route path="/crudCementerios" exact render = {props=>(<CrudCementerios{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
              </div>    

              <div className="col-md-12">
              {isAuth ? 
              <Route path="/crudIglesia" exact render = {props=>(<CrudIglesia{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
              </div> 
              
                       
            </div>
          </main>
          
          </section>
        
      
      
      
    </Switch>
  </BrowserRouter>
    //<Routes/>
    
  );
}

export default App;
