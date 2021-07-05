import React from 'react';
import axios from 'axios';
import logoOfrenda from '../assets/img/logo-la-ofrenda.png';
import iconoLinea from '../assets/img/icono-linea-gratuita.png';
import Obituarios from '../components/Obituarios';
import {UrlShowObit} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch,faUser} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
class Home extends React.Component{ 
    componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowObit).then(async response=>{
         await this.setState({obituarios: response.data[0]});
        })
        }
    
render(){
    return(
        <>
        <header className="header">
            <div className="header_top"></div>
            <div className="header_down container">
                <div><img src={logoOfrenda} alt="logo La Ofrenda" /></div>
                <div className="header_down_icono-linea">
                    <img src={iconoLinea} alt="icono linea gratuita" />
                    <h2>LÍNEA GRATUITA NACIONAL: <br />01 8000 18 08 28</h2>
                    </div>
                <div><button type="button" class="btn btn-primary btn-sesion">INICIAR SESION</button></div>
            </div>
            
        </header>
        <main className="container">
           
            <Obituarios />
        </main>
        
      </> 
    );
}
}


export default Home;