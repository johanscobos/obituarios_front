import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateObi, UrlShowSala, UrlShowSede} from    '../services/apirest';
import {UrlUpdateObi} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowObithome} from '../services/apirest';
import {UrlShowIglesia} from '../services/apirest';
import {UrlShowCementerio} from '../services/apirest';
import {UrlShowUbicacion} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { faAcquisitionsIncorporated } from '@fortawesome/free-brands-svg-icons';
class CrudObituario extends React.Component{
    state={
       obituarios:[],
       sedes:[],
       salas: [],
       iglesias:[],
       cementerios:[],
       ubicaciones:[],
       modalInsertar:false,
       modalEliminar: false,
       form:{ 
        "id":"",
        "nombre":"",
        "apellidos":"",
        "mensaje":"",
        "ciudadid":"",
        "sedeid":"",
        "salaid":"",
        "iglesiaid":"",
        "horamisa":"",
        "cementerioid":"",
        "horadestinofinal":"",
        "fechaexequias":"",
        "virtual":"",
        "iniciopublicacion":"",
        "finpublicacion":""
    },
    error:false,
    errorMsj:"",
    tipomodal:"",
    sedeid: null,
    salaid: null,
    iglesiaid: null,
    cementerioid: null,
    ubicacionid: null,
    fecha: new Date(),
    virtual:null
    }
    componentDidMount(){
        this.peticionGet();
        this.peticionGetSede();
        this.peticionGetSala();
        this.peticionGetIglesia();
        this.peticionGetCementerio();
        this.peticionGetUbicacion();
        
        }
    peticionGet=()=>{
        axios.get(UrlShowObithome).then(async response=>{
         await this.setState({obituarios: response.data[0]});
        })
        }
    peticionGetSede=()=>{
        axios.get(UrlShowSede).then(async response=>{
        await this.setState({sedes: response.data[0]});
       })
            }
        
    peticionGetSala=()=>{
        axios.get(UrlShowSala).then(async response=>{
        await this.setState({salas: response.data[0]});
        })
    }
    
    peticionGetCementerio=()=>{
        axios.get(UrlShowCementerio).then(async response=>{
            await this.setState({cementerios: response.data[0]});
            })
    }
    peticionGetIglesia=()=>{
        axios.get(UrlShowIglesia).then(async response=>{
        await this.setState({iglesias: response.data[0]});
       })
            }
    
    peticionGetUbicacion=()=>{
        axios.get(UrlShowUbicacion).then(async response=>{
        await this.setState({ubicaciones: response.data[0]});
        })
    }
    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar})
    }
    handleCheck = async e=>{
        await this.setState({virtual: !this.state.virtual})
        console.log(this.state.virtual)
    }
    handleChange= async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log({id:this.state.form.id,apellidos:this.state.form.apellidos,ciudadid:this.state.form.ciudadid,fechaexequias:this.state.form.fechaexequias,finpublicacion:this.state.form.finpublicacion,horadestinofinal:this.state.form.horadestinofinal,horamisa:this.state.form.horamisa,iniciopublicacion:this.state.form.iniciopublicacion,mensaje:this.state.form.mensaje,nombre:this.state.form.nombre,virtual:this.state.virtual,sedeid:this.state.sedeid,salaid:this.state.salaid,cementerioid:this.state.form.cementerioid,iglesiaid:this.state.form.iglesiaid})
    }  
    manejadorSubmit =e=>{e.preventDefault();}

    peticionPost=async()=>{
        await axios.post(UrlCreateObi, this.state.form).then(response => {
            console.log(response)
            this.modalInsertar();
            this.peticionGet();
            console.log(response)
            this.setState
            ({
                
                modalInsertar:false,
                error:false,
                nombre : response.data.nombre,
                apellidos : response.data.apellidos,
                mensaje : response.data.mensaje,
                ciudadid : response.data.ciudadid,
                iglesiaid : response.data.iglesiaid,
                horamisa : response.data.horamisa,
                cementerioid : response.data.cementerioid,
                horadestinofinal : response.data.horadestinofinal,
                fechaexequias : response.data.fechaexequias,
                iniciopublicacion : response.data.iniciopublicacion,
                virtual: response.data.virtual,
                finpublicacion : response.data.finpublicacion
            })
        }).catch(error => {
            this.setState
            ({
                error : true,
                errorMsj:error.response.request.response,
                nombres:"",
                apellidos:"",
                username:"",
                rolid:""
            })
        
        })        
    }

    seleccionarobituario=async(obi)=>{
        console.log(obi)
        await this.setState({
            form:{
                id:obi.idobituario,
                nombre:obi.nombreobituario,
                apellidos:obi.apellidosobituario,
                mensaje:obi.mensajeobituario,
                ciudadid:obi.ciudadid,
                horamisa: obi.horamisa,
                horadestinofinal:obi.horadestinofinal,
                fechaexequias:obi.fechaexequias,
                virtual: obi.virtual,
                iniciopublicacion:obi.iniciopublicacion,
                finpublicacion: obi.finpublicacion
            },
            sedeid:obi.sedeid,
            salaid:obi.salaid,
            iglesiaid:obi.iglesiaid,
            cementerioid: obi.cementerioid
        })
    }
    peticionPut=async()=>{
        await axios.put(UrlUpdateObi+this.state.form.id,{id:this.state.form.id,apellidos:this.state.form.apellidos,ciudadid:this.state.form.ciudadid,fechaexequias:this.state.form.fechaexequias,finpublicacion:this.state.form.finpublicacion,horadestinofinal:this.state.form.horadestinofinal,horamisa:this.state.form.horamisa,iniciopublicacion:this.state.form.iniciopublicacion,mensaje:this.state.form.mensaje,nombre:this.state.form.nombre,virtual:this.state.form.virtual,sedeid:this.state.sedeid,salaid:this.state.salaid,cementerioid:this.state.cementerioid,iglesiaid:this.state.iglesiaid}).then(response=>{
            console.log(this.state.form)
            this.modalInsertar();
            this.peticionGet();
            this.setState
            ({
                modalInsertar:false
            })
        })
    }
    peticionDelete=async()=>{
        console.log('a');
        await axios.put(UrlDeleteUsr+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();

        })
    }

   
    cambioFecha=fecha=>{
        this.setState({fecha: fecha})
    }


render(){
    const {obituarios} = this.state;
    const {sedes} = this.state;
    const {salas} = this.state;
    const{cementerios}= this.state;
    const{ubicaciones}= this.state;
    const {form}=this.state;
    const{iglesias} =this.state;

    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}>Crear obituario</button>
            <br /><br />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Mensaje</th>
                        <th>Ciudad</th>
                        <th>Sede</th>
                        <th>Sala</th>
                        <th>Iglesia</th>
                        <th>Hora de misa</th>
                        <th>Cementerio</th>
                        <th>Hora destino final</th>
                        <th>Fecha Exequias</th>
                        <th>Acom. Virtual</th>
                        <th>Inicio publicación</th>
                        <th>Fin publicación</th>
                    </tr>
                </thead>
                <tbody>
                    {obituarios.map
                    ((obi,index)=>{
                    return(
                        <tr key={index}>
                        <td>{obi.idobituario}</td>
                        <td>{obi.nombreobituario}</td>
                        <td>{obi.apellidosobituario}</td>
                        <td>{obi.mensajeobituario}</td>
                        <td>{obi.ciudadobituario}</td>
                        <td>{obi.nombresede}</td>
                        <td>{obi.nombresala}</td>
                        <td>{obi.nombreiglesia}</td>
                        <td>{obi.horamisa}</td>
                        <td>{obi.nombrecementerio}</td>
                        <td>{obi.horadestinofinal}</td>
                        <td>{obi.fechaexequias}</td>
                        <td>{obi.virtual}</td>
                        <td>{obi.iniciopublicacion}</td>
                        <td>{obi.finpublicacion}</td>
                        <td>
                        <button className="btn btn-edit" onClick={()=>{this.seleccionarobituario(obi);this.modalInsertar();this.setState({tipomodal: "actualizar"})}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{this.seleccionarobituario(obi);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )}
                    ) }
                </tbody>
            </table>
           
            <Modal isOpen= {this.state.modalInsertar} >
           
            <div class="modal-header">
            {this.state.tipomodal === "insertar"?
                    <h5 class="modal-title">Crear Obituario</h5> :<h5 class="modal-title">Actualizar Obituario</h5>                    
                    }
            </div>
            
            <ModalBody>                    
                   
               
                 <form onSubmit={this.manejadorSubmit}>
                    
                    <input type="text" className="form-control" name="nombre" placeholder="Nombres" onChange={this.handleChange} value={form?form.nombre:""}/>
                 
                    <input type="text" className="form-control" name="apellidos" placeholder="Apeliidos" onChange={this.handleChange} value={form?form.apellidos:""}/>
                    <input type="text" className="form-control" name="mensaje" placeholder="Mensaje" onChange={this.handleChange} value={form?form.mensaje:""}/>
                    <select name="ciudadid" className="form-control" value={form?this.state.form.ciudadid:""} onChange={this.handleChange} ><option value="">Seleccione una ciudad</option>
                        {this.state.ubicaciones.map((ciud,index)=>{ return(<option key={ciud.id} value={ciud.id}>{ciud.ciudad} </option>)})}
                    </select>
                    <select name="sedeid" className="form-control" value={form?this.state.form.sedeid:""} onChange={this.handleChange} ><option value="">Seleccione una sede</option>
                        {this.state.sedes.map((sed,index)=>{ return(<option key={sed.id} value={sed.id}>{sed.nombresede} </option>)})}
                    </select>
                    <select name="salaid" className="form-control" value={form?this.state.form.salaid:""} onChange={this.handleChange} ><option value="">Seleccione una sala</option>
                        {this.state.salas.map((sal,index)=>{ return(<option key={sal.id} value={sal.id}>{sal.nombresala} </option>)})}
                    </select>
                    <select name="iglesiaid" className="form-control" value={form?this.state.form.iglesiaid:""} onChange={this.handleChange} ><option value="">Seleccione una iglesia</option>
                        {this.state.iglesias.map((igl,index)=>{ return(<option key={igl.id} value={igl.id}>{igl.nombre} </option>)})}
                    </select>
                    <input type="text" className="form-control"name="horamisa" placeholder="horamisa" onChange={this.handleChange} value={form?form.horamisa:""}/>
                    <select name="cementerioid" className="form-control" value={form?this.state.form.cementerioid:""} onChange={this.handleChange} ><option value="">Seleccione un cementerio</option>
                        {this.state.cementerios.map((cem,index)=>{ return(<option key={cem.id} value={cem.id}>{cem.nombre} </option>)})}
                    </select>
                    Fecha Exequias <input  name="fechaexequias"  type="date"   
                    className="form-control"  onChange={ this.handleChange} value={form?form.fechaexequias:""}/>
                      <select name="virtual" className="form-control" value={form?this.state.form.virtual:""} onChange={this.handleChange} ><option value="">Acomp. Virtual</option>
                        <option value="S">Si</option><option value="N">No</option>
                    </select>
                    <input type="text" className="form-control"name="horadestinofinal" placeholder="horadestinofinal" onChange={this.handleChange} value={form?form.horadestinofinal:""}/>
                    Fecha inicio publicación <input  name="iniciopublicacion"  type="date"   
                    className="form-control"  onChange={ this.handleChange} defaultValue={this.state.fecha} value={form?form.iniciopublicacion:""}/>
                    Fecha fin publicación <input  name="finpublicacion"  type="date"   
                    className="form-control"  onChange={ this.handleChange} value={form?form.finpublicacion:""} /><br/>
                </form>   



                { this.state.error === true && 
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsj}
                        </div>
                }
                
                </ModalBody>


                <ModalFooter>
                    
                    {this.state.tipomodal === "insertar"?
                    <button className="btn btn-crear-usuario" onClick={()=>this.peticionPost()}>Insertar</button>:
                    <button className="btn btn-crear-usuario" onClick={()=>this.peticionPut()}>Actualizar</button>  
                    }

                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                    ¿Estás seguro(a) que deseas eliminar al obituario {form&& form.nombres}
                </ModalBody>
                <ModalFooter>  
                    <button className="btn btn-danger" onClick={()=>this.peticionDelete()}> Si</button>
                    <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar:false})}>No</button>
                </ModalFooter>
            </Modal>


            
        </div>
        </React.Fragment>
    );
}
}


export default CrudObituario;