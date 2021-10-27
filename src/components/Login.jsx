import React  from 'react';
import '../assets/css/Login.css';
import logoBlanco from '../assets/img/logo-la-ofrenda-blanco.png';
import {UrlLogin} from    '../services/apirest';
import {isRol} from    '../services/roles';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
const isRole = isRol()
class Login extends React.Component{

constructor(props){
    super(props);
}    
state={
    form:{
        "username":"",
        "password":""
    },
    error:false,
    errorMsj:"a"
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

manejadorButton=()=>{
    let url= UrlLogin ;
        axios.post(url, this.state.form).then(response => {
                    localStorage.setItem("Token",response.data.api_token);
                    localStorage.setItem("rolid",response.data.role_id);
                    localStorage.setItem("departamentoid",response.data.iddepartamento);
                    response.data.role_id == 1 ? window.location = '/crudUser': window.location = '/crudObituario'
                }).catch(error => {
                    this.setState
                    ({
                        error : true,
                        errorMsj:error.response.data.Error
                    })
            
})        
}


render(){
    return(
        <React.Fragment>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    
                    <div className="fadeIn first login-top">
                        <br /><br />
                    <img src={logoBlanco} width="100px" alt="User Icon" />
                    <br /><br />
                    </div>
                   
                    <form onSubmit={this.manejadorSubmit} className="form-login">
                    <input type="text"  className="fadeIn second form-control" name="username" placeholder="Usuario" onChange={this.manejadorChange}/>
                    <input type="password"  className="fadeIn third form-control" name="password" placeholder="Contraseña" onChange={this.manejadorChange}/>
                    <input type="submit" className="fadeIn fourth btn btn-ingresar" value="Ingresar" onClick={this.manejadorButton}/>
                    </form>
                    
                    { this.state.error === true && 
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsj}
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}
}

export default Login;