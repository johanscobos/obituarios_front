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
        errorMsj:"",
        msjOk:"Usuario creado exitosamente."
    }

manejadorSubmit =e=>{e.preventDefault();}
manejadorButton=()=>{
    let url= UrlCreateUsr ;
        axios.post(url, this.state.form).then(response => {
            
                   this.setState
                    ({
                        nombres : response.data.nombres,
                        apellidos : response.data.apellidos,
                        username : response.data.username,
                        rolid : response.data.rolid
                    })
                }).catch(error => {
                    console.log(error.response)
                    this.setState
                    ({
                        error : true,
                        errorMsj:error.response.request.response
                    })
                
    })        
    }
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
        <div id="formContent">
          <form onSubmit={this.manejadorSubmit}>
                    <input type="text"   name="nombres" placeholder="nombre" onChange={this.manejadorChange}/>
                    <input type="text"   name="apellidos" placeholder="apeliidos" onChange={this.manejadorChange}/>
                    <input type="text"   name="username" placeholder="username" onChange={this.manejadorChange}/>
                    <input type="text"   name="rolid" placeholder="rolid" onChange={this.manejadorChange}/>
                    <input type="password"   name="password" placeholder="password" onChange={this.manejadorChange}/>
                    
                    <input type="submit"  value="Create" onClick={this.manejadorButton}/>
        </form>      

        { this.state.error === true && 
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsj}
                        </div>
                        
                    }
       
               
        </div>
    );
}
}


export default CreateUser;