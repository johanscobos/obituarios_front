import React, { useState } from 'react';
import axios from 'axios';
import {UrlShowUsr} from    '../services/apirest';
import {UrlCreateUsr} from    '../services/apirest';
import {UrlUpdateUsr} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
class CrudUser extends React.Component{

    state={
       usuarios:[],
       modalInsertar:false,
       form:{
        "id":"",
        "nombres":"",
        "apellidos":"",
        "username":"",
        "rolid":"",
        "password":""
    },
    error:false,
    errorMsj:"",
    tipomodal:""
    }
    componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowUsr).then(async response=>{
         await this.setState({usuarios: response.data[0]});
        
        })
        }
    modalInsertar=()=>{
        this.setState({modalInsertar: true})
    }
    handleChange= async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)
    }  
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
                username: usr.username
            }
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

render(){
    const {usuarios} = this.state;
    const {form}=this.state;
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-success" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}>Crear usuario</button>
            <br /><br />
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nombres</th>
                        <th>apellidos</th>
                        <th>nombre usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map
                    ((usr,index)=>{
                    return(
                        <tr key={index}>
                        <td>{usr.id}</td>
                        <td>{usr.nombres}</td>
                        <td>{usr.apellidos}</td>
                        <td>{usr.username}</td>
                        <td>
                        <button className="btn btn-primary" onClick={()=>{this.seleccionarusuario(usr);this.modalInsertar("upd")}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )}
                    ) }
                </tbody>
            </table>

            <Modal isOpen= {this.state.modalInsertar} >
                <ModalBody>
                <form onSubmit={this.manejadorSubmit}>
                    <input type="text"   name="nombres" placeholder="nombre" onChange={this.handleChange} value={form?form.nombres:""}/>
                    <input type="text"   name="apellidos" placeholder="apeliidos" onChange={this.handleChange} value={form?form.apellidos:""}/>
                    <input type="text"   name="username" placeholder="username"onChange={this.handleChange} value={form?form.username:""}/>
                    <input type="text"   name="rolid" placeholder="rolid" onChange={this.handleChange} value={form?form.rolid:""}/>
                    <input type="password"   name="password" placeholder="password" onChange={this.handleChange} value={form?form.password:""}/>
                    
                </form>   
                { this.state.error === true && 
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsj}
                        </div>
                }
                
                </ModalBody>
                <ModalFooter>
                    {this.state.tipomodal === "insertar"?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>Insertar</button>:
                    <button className="btn btn-success" onClick={()=>this.peticionPut()}>Actualizar</button>
                    }
                </ModalFooter>
            </Modal>
        </div>
        </React.Fragment>
    );
}
}


export default CrudUser;