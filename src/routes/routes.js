import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from '../components/Login';
import CrudUser from '../components/CrudUser';
import { isAuthenticated } from '../services/authentication';
export const Routes=() => {
  const isAuth= isAuthenticated();
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component ={Login}/>
          <Route exact path="/crudUser" component = {isAuth? CrudUser: Login}/>
        </Switch>
      </BrowserRouter>
        
    )
}
export default Routes;