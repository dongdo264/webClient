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
import Login from "../../pages/login/Login";

export default function Sidebar({isLogin}) {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }
  return (
    <>
    {!isLogin ? (
      <>
      </>
    ) : (
      <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <NavLink to="/admin" className="link" exact>
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </NavLink>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink to="/admin/agents" className="link">
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
            <NavLink to="/products" className="link">
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
            </NavLink>
            {/* <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem" onClick={logOut} >
              <ChatBubbleOutline className="sidebarIcon" />
              Đăng xuất
            </li>
          </ul>
        </div>
        
      </div>
    </div>
    )}
    </>
    
  );
}
