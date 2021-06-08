import React from 'react';
import axios from 'axios';
import {UrlCreateUsr} from    '../services/apirest';
class CreateUser extends React.Component{

    state={
        form:{
            "nombres":"",
            "apellidos":"",
            "username":"",
            "rolid":"",
            "password":""
        },
        error:false,
        errorMsj:"a"
    }
manejadorButton=()=>{
    let url= UrlCreateUsr ;
        axios.post(url, this.state.form).then(response => {
                    this.setState
                    ({
                        nombres : response.data.nombres,
                        apellidos : response.data.apellidos,
                        username : response.data.username,
                        rolid : response.data.rolid,
                        password : response.data.password
                    })
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
        <div id="formContent">
                <form action="/my-handling-form-page" method="post">
                        <ul>
                        <li>
                            <label for="name">Nombres:</label>
                            <input type="text" id="name" name="user_name" />
                        </li>
                        <li>
                            <label for="apellido">Apellidos:</label>
                            <input type="text" id="apellido" name="user_apellido" />
                        </li>
                        <li>
                            <label for="Username">Username:</label>
                            <input type="text" id="username" name="username" />
                        </li>
                        <li>
                            <label for="rolid">rolid:</label>
                            <input type="text" id="rolid" name="rolid" />
                        </li>
                        <li>
                            <label for="password">password:</label>
                            <input type="password" id="password" name="password" />
                        </li>
                        <li>
                        <input type="submit" className="fadeIn fourth" value="Crear" onClick={this.manejadorButton}/>
                        </li>
                        </ul>
                </form>
        </div>
    );
}
}

export default CreateUser;