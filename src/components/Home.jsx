import React from 'react';
import axios from 'axios';
import logoOfrenda from '../assets/img/logo-la-ofrenda.png';
import iconoLinea from '../assets/img/icono-linea-gratuita.png';
import Obituarios from '../components/Obituarios';
//import {UrlShowObit} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch,faUser,faShoppingCart,faMobileAlt} from '@fortawesome/free-solid-svg-icons';
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
        <>
        <header className="header">
            <div className="header_top">
                <div className="container">
                
                <ul className="header_top_items">
                    <li className="header_top_item"><FontAwesomeIcon icon={faUser} className="header_top_item_icon"/></li>
                    <li className="header_top_item"><FontAwesomeIcon icon={faUser} className="header_top_item_icon"/></li>
                    <li className="header_top_item"><FontAwesomeIcon icon={faUser} className="header_top_item_icon"/></li>
                    <li className="header_top_item"><FontAwesomeIcon icon={faUser} className="header_top_item_icon"/></li>
                    <li className="header_top_item"><FontAwesomeIcon icon={faUser} className="header_top_item_icon"/></li>     
                               
                </ul>
                </div>
            </div>
            <div className="header_down container">
                <div><img src={logoOfrenda} alt="logo La Ofrenda" /></div>
                <div className="header_down_icono-linea">
                    <img src={iconoLinea} alt="icono linea gratuita" />
                    <h2>LÍNEA GRATUITA NACIONAL: <br />01 8000 18 08 28</h2>
                </div>
                <div>
                    <button type="button" class="btn btn-primary btn-paga-aqui"><FontAwesomeIcon icon={faShoppingCart} /><span className="btn-text">PAGA AQUÍ</span></button>
                    <button type="button" class="btn btn-primary btn-descarga-app"><FontAwesomeIcon icon={faMobileAlt} /><span className="btn-text">DESCARGA APP</span></button>
                </div>
                
            </div>
            
        </header>
        <div className="obituarios-titulo"> 
            <div className="container">
                <p>Home</p>
                <h1>Obituarios</h1>
            </div>   
            <div className="obituarios-aux-titulo-overlay"></div>         
        </div> 
        <main className="container home-main">
           
            <Obituarios />
        </main>

        <footer className="footer">
            <div className="container text-center p-3 footer-text">
            <h6>© 2021 La Ofrenda S.A. Todos los derechos reservados.<br /> Diseño y Desarrollo: Táctica S.A.S</h6>
            </div>
        </footer>
        
      </> 
    );
}
}


export default Home;