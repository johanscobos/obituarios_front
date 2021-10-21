import React from 'react';
import axios from 'axios';
import '../assets/css/obituarios.css';
//import logoOfrenda from '../assets/img/logo-la-ofrenda.png';
import LogoBlanco from '../assets/img/logo-la-ofrenda-blanco.png';
import {UrlShowObithome} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye,faPrayingHands,faChurch,faCalendarTimes,faDove,faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
class Obituarios extends React.Component{    
    state={
          obitObj: []
        }
        componentDidMount(){
          this.peticionGet();
          }
      peticionGet=()=>{
          axios.get(UrlShowObithome).then(async response=>{
            await this.setState({obitObj: response.data[0]});
            //const obitObj = response.data;
            //this.setState({obitObj});
          });     
          }   
   
  render(){
    const {obitObj} = this.state;
   
      return(
        <React.Fragment>                
         <div className="grid-obituarios">    
      {        console.log(this.state.obitObj),
             obitObj&&obitObj.map( (obt,index) => {
                              
              return(
                  <article className="card card-obituario">
                  <div className="card-obituario-header">
                  <img src={LogoBlanco} alt="Logo La Ofrenda" className="logo-obituario text-center"/>
                  </div> 
                  <div className="card-body">
                      <h5 class="card-title text-center">{obt.nombreobituario + ' ' + obt.apellidosobituario }</h5>
                      <p className="text-center">{obt.mensajeobituario}</p>
                      <div className="card-obituario_item">                    
                          <FontAwesomeIcon icon={faPrayingHands}  className="obituarios-icono"/><span> VELACIÓN</span>                    
                      </div>                    
                      <p className="text-center">{obt.nombresede} <br /> {obt.direccionsedes} <br/ ><span className="destacado">Sala: </span> {obt.nombresala} </p>
                      <div className="card-obituario_item">                    
                          <FontAwesomeIcon icon={faChurch} className="obituarios-icono"/><span> MISA</span>                    
                      </div>
                      <p className="text-center">{obt.nombreiglesia}<br />{obt.direccioniglesias}<br /><span className="destacado">Hora: </span> {obt.horamisa}</p>   
                      <div className="card-obituario_item">                    
                          <FontAwesomeIcon icon={faDove} className="obituarios-icono"/><span> DESTINO FINAL</span>                    
                      </div>             
                      <p className="text-center">{obt.nombrecementerio}<br /> {obt.direccioncementerio}<br />
                      <span className="destacado">Hora: </span>{obt.horadestinofinal}</p>                        
                     
                      <div className="card-obituario_item">                  
                          <FontAwesomeIcon icon={faEye} className="obituarios-icono"/><span> ACOMPAÑAMIENTO VIRTUAL</span>                    
                      </div> 
                      <p className="text-center"><a href={`http://${obt.direccionip}`} target="_blank">Ingrese a la sala virtual:</a><br />
                                           
                     </p>  
                      <div className="card-obituario_item">                    
                          <FontAwesomeIcon icon={faCalendarTimes} className="obituarios-icono"/><span> FECHA EXQUEQUIAS</span>                    
                      </div>   
                      <p className="text-center">{obt.fechaexequias}</p>
                      <div className="card-obituario_item">                    
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="obituarios-icono"/><span> CIUDAD</span>                    
                      </div>   
                      <p className="text-center">{obt.idciudadobituario}</p>
                     
                  </div>            
              </article>
  
            )}
            ) }
    
          </div>
          </React.Fragment>
      );
  }
  }

export default Obituarios;