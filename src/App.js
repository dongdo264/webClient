import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AgentList from "./pages/agentList/AgentList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import FactoryList from "./pages/factory/factory";
import { useEffect, useState } from "react";
import Login from "./pages/login/Login";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(0);
  
  const handleLogin = (login, role_) => {
    setIsLogin(login);
    setRole(role_);
  }

  useEffect(() => {
    console.log(isLogin);
    console.log(role);
  }, [isLogin, role]);

  if ((!isLogin || role === 0 )) {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact>
              <Login handleLoginFromParent={handleLogin} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
    return (
      <Router>
        <Topbar />
        <div className="container">
          {isLogin ? (
            <>
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
              </Switch>
            </>
          ) : (
            <>
            </>
          )}
          
        </div>
      </Router>
    );
  }

export default App;
