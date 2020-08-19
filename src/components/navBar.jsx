import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <NavLink className="nav-link" to="/Movies">
            Movies
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="nav-link" to="/Customers">
            Customers
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink className="nav-link" to="/Rentals">
            Rentals
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
