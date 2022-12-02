import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Topbar({isLogin}) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const link = "/viewprofile/" + user?.id;
  useEffect( () => {
    
  }, []);
  return (
    <>
    {!isLogin ? (
      <>
      </>
    ) : (
      <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Xin chào, {user?.username}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <Link to={link}>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </Link>
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
        </div>
      </div>
    </div>
    )}
    
    </>
  );
}
