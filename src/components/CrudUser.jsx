import React from 'react';
import axios from 'axios';
import {UrlShowUsr} from    '../services/apirest';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
class CrudUser extends React.Component{

    state={
       data:[]
    }

    peticionGet=()=>{
        axios.get(UrlShowUsr,this.state).then(response=>{
          this.setState({data: response.data});
          console.log(response.data);
        })
        }
componentDidMount(){
this.peticionGet();

}
manejadorSubmit =e=>{e.preventDefault();}
    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
    }
    
render(){
    return(
        <div >
            <br />
            <button className="btn btn-success">Crear usuario</button>
            <br /><br />
            <table className="table">
                <thead>
                    <tr>
                        <th>apellidos</th>
                        <th>api_token</th>
                        <th>created_at</th>
                        <th>id</th>
                        <th>nombres</th>
                        <th>updated_at</th>
                        <th>username</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((value,index)=>{
                        return(
                        <tr key={index}>
                        <td>apellidos</td>
                        <td>api_token</td>
                        <td>fecha creacion</td>
                        <td>id</td>
                        <td>nombres</td>
                        <td>fecha actualizacion</td>
                        <td>username</td>

                        <td>
                        <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
}


export default CrudUser;