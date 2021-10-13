import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateSala, UrlDeleteSala, UrlShowSede} from    '../services/apirest';
import {UrlUpdSala} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowSala} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt,faPlus,faCheck,faTimes} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'
class CrudSalas extends React.Component{
    state={
       salas:[],
       sedes:[],
       modalInsertar:false,
       modalEliminar: false,
       form:{ 
        "id":"",
        "nombresala":"",
        "sedeid":"",
        "direccionip":"",
    },
    error:false,
    errorMsj:"",
    sedeid: null,
    direccionip: null
    }
    componentDidMount(){
        this.peticionGet();
        }
    peticionGet=()=>{
        axios.get(UrlShowSala).then(async response=>{
         await this.setState({salas: response.data[0]});
        })
        }
    peticionGetSede=()=>{
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
        await axios.post(UrlCreateSala, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            this.setState
            ({
                
                modalInsertar:false,
                error:false,
                nombresala : response.data.nombresala,
                sedeid : response.data.sedeid,
                direccionip : response.data.direccionip
            })
        }).catch(error => {
            this.setState
            ({
                error : true,
                errorMsj:error.response.request.response,
                nombresala:"",
                sedeid:"",
                direccionip:""
            })
        
        })        
    }

    seleccionarsala=async(sal)=>{
        console.log(sal)
        await this.setState({
            form:{
                id:sal.salaid,
                nombresala:sal.nombresala,
                sedeid : sal.sedeid,
                direccionip:sal.direccionip,
            }
        })
    }
    peticionPut=async()=>{
        await axios.put(UrlUpdSala+this.state.form.id,this.state.form).then(response=>{
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
        await axios.delete(UrlDeleteSala+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();

        })
    }

   
    cambioFecha=fecha=>{
        this.setState({fecha: fecha})
    }


render(){
    const {salas} = this.state;
    const {sedes} = this.state;
    const {form}=this.state;
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}><FontAwesomeIcon className="me-2" icon={faPlus}/>Crear sala</button>
            <br /><br />
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Sede</th>
                        <th>Ip</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {salas && salas.map
                    ((sal,index)=>{
                    return(
                        <tr key={index}>
                        <td>{sal.nombresala}</td>
                        <td>{sal.nombresede}</td>
                        <td>{sal.direccionip}</td>
                        <td>
                        <button className="btn btn-edit" onClick={()=>{this.seleccionarsala(sal);this.modalInsertar();this.setState({tipomodal: "actualizar"})}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{this.seleccionarsala(sal);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )}
                    ) }
                </tbody>
            </table>
           
            <Modal isOpen= {this.state.modalInsertar} >
           
            <div className="modal-header">
            {this.state.tipomodal === "insertar"?
                    <h5 className="modal-title">Crear Sala</h5> :<h5 className="modal-title">Actualizar Sala</h5>                    
                    }
            </div>
            
            <ModalBody>                    
                   
               
                 <form onSubmit={this.manejadorSubmit}>
                    
                    <input type="text" className="form-control" name="nombresala" placeholder="Nombre sala" onChange={this.handleChange} value={form?form.nombresala:""}/>
                    
                    <select name="sedeid" className="form-control" value={form?this.state.form.sedeid:""} onChange={this.handleChange} > <option value="">Seleccione una sede</option>
                        {sedes && sedes.map((sed,index)=>{ return(<option key={sed.sedeid} value={sed.sedeid}>{sed.nombresede} </option>)})}
                    </select>
                    <input type="text" className="form-control" pattern="^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$" name="direccionip" placeholder="Dirección Ip" onChange={this.handleChange} value={form?form.direccionip:""}/>
                    
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
                    ¿Estás seguro(a) que deseas eliminar la sala {form&& form.nombres} ?
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


export default CrudSalas;