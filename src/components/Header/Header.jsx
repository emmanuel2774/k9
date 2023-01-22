import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";

function Header() {
  const { loggedIn } = useAuthStatus();
  return (
    <div className="header-section">
      <button
        type="button"
        className="btn btn-outline-success "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Available breeds
      </button>

      <NavLink to={loggedIn ? "/sell-dog" : "/sign-in"}>
        <button className="btn btn-outline-success">Sell a Dog</button>
      </NavLink>
    </div>
  );
}

export default Header;
