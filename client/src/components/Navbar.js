import React from "react";
import { Link, Navigate } from "react-router-dom";
import bookImg from "../constants/imgs/73704.jpg";
import { CgProfile } from "react-icons/cg";
import "../css/nav.css";

const Navbar = (props) => {
  const { token, logout } = props;

  return (
    <div className="nav">
      <Link to="/public">
        <img className="book-img" src={bookImg} />
      </Link>
      <div className="user-controls">
        {token && (
          <Link to="/profile" className="nav-link">
            <CgProfile size={30} color="#4b4a4a" />
          </Link>
        )}
        {token && (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
