import React from 'react';
import axios from 'axios';
import '../assets/css/obituarios.css';
//import logoOfrenda from '../assets/img/logo-la-ofrenda.png';
import LogoBlanco from '../assets/img/logo-la-ofrenda-blanco.png';
import {UrlShowObit} from    '../services/apirest';
//import {UrlShowUsr} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faSearch,faEye,faVideo,faPrayingHands,faChurch,faCalendarTimes,faDove} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
class Obituarios extends React.Component{ 

    componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowObit).then(async response=>{
         await this.setState({obituarios: response.data[0]});
        });
     
        }   
       

render(){
    //const {obituarios} = this.state;
    const txt="Familiares y amigos agradecen su solidaridad y les invitan a participar de los actos fúnebres de manera presencial o virtual"
    const txt2="Familiares"
    return(
        <>                   
        {/*
            obituarios.map((obituario) =>{
                console.log(obituario.sede);
            })    */   
        }
   
   
       <div className="grid-obituarios">         
      
       <article className="card card-obituario">
                <div className="card-obituario-header">
                <img src={LogoBlanco} alt="Logo La Ofrenda" className="logo-obituario text-center"/>
                </div> 
                <div className="card-body">
                    <h5 class="card-title text-center">CARLOTA MARÍA SUÁREZ ORTÍZ</h5>
                    <p className="text-center">{txt}</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faPrayingHands}  className="obituarios-icono"/><span> VELACIÓN</span>                    
                    </div>                    
                    <p className="text-center">Casa de la Paza Centro, sala VIP</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faChurch} className="obituarios-icono"/><span> MISA</span>                    
                    </div>
                    <p className="text-center">Iglesia del centro. <br />Hora: 8:00 A.M.</p>   
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faDove} className="obituarios-icono"/><span> DESTINO FINAL</span>                    
                    </div>             
                    <p className="text-center">Destino Final. <br />
                    Hora:11:30 AM</p>                  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faEye} className="obituarios-icono"/><span> ACOMPAÑAMIENTO VIRTUAL</span>                    
                    </div> 
                    <p className="text-center"><a href="#">Acompañamiento virtual</a></p>  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faCalendarTimes} className="obituarios-icono"/><span> FECHA EXQUEQUIAS</span>                    
                    </div>   
                    <p className="text-center">12 de julio de 2021</p>
                </div>            
            </article>

            <article className="card card-obituario">
                <div className="card-obituario-header">
                <img src={LogoBlanco} alt="Logo La Ofrenda" className="logo-obituario text-center"/>
                </div> 
                <div className="card-body">
                    <h5 class="card-title text-center">CARLOTA MARÍA SUÁREZ ORTÍZ</h5>
                    <p className="text-center">{txt}</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faPrayingHands}  className="obituarios-icono"/><span> VELACIÓN</span>                    
                    </div>                    
                    <p className="text-center">Casa de la Paza Centro, sala VIP</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faChurch} className="obituarios-icono"/><span> MISA</span>                    
                    </div>
                    <p className="text-center">Iglesia del centro. <br />Hora: 8:00 A.M.</p>   
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faDove} className="obituarios-icono"/><span> DESTINO FINAL</span>                    
                    </div>             
                    <p className="text-center">Destino Final. <br />
                    Hora:11:30 AM</p>                  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faEye} className="obituarios-icono"/><span> ACOMPAÑAMIENTO VIRTUAL</span>                    
                    </div> 
                    <p className="text-center"><a href="#">Acompañamiento virtual</a></p>  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faCalendarTimes} className="obituarios-icono"/><span> FECHA EXQUEQUIAS</span>                    
                    </div>   
                    <p className="text-center">12 de julio de 2021</p>
                </div>            
            </article>

            <article className="card card-obituario">
                <div className="card-obituario-header">
                <img src={LogoBlanco} alt="Logo La Ofrenda" className="logo-obituario text-center"/>
                </div> 
                <div className="card-body">
                    <h5 class="card-title text-center">CARLOTA MARÍA SUÁREZ ORTÍZ</h5>
                    <p className="text-center">{txt}</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faPrayingHands}  className="obituarios-icono"/><span> VELACIÓN</span>                    
                    </div>                    
                    <p className="text-center">Casa de la Paza Centro, sala VIP</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faChurch} className="obituarios-icono"/><span> MISA</span>                    
                    </div>
                    <p className="text-center">Iglesia del centro. <br />Hora: 8:00 A.M.</p>   
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faDove} className="obituarios-icono"/><span> DESTINO FINAL</span>                    
                    </div>             
                    <p className="text-center">Destino Final. <br />
                    Hora:11:30 AM</p>                  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faEye} className="obituarios-icono"/><span> ACOMPAÑAMIENTO VIRTUAL</span>                    
                    </div> 
                    <p className="text-center"><a href="#">Acompañamiento virtual</a></p>  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faCalendarTimes} className="obituarios-icono"/><span> FECHA EXQUEQUIAS</span>                    
                    </div>   
                    <p className="text-center">12 de julio de 2021</p>
                </div>            
            </article>

            <article className="card card-obituario">
                <div className="card-obituario-header">
                <img src={LogoBlanco} alt="Logo La Ofrenda" className="logo-obituario text-center"/>
                </div> 
                <div className="card-body">
                    <h5 class="card-title text-center">CARLOTA MARÍA SUÁREZ ORTÍZ</h5>
                    <p className="text-center">{txt}</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faPrayingHands}  className="obituarios-icono"/><span> VELACIÓN</span>                    
                    </div>                    
                    <p className="text-center">Casa de la Paza Centro, sala VIP</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faChurch} className="obituarios-icono"/><span> MISA</span>                    
                    </div>
                    <p className="text-center">Iglesia del centro. <br />Hora: 8:00 A.M.</p>   
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faDove} className="obituarios-icono"/><span> DESTINO FINAL</span>                    
                    </div>             
                    <p className="text-center">Destino Final. <br />
                    Hora:11:30 AM</p>                  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faEye} className="obituarios-icono"/><span> ACOMPAÑAMIENTO VIRTUAL</span>                    
                    </div> 
                    <p className="text-center"><a href="#">Acompañamiento virtual</a></p>  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faCalendarTimes} className="obituarios-icono"/><span> FECHA EXQUEQUIAS</span>                    
                    </div>   
                    <p className="text-center">12 de julio de 2021</p>
                </div>            
            </article>

            <article className="card card-obituario">
                <div className="card-obituario-header">
                <img src={LogoBlanco} alt="Logo La Ofrenda" className="logo-obituario text-center"/>
                </div> 
                <div className="card-body">
                    <h5 class="card-title text-center">CARLOTA MARÍA SUÁREZ ORTÍZ</h5>
                    <p className="text-center">{txt}</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faPrayingHands}  className="obituarios-icono"/><span> VELACIÓN</span>                    
                    </div>                    
                    <p className="text-center">Casa de la Paza Centro, sala VIP</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faChurch} className="obituarios-icono"/><span> MISA</span>                    
                    </div>
                    <p className="text-center">Iglesia del centro. <br />Hora: 8:00 A.M.</p>   
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faDove} className="obituarios-icono"/><span> DESTINO FINAL</span>                    
                    </div>             
                    <p className="text-center">Destino Final. <br />
                    Hora:11:30 AM</p>                  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faEye} className="obituarios-icono"/><span> ACOMPAÑAMIENTO VIRTUAL</span>                    
                    </div> 
                    <p className="text-center"><a href="#">Acompañamiento virtual</a></p>  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faCalendarTimes} className="obituarios-icono"/><span> FECHA EXQUEQUIAS</span>                    
                    </div>   
                    <p className="text-center">12 de julio de 2021</p>
                </div>            
            </article>

            <article className="card card-obituario">
                <div className="card-obituario-header">
                <img src={LogoBlanco} alt="Logo La Ofrenda" className="logo-obituario text-center"/>
                </div> 
                <div className="card-body">
                    <h5 class="card-title text-center">CARLOTA MARÍA SUÁREZ ORTÍZ</h5>
                    <p className="text-center">{txt}</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faPrayingHands}  className="obituarios-icono"/><span> VELACIÓN</span>                    
                    </div>                    
                    <p className="text-center">Casa de la Paza Centro, sala VIP</p>
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faChurch} className="obituarios-icono"/><span> MISA</span>                    
                    </div>
                    <p className="text-center">Iglesia del centro. <br />Hora: 8:00 A.M.</p>   
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faDove} className="obituarios-icono"/><span> DESTINO FINAL</span>                    
                    </div>             
                    <p className="text-center">Destino Final. <br />
                    Hora:11:30 AM</p>                  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faEye} className="obituarios-icono"/><span> ACOMPAÑAMIENTO VIRTUAL</span>                    
                    </div> 
                    <p className="text-center"><a href="#">Acompañamiento virtual</a></p>  
                    <div className="card-obituario_item">                    
                        <FontAwesomeIcon icon={faCalendarTimes} className="obituarios-icono"/><span> FECHA EXQUEQUIAS</span>                    
                    </div>   
                    <p className="text-center">12 de julio de 2021</p>
                </div>            
            </article>

            
            

        </div>
    </>
    );
}
}


export default Obituarios;