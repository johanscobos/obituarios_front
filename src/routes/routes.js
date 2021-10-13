import {BrowserRouter,Switch,Route, Redirect,Link,NavLink} from 'react-router-dom'
import Login from '../components/Login';
import CrudUser from '../components/CrudUser';
import CrudObituario from '../components/CrudObituario';
import CrudSala from '../components/crudSalas';
import CrudSede from '../components/crudSedes';
import CrudCementerios from '../components/crudCementerios';
import CrudIglesia from '../components/crudIglesia';
import HeaderDasboard from '../components/HeaderDasboard';
import Home from '../components/Home';


//import '../assets/css/style.css';

import { isAuthenticated } from '../services/authentication';
//import { isRol } from '../services/authentication';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch,faUser,faBible,faStoreAlt,faGripHorizontal,faArchway,faNetworkWired,faChurch} from '@fortawesome/free-solid-svg-icons'


/*function Bienvenida() {
    if (isRol) { return <h1>Bienvenido a la zona de Usuario Registrados !</h1>;}
}*/

export const Routes=() => {
  const isAuth= isAuthenticated();
  //const isRol= isRol();

    return (
      <BrowserRouter>
    
        <Switch>          
        <Route path="/" exact><Home /></Route>
        <Route path="/login" exact render = {props=>(<Login{...props}/>)}></Route>

           <section className="test">
              <HeaderDasboard/>

            <div class="offcanvas offcanvas-start bg-dark  menu-lateral text-white sidebar-nav" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              
              <div class="offcanvas-body p-0">
                <nav class="navbar-dark">
                  <ul className="navbar-nav menu-barra_lateral">                 
                    <li className="menu-barra_lateral_item">
                      <NavLink exact to="/CrudUser" className="nav-link px-3 btn-active-menu"><FontAwesomeIcon className="me-2" icon={faUser}/><span>Usuarios</span></NavLink>
                    </li>
                    <li className="menu-barra_lateral_item">
                    <NavLink exact to="/crudObituario" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faBible}/><span>Obituarios</span></NavLink>
                    </li>
                    <li className="menu-barra_lateral_item">
                      <NavLink exact to="/crudSedes" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faStoreAlt}/><span>Sedes de Velación</span></NavLink>
                    </li>
                    <li className="menu-barra_lateral_item">
                      <NavLink exact to="/crudSala" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faGripHorizontal}/><span>Salas de Velación</span></NavLink>
                    </li>
                    <li className="menu-barra_lateral_item">
                      <NavLink exact to="/crudCementerios" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faArchway}/><span>Cementerios</span></NavLink>
                    </li>
                    <li className="menu-barra_lateral_item">
                      <NavLink exact to="/crudIglesia" className="nav-link px-3 active"><FontAwesomeIcon className="me-2" icon={faChurch}/><span>Iglesias</span></NavLink>
                    
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
        
    )
}
export default Routes;