import React from 'react';
import axios from 'axios';
import {Link,NavLink} from 'react-router-dom'
import {UrlShowUsr} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch,faUser} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import LogoBlanco from '../assets/img/logo-la-ofrenda-blanco.png';
import { Redirect } from 'react-router';


class HeaderDasboard extends React.Component{ 
    manejadorChange = async e=>{
        await this.setState({
            
                busqueda:e.target.value
        })
        console.log(this.state.busqueda);
    }
    cerrarSesion =()=>{
        localStorage.removeItem('Token');
        window.location = '/Home'
    }  
render(){
    return(
        
       
            <nav class="navbar navbar-expand-lg navbar-dark bg-corporativo bg-dark fixed-top">
            <div class="container-fluid">

        

            <button class="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <span class="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
            </button>
                <NavLink exact to="/" className="navbar-brand fw-bold text-uppercase me-auto"><img src={LogoBlanco} alt="Logo blanco La Oferta" className="logo-blanco" /></NavLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
               
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                
                {
                    
                    <form class="d-flex ms-auto invisible">
                <div class="input-group my-3 my-lg-0">
                    <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" onChange = {this.manejadorChange}/>
                    <button class="btn btn-primary" type="button" id="button-addon2"><FontAwesomeIcon icon={faSearch}/></button>
                </div>
                </form>
                    
                }
                
                        <ul class="navbar-nav mb-2 mb-lg-0">
                        
                            
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faUser}/>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            {
                                   /*
                                   <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"/></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                   */ 
                            }
                            <li><button className="btn" onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button></li>
                        </ul>
                        </li>
                    
                    </ul>
                </div>              
                
            </div>
            </nav>
        
        
    );
}
}


export default HeaderDasboard;