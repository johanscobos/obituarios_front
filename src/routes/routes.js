import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom'
import Login from '../components/Login';
import CrudUser from '../components/CrudUser';
import CrudObituario from '../components/CrudObituario';
import HeaderDasboard from '../components/HeaderDasboard';
import Home from '../components/Home';


//import '../assets/css/style.css';

import { isAuthenticated } from '../services/authentication';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

export const Routes=() => {
  const isAuth= isAuthenticated();
    return (
      <BrowserRouter>
    
        <Switch>          
        <Route path="/" exact><Home /></Route>
        <Route path="/login" exact render = {props=>(<Login{...props}/>)}></Route>

           <section className="test">
              <HeaderDasboard />

            <div class="offcanvas offcanvas-start bg-dark  menu-lateral text-white sidebar-nav" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              
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
                 {isAuth ? 
                 <Route path="/crudUser" exact render = {props=>(<CrudUser{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
                  </div>

                  <div className="col-md-12">
                 {isAuth ? 
                 <Route path="/crudObituario" exact render = {props=>(<CrudObituario{...props}/>)}/>: <Redirect to ="/Login"></Redirect>}
                  </div>               
                </div>
              </main>
              
              </section>
            
          
          
          
        </Switch>
      </BrowserRouter>
        
    )
}
export default Routes;