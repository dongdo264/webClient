import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report
} from "@material-ui/icons";
import { NavLink, useHistory, Route } from "react-router-dom";
import { adminRoutes, factoryRoutes, agentRoutes, wcenterRoutes } from "../../routes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "./logo.PNG";
import { Dehaze, ArrowBackIosNew } from "@mui/icons-material";

export default function Sidebar({ isLogin, role }) {
  const [routes, setRoute] = useState(adminRoutes);
  useEffect(() => {
    //console.log(role);
    if (role === 10) {
      setRoute(adminRoutes);
    } else if (role === 1) {
      setRoute(factoryRoutes);
    } else if (role === 2) {
      setRoute(wcenterRoutes);
    } else if (role === 3) {
      setRoute(agentRoutes);
    }
  });
  const logOut = () => {
    sessionStorage.clear();
    window.location.href = '/';
  }
  return (
    <>
      {!isLogin ? (
        <>
        </>
      ) : (
        <>
          <input type="checkbox" id="check"></input>
          <label htmlFor="check" className="dehazeLabel">
            <i className="dehaze"><Dehaze /></i>
            <i className="close_side_bar"><ArrowBackIosNew /></i>
          </label>
          <div className="sidebar">
            <div class="logoCompany">
              <img src={logo} alt="" />
              <h1>ĐQD Bike</h1>
            </div>
            <div className="sidebarWrapper">
              {/* <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                  <NavLink to="/admin" className="link" exact>
                    <li className="sidebarListItem">
                      <LineStyle className="sidebarIcon" />
                      <h4>Home</h4>
                    </li>
                  </NavLink>
                  <li className="sidebarListItem">
                    <Timeline className="sidebarIcon" />
                    <h4>Analytics</h4>
                  </li>
                  <li className="sidebarListItem">
                    <TrendingUp className="sidebarIcon" />
                    <h4>Sales</h4>
                  </li>
                </ul>
              </div> */}
              <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Menu</h3>
                <ul className="sidebarList">

                  {routes.map((route) => (
                    <NavLink to={route.path} className="link">
                      <li className="sidebarListItem" key={route.icon}>
                        <route.icon className="sidebarIcon" />
                        <h4>{route.name}</h4>
                      </li>
                    </NavLink>
                  ))}

                  {/* <NavLink to="/admin/agents" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Đại lý
              </li>
            </NavLink>
            <NavLink to="/admin/factory" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Cơ sở sản xuất
              </li>
            </NavLink>
            <NavLink to="/admin/warrantycenter" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Trung tâm bảo hành
              </li>
            </NavLink>
            <NavLink to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </NavLink>
            <NavLink to="/admin/newUser" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Cấp tài khoản
              </li>
            </NavLink> */}
                </ul>
              </div>

              <div className="sidebarMenu">
                <h3 className="sidebarTitle">Tài khoản</h3>
                <ul className="sidebarList">
                  <li className="sidebarListItem">
                    <MailOutline className="sidebarIcon" />
                    <h4>Mail</h4>
                  </li>
                  <li className="sidebarListItem">
                    <DynamicFeed className="sidebarIcon" />
                    <h4>Feedback</h4>
                  </li>
                  <li className="sidebarListItem" onClick={logOut} >
                    <ChatBubbleOutline className="sidebarIcon" />
                    <h4>Đăng xuất</h4>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </>
      )}
    </>

  );
}
