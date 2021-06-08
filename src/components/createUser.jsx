import React from 'react';

class CreateUser extends React.Component{

render(){
    return(
        <div className="wrapper fadeInDown">
                <div id="formContent">

                    
                    <form>
                    <input type="text"  className="fadeIn second" name="username" placeholder="user" />
                    <input type="password"  className="fadeIn third" name="password" placeholder="password" />
                    <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>
                    
                </div>
            </div>
    );
}
}

export default CreateUser;