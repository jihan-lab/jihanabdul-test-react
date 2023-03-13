import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-5">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
