import React from "react";
import { AiTwotoneShop } from "react-icons/ai";
import { NavLink} from "react-router-dom";
import "./sidebarnew.scss";

const Sidebarnew = () => {
  return (
    <div className="app__sidebar">
      <div className="sidebar__header">
        <AiTwotoneShop />
        <p>
          Burger<span>Min</span>
        </p>
      </div>
      <div className="sidebar__routes">
        <ul>
            <li>
              <NavLink to="/admin">
                <AiTwotoneShop />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin">
                <AiTwotoneShop />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/agents">
                <AiTwotoneShop />
                <span>Đại lý</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/factory">
                <AiTwotoneShop />
                <span>Cơ sở sản xuất</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/warrantycenter">
                <AiTwotoneShop />
                <span>Trung tâm bảo hành</span>
              </NavLink>
            </li>
        </ul>

        <div className="user__profile__container">
          <div className="user__container">
            <img alt="" />
            <p>Thomas Edison</p>
          </div>
          <NavLink to="/settings" className="profile__link">
            Open Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebarnew;
