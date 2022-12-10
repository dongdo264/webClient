import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import AgentList from "./pages/agentList/AgentList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import NewProduct from "./pages/newProduct/NewProduct";
import FactoryList from "./pages/factory/Factory";
import WcenterList from "./pages/wcenter/WcenterList";
import Login from "./pages/login/Login";
import ProductLine from "./pages/productline/ProductLine";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';


const data = {
  name: "Xe đạp của tui",
  size: "One size",
  color: "Back, White, Yellow",
  frame: "Max Bike steel frame",
  fork: "Max Bike suspension fork",
  rim: "Alloy, 36h, schrader valve",
  spoke: "14G",
  tire: "24\" x 2.125",
  handlebar: "JB-6819 31.8x620mm steel",
  img: "https://xedap.vn/wp-content/uploads/2022/08/Escape-3-2023.jpg",
}


function App() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isLogin, setLogin] = useState(user?.isLoggedIn);
  const [role, setRole] = useState(0);
  useEffect(() => {
    setLogin(user?.isLoggedIn);
    // console.log("islogin: ", isLogin)
    // console.log(user);
    if (user?.role === 10) {
      setRole(10);
    } else if (user?.role === 3) {
      setRole(3);
    } else if (user?.role === 2) {
      setRole(2);
    } else if (user?.role === 1) {
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
                <Route path="/viewprofile/:id">
                  <User isLoggedIn={isLogin}/>
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
                <Route path="/admin/productlines">
                  <ProductLine isLoggedIn={isLogin}/>
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