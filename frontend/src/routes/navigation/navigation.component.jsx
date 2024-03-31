import { Fragment, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import logo from "../../bootstrap-logo.png";

const Navigation = () => {
  const authStatus = !!sessionStorage.getItem("isAuthenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(authStatus);
  const navItems = [
    {
      title: "Profile",
      to: "/profile",
    },
    {
      title: "Addition",
      to: "/addition",
    },
    {
      title: "Books",
      to: "/books",
    },
    {
      title: "Inventory",
      to: "/inventory",
    },
  ];

  let navLinks;
  if (isAuthenticated) {
    navLinks = (
      <div>
        {navItems.map((item) => {
          return (
            <Link key={item.title} class="navbar-brand px-5" to={item.to}>
              {item.title}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <Fragment>
      {/* navbar */}
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid" style={{ justifyContent: "left" }}>
          <Link class="d-inline-block align-text-top" to="/">
            <img
              src={logo}
              alt="bootstrapLogo"
              width="30"
              height="24"
              class="d-inline-block align-text-top"
            />
          </Link>

          <div>{navLinks}</div>

          {/* <Link class="navbar-brand px-5" to="/">
            Profile
          </Link>
          <Link class="navbar-brand px-5" to="/addition">
            AdditonApp
          </Link>
          <Link class="navbar-brand px-5" to="/books">
            Books
          </Link>
          <Link class="navbar-brand px-5" to="/inventory">
            Inventory Management
          </Link>

          <Link class="navbar-brand px-5" to="/login">
            Login
          </Link>
          <Link class="navbar-brand px-5" to="/signup">
            Signup
          </Link>
          <Link class="navbar-brand px-5" to="/dashboard">
            Dashboard
          </Link> */}
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
