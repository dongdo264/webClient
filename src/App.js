import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import AgentList from "./pages/agentList/AgentList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import FactoryList from "./pages/factory/Factory";
import WcenterList from "./pages/wcenter/WcenterList";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isLogin, setLogin] = useState(user?.isLoggedIn);
  const [isAdmin, setAdmin] = useState(false);
  const [isAgent, setAgent] = useState(false);
  const [isFactory, setFactory] = useState(false);
  const [isWc, setWc] = useState(false);
  const [role, setRole] = useState(0);
  useEffect(() => {
    setLogin(user?.isLoggedIn);
    console.log("islogin: ", isLogin)
    console.log(user);
    if (user?.role === 10) {
      setAdmin(true);
      setAgent(false);
      setFactory(false);
      setWc(false);
      setRole(10);
    } else if (user?.role === 3) {
      setAdmin(false);
      setAgent(true);
      setFactory(false);
      setWc(false);
      setRole(3);
    } else if (user?.role === 2) {
      setAdmin(false);
      setAgent(false);
      setFactory(false);
      setWc(true);
      setRole(2);
    } else if (user?.role === 1) {
      setAdmin(false);
      setAgent(false);
      setFactory(true);
      setWc(false);
      setRole(1);
    }
  });
  
    return (
      <Router> 
            <Topbar isLogin={isLogin}/>
            <div className="container">
              <Sidebar isLogin={isLogin} role={role}/>
              <Switch>
                <Route path="/admin" exact>
                  <Home isLoggedIn={isLogin} role={role}/>
                </Route>
                <Route path="/admin/agents" >
                  <AgentList  isLoggedIn={isLogin} role={role}/>
                </Route>
                <Route path="/admin/agent/:agentCode">
                  <User  isLoggedIn={isLogin} role={role}/>
                </Route>
                <Route path="/admin/factory">
                  <FactoryList  isLoggedIn={isLogin} role={role}/>
                </Route>
                <Route path="/admin/newUser">
                  <NewUser isLoggedIn={isLogin} role={role}/>
                </Route>
                <Route path="/admin/warrantycenter">
                  <WcenterList isLoggedIn={isLogin} role={role} />
                </Route>
                <Route path="/admin/products">
                  <ProductList isLoggedIn={isLogin} role={role} />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/factory" exact>
                  <Home isLoggedIn={isLogin} />
                </Route>
                <Route path="/factory/products">
                  <ProductList isLoggedIn={isLogin} role={role} />
                </Route>
                <Route path="/" exact>
                  <Login/>
                </Route>
                </Switch>
              </div>
      </Router>
    );
  }

export default App;