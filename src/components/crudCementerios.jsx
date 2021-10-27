import React, { useState } from 'react';
import axios from 'axios';
import {UrlCreateCementerio, UrlDeleteCementerio} from    '../services/apirest';
import {UrlUpdateCementerio} from    '../services/apirest';
import {isRol} from    '../services/roles';
import {isDepto} from    '../services/ubicaciones';
import {UrlShowCementerio,UrlShowCementerio2} from '../services/apirest';
import {UrlShowCiudad,UrlShowCiudad2} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt,faPlus,faTimes,faCheck} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import 'react-datepicker/dist/react-datepicker.css'
const isRole= isRol()
const isDepato= isDepto()
class CrudCementerios extends React.Component{
    state={
       cementerios:[],
       ciudades:[],
       modalInsertar:false,
       modalEliminar: false,
       form:{ 
        "id":"",
        "nombre":"",
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
        isRole==1?axios.get(UrlShowCementerio2).then(async response=>{
            await this.setState({cementerios: response.data[0]});
           }):axios.get(UrlShowCementerio + isDepato).then(async response=>{
         await this.setState({cementerios: response.data[0]});
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
        console.log(e.target.value)
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
        await axios.post(UrlCreateCementerio, this.state.form).then(response => {
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

    seleccionarcementerio=async(cem)=>{
        console.log(cem)
        await this.setState({
            form:{
                id:cem.cementerioid,
                nombre:cem.nombrecementerio,
                direccion : cem.direccioncementerio,
                ciudad:cem.idci
            }
        })
    }
    peticionPut=async()=>{
        await axios.put(UrlUpdateCementerio+this.state.form.id,this.state.form).then(response=>{
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
        await axios.delete(UrlDeleteCementerio+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();

        })
    }

   
    cambioFecha=fecha=>{
        this.setState({fecha: fecha})
    }


render(){
    const {cementerios} = this.state;
    const {ciudades} = this.state;
    const {form}=this.state;
    return(
        <React.Fragment>
        <div >
            <br />
            <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}><FontAwesomeIcon className="me-2" icon={faPlus}/>Crear cementerio</button>
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
                    {cementerios && cementerios.map
                    ((cem,index)=>{
                    return(
                        <tr key={index}>
                        <td>{cem.nombrecementerio}</td>
                        <td>{cem.direccioncementerio}</td>
                        <td>{cem.ciudadcementerio}</td>
                        <td>
                        <button className="btn btn-edit" onClick={()=>{this.seleccionarcementerio(cem);this.modalInsertar();this.setState({tipomodal: "actualizar"})}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{this.seleccionarcementerio(cem);this.setState({modalEliminar:true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )}
                    ) }
                </tbody>
            </table>
           
            <Modal isOpen= {this.state.modalInsertar} >
           
            <div className="modal-header">
            {this.state.tipomodal === "insertar"?
                    <h5 className="modal-title">Crear Cementerio</h5> :<h5 className="modal-title">Actualizar Cementerio</h5>                    
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
                    ¿Estás seguro(a) que deseas eliminar el cementerio {form&& form.nombres} ?
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