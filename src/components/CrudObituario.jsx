import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateObi} from    '../services/apirest';
import {UrlUpdateObi} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowObithome} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
class CrudObituario extends React.Component{
    state={
       obituarios:[],
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
    fecha: new Date(),
    virtual: false
    }
    componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowObithome).then(async response=>{
         await this.setState({obituarios: response.data[0]});
        })
        }
    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar})
    }
    handleCheck = async e=>{
        this.setState({virtual: !this.state.virtual})
    }
    handleChange= async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log({id:this.state.form.id,apellidos:this.state.form.apellidos,ciudadid:this.state.form.ciudadid,fechaexequias:this.state.form.fechaexequias,finpublicacion:this.state.form.finpublicacion,horadestinofinal:this.state.form.horadestinofinal,horamisa:this.state.form.horamisa,iniciopublicacion:this.state.form.iniciopublicacion,mensaje:this.state.form.mensaje,nombre:this.state.form.nombre,virtual:this.state.form.virtual,sedeid:this.state.sedeid,salaid:this.state.salaid,cementerioid:this.state.cementerioid,iglesiaid:this.state.iglesiaid})
    }  
    manejadorSubmit =e=>{e.preventDefault();}
    peticionPost=async()=>{
        await axios.post(UrlCreateObi, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            this.setState
            ({
                
                modalInsertar:false,
                error:false,
                nombre : response.data.nombre,
                apellidos : response.data.apellidos,
                mensaje : response.data.mensaje,
                ciudadid : response.data.ciudadid,
                sedeid : response.data.sedeid,
                salaid : response.data.salaid,
                iglesiaid : response.data.iglesiaid,
                horamisa : response.data.horamisa,
                cementerioid : response.data.cementerioid,
                horadestinofinal : response.data.horadestinofinal,
                fechaexequias : response.data.fechaexequias,
                virtual : response.data.virtual,
                iniciopublicacion : response.data.iniciopublicacion,
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
    const {form}=this.state;
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
                        <td>{obi.ciudadid}</td>
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
                    <input type="text" className="form-control"name="ciudadid" placeholder="ciudadid"onChange={this.handleChange} value={form?form.ciudadid:""}/>
                    <select name="sedeid" className="form-control" value={this.state.sedeid} onChange={this.handleChange} ><option value="">Seleccione una sede</option>
                        {this.state.obituarios.map((obi,index)=>{ return(<option key={obi.sedeid} value={obi.sedeid}>{obi.nombresede} </option>)})}
                    </select>
                    <select name="salaid" className="form-control" value={this.state.salaid?this.state.salaid:""} onChange={this.handleChange} ><option value="">Seleccione una sala</option>
                        {this.state.obituarios.map((obi,index)=>{ return(<option key={obi.salaid} value={obi.salaid}>{obi.nombresala} </option>)})}
                    </select>
                    <select name="iglesiaid" className="form-control" value={this.state.iglesiaid} onChange={this.handleChange} ><option value="">Seleccione una iglesia</option>
                        {this.state.obituarios.map((obi,index)=>{ return(<option key={obi.iglesiaid} value={obi.iglesiaid}>{obi.nombreiglesia} </option>)})}
                    </select>
                    <input type="text" className="form-control"name="horamisa" placeholder="horamisa" onChange={this.handleChange} value={form?form.horamisa:""}/>
                    <select name="cementerioid" className="form-control" value={this.state.cementerioid} onChange={this.handleChange} ><option value="">Seleccione un cementerio</option>
                        {this.state.obituarios.map((obi,index)=>{ return(<option key={obi.cementerioid} value={obi.cementerioid}>{obi.nombrecementerio} </option>)})}
                    </select>
                    Fecha Exequias <input  name="fechaexequias"  type="date"   
                    className="form-control"  onChange={ this.handleChange} value={form?form.fechaexequias:""}/>
                    Acomp. Virtual<input type="checkbox" name="virtual"  onChange={this.handleCheck} defaultChecked={this.state.virtual}/> <br/>
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