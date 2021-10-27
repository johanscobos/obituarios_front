import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateIglesia, UrlDeleteIglesia} from    '../services/apirest';
import {UrlUpdateIglesia} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowIglesia,UrlShowIglesia2} from '../services/apirest';
import {UrlShowCiudad,UrlShowCiudad2} from '../services/apirest';
import {isRol} from '../services/roles';
import {isDepto} from '../services/ubicaciones';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt,faPlus,faTimes,faCheck} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'
const isDepato= isDepto()
const isRole= isRol()
class CrudIglesias extends React.Component{
    state={
       iglesias:[],
       ciudades:[],
       modalInsertar:false,
       modalEliminar: false,
       form:{ 
        "id":"",
        "nombresede":"",
        "direccion":"",
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
        isRole==1?axios.get(UrlShowIglesia2).then(async response=>{
         await this.setState({iglesias: response.data[0]});
        }) : axios.get(UrlShowIglesia + isDepato).then(async response=>{
            await this.setState({iglesias: response.data[0]});
           })
        }
    peticionGetCiudad=()=>{
       isRole==1? axios.get(UrlShowCiudad2).then(async response=>{
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
        await axios.post(UrlCreateIglesia, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            this.setState
            ({
                
                modalInsertar:false,
                error:false,
                nombre : response.data.nombre,
                direccion : response.data.direccion,
                ciudad : response.data.ciudad
            })
        }).catch(error => {
            this.setState
            ({
                error : true,
                errorMsj:error.response.request.response,
                nombre:"",
                direccion:"",
                ciudad:""
            })
        
        })        
    }

    seleccionariglesia=async(igle)=>{
        await this.setState({
            form:{
                id:igle.iglesiaid,
                nombre:igle.nombreiglesia,
                direccion : igle.direccioniglesia,
                ciudad:igle.idci
            }
        })
    }
    peticionPut=async()=>{
        await axios.put(UrlUpdateIglesia+this.state.form.id,this.state.form).then(response=>{
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
        await axios.delete(UrlDeleteIglesia+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();

        })
    }

   
    cambioFecha=fecha=>{
        this.setState({fecha: fecha})
    }


render(){
    const {iglesias} = this.state;
    const {ciudades} = this.state;
    const {form}=this.state;
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}><FontAwesomeIcon className="me-2" icon={faPlus}/>Crear iglesia</button>
            <br /><br />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {iglesias && iglesias.map
                    ((igl,index)=>{
                    return(
                        <tr key={index}>
                        <td>{igl.nombreiglesia}</td>
                        <td>{igl.direccioniglesia}</td>
                        <td>{igl.ciudadiglesia}</td>
                        <td>
                        <button className="btn btn-edit" onClick={()=>{this.seleccionariglesia(igl);this.modalInsertar();this.setState({tipomodal: "actualizar"})}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{this.seleccionariglesia(igl);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )}
                    ) }
                </tbody>
            </table>
           
            <Modal isOpen= {this.state.modalInsertar} >
           
            <div className="modal-header">
            {this.state.tipomodal === "insertar"?
                    <h5 className="modal-title">Crear Iglesia</h5> :<h5 className="modal-title">Actualizar Iglesia</h5>                    
                    }
            </div>
            
            <ModalBody>                    
                   
               
                 <form onSubmit={this.manejadorSubmit}>
                    
                    <input type="text" className="form-control" name="nombre" placeholder="Nombre" onChange={this.handleChange} value={form?form.nombre:""}/>
                 
                    <input type="text" className="form-control" name="direccion" placeholder="Direccion" onChange={this.handleChange} value={form?form.direccion:""}/>
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
                    ¿Estás seguro(a) que deseas eliminar la iglesia {form&& form.nombres} ?
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


export default CrudIglesias;