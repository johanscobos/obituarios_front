import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateSede, UrlDeleteSede} from    '../services/apirest';
import {UrlUpdateSede} from    '../services/apirest';
import {UrlShowCiudad,UrlShowCiudad2} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import { isDepto } from '../services/ubicaciones';
import { isRol } from '../services/roles';
import {UrlShowSede,UrlShowSede2} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt,faPlus,faTimes,faCheck} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'
const isDepato=isDepto()
const isRole = isRol()
class CrudSedes extends React.Component{
    state={
       sedes:[],
       ciudades:[],
       modalInsertar:false,
       modalEliminar: false,
       form:{ 
        "id":"",
        "nombresede":"",
        "direccion":"",
        "telefono":"",
        "ciudad":""
    },
    error:false,
    errorMsj:"",
    ciudad:null
    }
    componentDidMount(){
        this.peticionGet();
        this.peticionGetCiudad();
        }
    peticionGet=()=>{
        isRole==1?axios.get(UrlShowSede2).then(async response=>{
            await this.setState({sedes: response.data[0]});
           }):axios.get(UrlShowSede + isDepato).then(async response=>{
         await this.setState({sedes: response.data[0]});
        })
        }
    peticionGetCiudad=()=>{
        isRole==1?axios.get(UrlShowCiudad2).then(async response=>{
        await this.setState({ciudades: response.data[0]});
        }) : axios.get(UrlShowCiudad + isDepato).then(async response=>{
            await this.setState({ciudades: response.data[0]});
            })
    }
    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar})
    }
    handleChange= async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }  
    manejadorSubmit =e=>{e.preventDefault();}
    peticionPost=async()=>{
        await axios.post(UrlCreateSede, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            this.setState
            ({
                
                modalInsertar:false,
                error:false,
                nombresede : response.data.nombresede,
                direccion : response.data.direccion,
                telefono : response.data.telefono,
                ciudad : response.data.ciudad
            })
        }).catch(error => {
            this.setState
            ({
                error : true,
                errorMsj:error.response.request.response,
                nombresede:"",
                direccion:"",
                telefono:""
            })
        
        })        
    }

    seleccionarsede=async(vsed)=>{
        console.log(vsed)
        await this.setState({
            form:{
                id:vsed.sedeid,
                nombresede:vsed.nombresede,
                direccion : vsed.direccionsede,
                telefono:vsed.telefonosede,
                ciudad:vsed.ciud
            }
        })
    }
    peticionPut=async()=>{
        await axios.put(UrlUpdateSede+this.state.form.id,this.state.form).then(response=>{
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
        await axios.delete(UrlDeleteSede+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();

        })
    }

   
    cambioFecha=fecha=>{
        this.setState({fecha: fecha})
    }


render(){
    const {sedes} = this.state;
    const {ciudades} = this.state;
    const {form}=this.state;
    console.log(ciudades)
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}><FontAwesomeIcon className="me-2" icon={faPlus}/>Crear sede</button>
            <br /><br />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Direcci??n</th>
                        <th>Tel??fono</th>
                        <th>Ciudad</th>
                        <th>Acci??n</th>
                    </tr>
                </thead>
                <tbody>
                    {sedes && sedes.map
                    ((sed,index)=>{
                    return(
                        <tr key={index}>
                        <td>{sed.nombresede}</td>
                        <td>{sed.direccionsede}</td>
                        <td>{sed.telefonosede}</td>
                        <td>{sed.ciudadsede}</td>
                        <td>
                        <button className="btn btn-edit" onClick={()=>{this.seleccionarsede(sed);this.modalInsertar();this.setState({tipomodal: "actualizar"})}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{this.seleccionarsede(sed);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )}
                    ) }
                </tbody>
            </table>
           
            <Modal isOpen= {this.state.modalInsertar} >
           
            <div class="modal-header">
            {this.state.tipomodal === "insertar"?
                    <h5 className="modal-title">Crear Sede</h5> :<h5 className="modal-title">Actualizar Sede</h5>                    
                    }
            </div>
            
            <ModalBody>                    
                   
               
                 <form onSubmit={this.manejadorSubmit}>
                    
                    <input type="text" className="form-control" name="nombresede" placeholder="Nombre sede" onChange={this.handleChange} value={form?form.nombresede:""}/>
                 
                    <input type="text" className="form-control" name="direccion" placeholder="Direccion" onChange={this.handleChange} value={form?form.direccion:""}/>
                    <input type="text" className="form-control" name="telefono" placeholder="Telefono" onChange={this.handleChange} value={form?form.telefono:""} />
                    <select name="ciudad" className="form-control" value={form?this.state.form.ciudad:""} onChange={this.handleChange} ><option value="">Seleccione una ciudad</option>
                        {ciudades&&ciudades.map((ciud,index)=>{ return(<option key={ciud.id} value={ciud.id}>{ciud.nombreciudad} </option>)})}
                    </select>
                    
                </form>   



                { this.state.error === true && 
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsj}
                        </div>
                }
                
                </ModalBody>


                <ModalFooter>
                    
                    {this.state.tipomodal === "insertar"?
                    <button className="btn btn-crear-usuario" onClick={()=>this.peticionPost()}><FontAwesomeIcon className="me-2" icon={faCheck}/>Insertar</button>:
                    <button className="btn btn-crear-usuario" onClick={()=>this.peticionPut()}><FontAwesomeIcon className="me-2" icon={faEdit}/>Actualizar</button>  
                    }

                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}><FontAwesomeIcon className="me-2" icon={faTimes}/>Cancelar</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                    ??Est??s seguro(a) que deseas eliminar la sede {form&& form.nombres} ?
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


export default CrudSedes;