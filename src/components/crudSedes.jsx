import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateSede} from    '../services/apirest';
import {UrlUpdateSede} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowSede} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'
class CrudSedes extends React.Component{
    state={
       sedes:[],
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
    ciudadid:null
    }
    componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowSede).then(async response=>{
         await this.setState({sedes: response.data[0]});
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

    seleccionarsede=async(sed)=>{
        console.log(sed)
        await this.setState({
            form:{
                id:sed.id,
                nombresede:sed.nombresede,
                direccion : sed.direccion,
                telefono:sed.telefono,
                ciudad:sed.ciudad
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
    const {sedes} = this.state;
    const {form}=this.state;
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}>Crear sede</button>
            <br /><br />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {sedes.map
                    ((sed,index)=>{
                    return(
                        <tr key={index}>
                        <td>{sed.id}</td>
                        <td>{sed.nombresede}</td>
                        <td>{sed.direccion}</td>
                        <td>{sed.telefono}</td>
                        <td>{sed.ciudad}</td>
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
                    <h5 class="modal-title">Crear Sede</h5> :<h5 class="modal-title">Actualizar Sede</h5>                    
                    }
            </div>
            
            <ModalBody>                    
                   
               
                 <form onSubmit={this.manejadorSubmit}>
                    
                    <input type="text" className="form-control" name="nombresede" placeholder="Nombre sede" onChange={this.handleChange} value={form?form.nombresede:""}/>
                 
                    <input type="text" className="form-control" name="direccion" placeholder="Direccion" onChange={this.handleChange} value={form?form.direccion:""}/>
                    <input type="text" className="form-control" name="telefono" placeholder="Telefono" onChange={this.handleChange} value={form?form.telefono:""} />
                    <select name="ciudad" className="form-control" value={this.state.ciudadid} onChange={this.handleChange} ><option value="">Seleccione una ciudad</option>
                        {this.state.sedes.map((sed,index)=>{ return(<option key={sed.id} value={sed.id}>{sed.nombresede} </option>)})}
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


export default CrudSedes;