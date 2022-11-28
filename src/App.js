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
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

function App() {
  const history = useHistory();
  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    if(user) {
      console.log(1);
    } else {
      console.log(2);
    }
  }, [user]);
  
    return (
      <Router>
        
        {!user ? (
          <div className="container">
            <>
              <Route path="/" exact>
                <Login />
              </Route>
            </>
          </div>
          ) : (
            <>
            
            <Topbar />
            <div className="container">
              <Sidebar />
              <Switch>
                <Route path="/admin" exact>
                  <Home />
                </Route>
                <Route path="/admin/agents">
                  <AgentList />
                </Route>
                <Route path="/admin/agent/:agentCode">
                  <User />
                </Route>
                <Route path="/admin/factory">
                  <FactoryList />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/products">
                  <ProductList />
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
            </>
          )}
              
        
      </Router>
    );
  }

export default App;
