import React, { useEffects, useState } from 'react';
import axios from 'axios';
import {UrlCreateObi, UrlDeleteObi, UrlShowSala, UrlShowSede} from    '../services/apirest';
import {UrlUpdateObi} from    '../services/apirest';
import {UrlDeleteUsr} from    '../services/apirest';
import {UrlShowObithome} from '../services/apirest';
import {UrlShowObit} from '../services/apirest';
//import ReactPaginate from 'react-paginate';
import {UrlShowIglesia} from '../services/apirest';
import {UrlShowCementerio} from '../services/apirest';
import {UrlShowUbicacion} from '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt, faSearch,faPlus,faTimes,faCheck} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalHeader, ModalBody,ModalFooter,FormGroup} from 'reactstrap'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { faAcquisitionsIncorporated } from '@fortawesome/free-brands-svg-icons';


class CrudObituario extends React.Component{

    constructor(props){
       super(props)

        this.state={
            obituarios:[],
            tablaObituarios:[],
            tablaBusquedaObituarios:[],
            busqueda:"",
            perPage: 999,
            currentPage: 0,
            offset: 0,
            pageCount: 0,

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
         fecha: new Date(),
         virtual: false
         }

         this.handlePageClick = this.handlePageClick.bind(this);

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
        axios.get(UrlShowObit).then(async response=>{
        
        var data = response.data[0];          
        var slice = data==null?null:data.slice(this.state.offset, this.state.offset + this.state.perPage);
       
        this.setState({
             pageCount: data==null?null:Math.ceil(data.length / this.state.perPage),
             obituarios: response.data[0],
            // tablaObituarios: slice
             tablaObituarios: data
         }) 
        });
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
                sedeid : response.data.sedeid,
                salaid : response.data.salaid,
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
        await axios.delete(UrlDeleteObi+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();

        })
    }

   
    cambioFecha=fecha=>{
        this.setState({fecha: fecha})
    }


    filtrar=(terminoBusqueda)=>{
        const {tablaObituarios}=this.state; //traigo la tabla de datos

        var resultadoBusquedad = tablaObituarios.filter((elemento)=>{

            if(elemento.nombreobituario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.apellidosobituario.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.nombrecementerio.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.nombreiglesia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.nombresede.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.nombresala.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
                return elemento;
            }
        });
      
        this.setState({tablaObituarios: resultadoBusquedad});// actualizo el estado de obituarios
      }

     //hande de busqueda 
    handleChangeBuscar= async e=>{
        e.persist();
        await this.setState({busqueda: e.target.value});
      
        // Verificamos si el campo de busqueda tiene datos

        //si el campo de busqueda está vacio:
        if(e.target.value==""){            
            const data = this.state.obituarios;
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                tablaObituarios:slice
            })
        }
         //si el campo de busqueda tiene datos llamamos a la función filtrar:
         else{
                this.filtrar(e.target.value); 
            }
     } 

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
               currentPage: selectedPage,
               offset: offset
        }, () =>{
            this.loadMoreData()
        });
    };

  
    loadMoreData(){
        const data = this.state.obituarios;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            tablaObituarios:slice
        })
    }
  
 
render(){
    const {obituarios} = this.state;
    const {tablaObituarios} = this.state;
    const {form}=this.state;
    const {busqueda}=this.state;
    const {sedes} = this.state;
    const {salas} = this.state;
    const {cementerios}= this.state;
    const {ubicaciones}= this.state;
    const {iglesias} =this.state;

    return(
        
        <React.Fragment>
     <div >
            <br />
            <div className="containerAuxTop">
               <div>
                    <button className="btn btn-crear-usuario" onClick={()=>{this.setState({form:null,tipomodal:"insertar"}); this.modalInsertar()}}><FontAwesomeIcon className="me-2" icon={faPlus}/>Crear obituario</button>
               </div>
                {
                <div className="containerInput">
                    <input type="text" className="form-control inputBuscar" placeholder="Buscar" value={busqueda} onChange={this.handleChangeBuscar}/>
                    <button className="btn btn-success">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>
                
                

                }
                
            </div>
         
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        
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
                       {/*  
                        <th>Inicio publicación</th>
                        <th>Fin publicación</th>
                        */}
                       

                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {tablaObituarios &&tablaObituarios.map
                    ((obi,index)=>{
                    return(
                        <tr key={index}>
                        
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
                        {
                            /*
                            <td>{obi.iniciopublicacion}</td>
                            <td>{obi.finpublicacion}</td>
                            */
                        }                       

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
            {
                /*
                 <ReactPaginate 
                previousLabel={"Anterior"}
                nextLabel={"Siguiente"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}       

           />
                */

            }
           
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
                    <textarea className="form-control" name="mensaje" placeholder="Mensaje" onChange={this.handleChange} value={form?form.mensaje:""}/>
                    <select name="ciudadid" className="form-control" value={form?this.state.form.ciudadid:""} onChange={this.handleChange} ><option value="">Seleccione una ciudad</option>
                        {this.state.ubicaciones&&this.state.ubicaciones.map((ciud,index)=>{ return(<option key={ciud.id} value={ciud.id}>{ciud.ciudad} </option>)})}
                    </select>
                    <select name="sedeid" className="form-control" value={form?this.state.sedeid:""} onChange={this.handleChange} ><option value="">Seleccione una sede</option>
                        {this.state.sedes&&this.state.sedes.map((sed,index)=>{ return(<option key={sed.sedeid} value={sed.sedeid}>{sed.nombresede} </option>)})}
                    </select>
                    <select name="salaid" className="form-control" value={form?this.state.salaid:""} onChange={this.handleChange} ><option value="">Seleccione una sala</option>
                        {this.state.salas&&this.state.salas.map((sal,index)=>{ return(<option key={sal.salaid} value={sal.salaid}>{sal.nombresala} </option>)})}
                    </select>
                    <select name="iglesiaid" className="form-control" value={form?this.state.iglesiaid:""} onChange={this.handleChange} ><option value="">Seleccione una iglesia</option>
                        {this.state.iglesias&&this.state.iglesias.map((igl,index)=>{ return(<option key={igl.iglesiaid} value={igl.iglesiaid}>{igl.nombreiglesia} </option>)})}
                    </select>
                    
                    <input type="text" className="form-control"name="horamisa" placeholder="Hora Misa" onChange={this.handleChange} value={form?form.horamisa:""}/>

                    <select name="cementerioid" className="form-control" value={form?this.state.cementerioid:""} onChange={this.handleChange} ><option value="">Seleccione un cementerio</option>
                        {this.state.cementerios&&this.state.cementerios.map((cem,index)=>{ return(<option key={cem.cementerioid} value={cem.cementerioid}>{cem.nombrecementerio} </option>)})}
                    </select>
                    <span className="destacado">Fecha Exequias:</span> <input  name="fechaexequias"  type="date"   
                    className="form-control"  onChange={ this.handleChange} value={form?form.fechaexequias:""}/>
                      <select name="virtual" className="form-control" value={form?this.state.form.virtual:""} onChange={this.handleChange} ><option value="">Acomp. Virtual</option>
                        <option value="S">Si</option><option value="N">No</option>
                    </select>
                    <input type="text" className="form-control"name="horadestinofinal" placeholder="Hora Destino Final" onChange={this.handleChange} value={form?form.horadestinofinal:""}/>
                    <span className="destacado">Fecha inicio publicación:</span> <input  name="iniciopublicacion"  type="date"   
                    className="form-control"  onChange={ this.handleChange} defaultValue={this.state.fecha} value={form?form.iniciopublicacion:""}/>
                    <span className="destacado">Fecha fin publicación:</span> <input  name="finpublicacion"  type="date"   
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
                    <button className="btn btn-crear-usuario" onClick={()=>this.peticionPost()}><FontAwesomeIcon className="me-2" icon={faCheck}/>Insertar</button>:
                    <button className="btn btn-crear-usuario" onClick={()=>this.peticionPut()}><FontAwesomeIcon className="me-2" icon={faEdit}/>Actualizar</button>  
                    }

                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}><FontAwesomeIcon className="me-2" icon={faTimes}/>Cancelar</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                    ¿Estás seguro(a) que deseas eliminar el obituario {form&& form.nombres} ?
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