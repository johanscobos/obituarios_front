import React  from 'react';
import '../assets/css/Login.css';
import logo from '../assets/img/logo.png';
import {UrlLogin} from    '../services/apirest';
import axios from 'axios';
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
                    this.props.history.push("/create-user");
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
                    
                    <div className="fadeIn first">
                        <br /><br />
                    <img src={logo} width="100px" alt="User Icon" />
                    <br /><br />
                    </div>

                    
                    <form onSubmit={this.manejadorSubmit}>
                    <input type="text"  className="fadeIn second" name="username" placeholder="user" onChange={this.manejadorChange}/>
                    <input type="password"  className="fadeIn third" name="password" placeholder="password" onChange={this.manejadorChange}/>
                    <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorButton}/>
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