import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Footer from "./components/footer/Footer";
import "./App.css";
import Home from "./pages/home/Home";
import WarrantyHome from "./pages/home/WarrantyHome";
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
import Order from "./pages/order/Order";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import ProductionTable from "./pages/factory/ProductionTable";
import TransferProduct from "./pages/factory/TransferProduct";
import Warehouse from "./pages/factory/Warehouse";
import Customer from "./pages/customer/Customer";
import ProductsAreSold from "./pages/productList/ProductsAreSold";
import WarrantyList from "./pages/wcenter/WarrantyList";
import SummonProducts from "./pages/productList/SummonProducts";
import FaultyProduct from "./pages/productList/FaultyProduct";


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
                <Route path="/agent/products">
                  <Order />
                </Route>
                <Route path="/factory/faultyproducts">
                  <FaultyProduct />
                </Route>
                <Route path="/agent/productsaresold">
                  <ProductsAreSold  isLoggedIn={isLogin}/>
                </Route>
                <Route path="/agent/summonproducts">
                  <SummonProducts isLoggedIn={isLogin}/>
                </Route>
                <Route path="/agent/customers">
                  <Customer isLoggedIn={isLogin}/>
                </Route>
                <Route path="/agent/warehouse">
                  <Warehouse role={role} />
                </Route>
                <Route path="/agent/warranty">
                  <WarrantyList role={role} isLoggedIn={isLogin} />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/factory" exact>
                  <Home isLoggedIn={isLogin} />
                </Route>
                <Route path="/factory/warehouse" exact>
                  <Warehouse isLoggedIn={isLogin} role={role}/>
                </Route>
                <Route path="/factory/transferproducts" exact>
                  <TransferProduct isLoggedIn={isLogin} />
                </Route>
                <Route path="/factory/products">
                  <ProductList isLoggedIn={isLogin} role={role} />
                </Route>
                <Route path="/factory/actions">
                  <ProductionTable isLoggedIn={isLogin} role={role} />
                </Route>
                <Route path="/wc/warranty">
                  <WarrantyList isLoggedIn={isLogin} role={role} />
                </Route>
                <Route path="/wc/analyz" exact>
                  <WarrantyHome isLoggedIn={isLogin} role={role} />
                </Route>
                <Route path="/" exact>
                  <Login/>
                </Route>

                </Switch>
              </div>
              {/* <Footer /> */}
      </Router>
    );
  }

export default App;