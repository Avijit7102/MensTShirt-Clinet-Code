import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import ManageProduct from './components/ManageProduct/ManageProduct';
import { createContext } from 'react';
import { useState } from 'react';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();
function App() {
const[loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value = {[loggedInUser,setLoggedInUser]}>
    <Router>
      <div className="navStyle">
        <div className="title">
          <h3>Men T-Shirt</h3>
        </div>
        <div className="nav-name">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/manageProduct">Admin</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>

        </nav>
        </div>
        
        
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          
          <PrivateRoute path="/checkout/:id">
            <Checkout></Checkout>
          </PrivateRoute>
          <PrivateRoute path="/manageProduct">
            <ManageProduct></ManageProduct>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <PrivateRoute path="/manageProduct">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          
          
        </Switch>
      </div>
    </Router>
    </userContext.Provider>
  );
}

export default App;
