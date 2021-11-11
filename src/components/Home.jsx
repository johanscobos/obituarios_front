import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import logoOfrenda from '../assets/img/logo-la-ofrenda.png';
import iconoLinea from '../assets/img/icono-linea-gratuita.png';
import Obituarios from './Obituarios';
//import {UrlShowObit} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch,faUser,faShoppingCart,faMobileAlt} from '@fortawesome/free-solid-svg-icons';
import {faFacebook,faInstagram,faTwitter,faYoutube } from '@fortawesome/free-brands-svg-icons';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
class Home extends React.Component{ 
    /*componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowObit).then(async response=>{
         await this.setState({obituarios: response.data[0]});
        })
        }
*/
    
render(){
    return(
        <React.Fragment>
        <header className="header">
            <div className="header_top">
                <div className="container">
                
                <ul className="header_top_items">
                    <a href="https://www.facebook.com/laofrendasacolombia" target="_blank"><li className="header_top_item"><FontAwesomeIcon icon={faFacebook} className="header_top_item_icon"/></li></a>
                    <a href="https://www.instagram.com/laofrenda.co/?igshid=157zx1yizj08y" target="_blank"><li className="header_top_item"><FontAwesomeIcon icon={faInstagram} className="header_top_item_icon"/></li></a>
                    <a href="https://twitter.com/Laofrendasa?s=08"  target="_blank"><li className="header_top_item"><FontAwesomeIcon icon={faTwitter} className="header_top_item_icon"/></li></a>
                    <a href="https://www.youtube.com/channel/UCcaU8909JjvdHQ3xc63-vdg" target="_blank"><li className="header_top_item"><FontAwesomeIcon icon={faYoutube} className="header_top_item_icon"/></li></a>
                    <Link to="/login"><li className="header_top_item"><FontAwesomeIcon icon={faUser} className="header_top_item_icon"/></li></Link>
                               
                </ul>
                </div>
            </div>
            <div className="header_down container">
                <div><a href="https://www.laofrenda.com.co"><img src={logoOfrenda} alt="logo La Ofrenda" /></a></div>
                <div className="header_down_icono-linea">
                    <img src={iconoLinea} alt="icono linea gratuita" />
                    <h2>LÍNEA GRATUITA NACIONAL: <br />01 8000 18 08 28</h2>
                </div>
                <div>
                    <a href="https://www.laofrenda.com.co/paga-aqui/"><button type="button" className="btn btn-primary btn-paga-aqui"><FontAwesomeIcon icon={faShoppingCart} /><span className="btn-text">PAGA AQUÍ</span></button></a>
                    <a href="https://www.laofrenda.com.co/ofrendapp/" target="_blank"><button type="button" className="btn btn-primary btn-descarga-app"><FontAwesomeIcon icon={faMobileAlt} /><span className="btn-text">DESCARGA APP</span></button></a>
                </div>                
            </div>
            
        </header>
        <div className="obituarios-titulo"> 
            <div className="container">
                <p><a href="https://www.laofrenda.com.co"> Home </a></p>
                <h1>Obituarios</h1>                
            </div>   
            <div className="obituarios-aux-titulo-overlay"></div>         
        </div> 
        <main className="container home-main">
           
            <Obituarios />
        </main>

        <footer className="footer">
            <div className="container text-center p-3 footer-text">
            <h6>© 2021 La Ofrenda S.A. Todos los derechos reservados.<br /> Diseño y Desarrollo: <a href="https://tacticanet.com" target="_blank">Táctica S.A.S</a></h6>
            </div>
        </footer>
        
      </React.Fragment>
    );
}
}


export default Home;