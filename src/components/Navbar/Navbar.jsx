import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import DogLogo from "../../assets/dog-icons/dog.png";
import { getAuth } from "firebase/auth";
import { useAuthStatus } from "../../hooks/useAuthStatus";

function Navbar() {
  const { loggedIn } = useAuthStatus();

  const auth = getAuth();

  const loggedInUser = auth.currentUser;

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <img className="dog-logo" src={DogLogo} alt="" />
      </div>
      <div className="nav-links-container">
        <NavLink className="nav-links" to="/">
          Home
        </NavLink>
        <NavLink className="nav-links" to="/profile">
          Profile
        </NavLink>
        {loggedIn ? null : (
          <NavLink className="nav-links" to="/sign-in">
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navbar;
