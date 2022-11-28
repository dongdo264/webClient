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
import FactoryList from "./pages/factory/factory";
import WcenterList from "./pages/wcenter/WcenterList";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

function App() {
  const history = useHistory();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    setLogin(user?.isLoggedIn);
    
    console.log(isLogin);
  });
  
    return (
      <Router> 
            <Topbar isLogin={isLogin}/>
            <div className="container">
              <Sidebar isLogin={isLogin}/>
              <Switch>
                <Route path="/admin" exact>
                  <Home isLoggedIn={isLogin} />
                </Route>
                <Route path="/admin/agents">
                  <AgentList  isLoggedIn={isLogin}/>
                </Route>
                <Route path="/admin/agent/:agentCode">
                  <User  isLoggedIn={isLogin}/>
                </Route>
                <Route path="/admin/factory">
                  <FactoryList  isLoggedIn={isLogin}/>
                </Route>
                <Route path="/admin/newUser">
                  <NewUser isLoggedIn={isLogin}/>
                </Route>
                <Route path="/admin/warrantycenter">
                  <WcenterList isLoggedIn={isLogin} />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
                </Switch>
              </div>
      </Router>
    );
  }

export default App;
