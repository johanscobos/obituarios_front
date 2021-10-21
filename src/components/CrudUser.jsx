import React, { useState } from 'react';
import axios from 'axios';
import {UrlShowUsr} from    '../services/apirest';
import {UrlCreateUsr} from    '../services/apirest';
import {UrlUpdateUsr} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowRole,UrlShowUbicacion} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt,faFile,faPlus,faCheck,faTimes} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import Select from 'react-select'
import Obituarios from './Obituarios';
class CrudUser extends React.Component{
    state={
       usuarios:[],
       roles:[],
       modalInsertar:false,
       modalEliminar: false,
       form:{ 
        "id":"",
        "nombres":"",
        "apellidos":"",
        "username":"",
        "ciudad":"",
        "roleid":"",
        "password":""
    },
    error:false,
    errorMsj:"",
    tipomodal:"",
    selectOptions : [],
    ubicaciones:[],
    roleid: null,
    descripcion:"",
    iddepartamento:null
    }
    componentDidMount(){
        this.peticionGet();
        this.peticionGetRol();
        this.peticionGetUbicacion();
        }
    peticionGet=()=>{
        axios.get(UrlShowUsr).then(async response=>{
         await this.setState({usuarios: response.data});
        })
        }
    peticionGetRol=()=>{
        axios.get(UrlShowRole).then(async response=>{
            await this.setState({roles: response.data[0]});
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
    handleChange= async e=>{
        console.log(e.target.value);
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }  

    selectChange(event) {    this.setState({value: event.target.value});  }
    manejadorSubmit =e=>{e.preventDefault();}
    
    peticionPost=async()=>{
        await axios.post(UrlCreateUsr, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            this.setState
            ({
                modalInsertar:false,
                error:false,
                nombres : response.data.nombres,
                apellidos : response.data.apellidos,
                username : response.data.username,
                rolid : response.data.rolid
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

    seleccionarusuario=async(usr)=>{
        await this.setState({
            form:{
                id:usr.id,
                nombres: usr.nombres,
                apellidos: usr.apellidos,
                rolid: usr.rolid,
                username: usr.username,
                ciudad:usr.ciudad            }
        })
    }
    peticionPut=async()=>{
        await axios.put(UrlUpdateUsr+this.state.form.id,this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
            this.setState
            ({
                modalInsertar:false
            })
        })
    }
    peticionDelete=async()=>{
        await axios.delete(UrlDeleteUsr+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();

        })
    }

   
    


render(){
    const {usuarios} = this.state;
    const {form}=this.state;
    const {ubicaciones} = this.state;
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}><FontAwesomeIcon className="me-2" icon={faPlus}/>Crear usuario</button>
            <br /><br />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Nombre usuario</th>
                        <th>Rol</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios && usuarios.map
                    ((usr,index)=>{
                    return(
                        <tr key={index}>
                        <td>{usr.id}</td>
                        <td>{usr.nombres}</td>
                        <td>{usr.apellidos}</td>
                        <td>{usr.username}</td>
                        <td>{usr.descripcion}</td>
                        <td>
                        <button className="btn btn-edit" onClick={()=>{this.seleccionarusuario(usr);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{this.seleccionarusuario(usr);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )}
                    ) }
                </tbody>
            </table>
           
            <Modal isOpen= {this.state.modalInsertar} >
           
            <div class="modal-header">
            {this.state.tipomodal === "insertar"?
                    <h5 class="modal-title">Crear Usuario</h5> :<h5 class="modal-title">Actualizar Usuario</h5>                    
                    }
            </div>
            
            <ModalBody>                    
                   
               
                 <form onSubmit={this.manejadorSubmit}>
                    
                    <input type="text" className="form-control" name="nombres" placeholder="Nombres" onChange={this.handleChange} value={form?form.nombres:""}/>
                    <input type="text" className="form-control" name="apellidos" placeholder="Apeliidos" onChange={this.handleChange} value={form?form.apellidos:""}/> 
                    {this.state.tipomodal === "insertar"?<input type="text" className="form-control"name="username" placeholder="Username"onChange={this.handleChange} value={form?form.username:""}/>: form.username}
                    <select name="ciudad" className="form-control" value={form?this.state.form.ciudad:""} onChange={this.handleChange} ><option value="">Seleccione una ciudad</option>
                        {this.state.ubicaciones.map((ciud,index)=>{ return(<option key={ciud.id} value={ciud.id}>{ciud.ciudad} </option>)})}
                    </select>
                    <select name="rolid" className="form-control" value={this.state.roleid} onChange={this.handleChange} >
                        {this.state.roles.map((rol,index)=>{ return(<option key={rol.roleid} value={rol.roleid}>{rol.descripcion} </option>)})}
                    </select>
                    <input type="password" className="form-control"name="password" placeholder="password" onChange={this.handleChange} value={form?form.password:""}/>
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
                    ¿Estás seguro(a) que deseas eliminar al usuario {form&& form.nombres}
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


export default CrudUser;