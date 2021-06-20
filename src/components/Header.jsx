import React from 'react';
import axios from 'axios';
import {UrlShowUsr} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
class Header extends React.Component{ 

    
    
render(){
    return(
        <div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
        
    );
}
}


export default Header;