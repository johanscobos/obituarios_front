import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateIglesia} from    '../services/apirest';
import {UrlUpdateIglesia} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowIglesia} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'
class CrudCementerios extends React.Component{
    state={
       iglesias:[],
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
    ciudadid:null
    }
    componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowIglesia).then(async response=>{
         await this.setState({iglesias: response.data[0]});
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

    seleccionariglesia=async(igl)=>{
        console.log(igl)
        await this.setState({
            form:{
                id:igl.id,
                nombre:igl.nombre,
                direccion : igl.direccion,
                ciudad:igl.ciudad
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
    const {iglesias} = this.state;
    const {form}=this.state;
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}>Crear iglesia</button>
            <br /><br />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {iglesias.map
                    ((igl,index)=>{
                    return(
                        <tr key={index}>
                        <td>{igl.id}</td>
                        <td>{igl.nombre}</td>
                        <td>{igl.direccion}</td>
                        <td>{igl.ciudad}</td>
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
           
            <div class="modal-header">
            {this.state.tipomodal === "insertar"?
                    <h5 class="modal-title">Crear Cementerio</h5> :<h5 class="modal-title">Actualizar Iglesia</h5>                    
                    }
            </div>
            
            <ModalBody>                    
                   
               
                 <form onSubmit={this.manejadorSubmit}>
                    
                    <input type="text" className="form-control" name="nombre" placeholder="Nombre" onChange={this.handleChange} value={form?form.nombre:""}/>
                 
                    <input type="text" className="form-control" name="direccion" placeholder="Direccion" onChange={this.handleChange} value={form?form.direccion:""}/>
                    <select name="ciudad" className="form-control" value={this.state.ciudadid} onChange={this.handleChange} ><option value="">Seleccione una ciudad</option>
                        {this.state.iglesias.map((igl,index)=>{ return(<option key={igl.id} value={igl.id}>{igl.nombre} </option>)})}
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


export default CrudCementerios;