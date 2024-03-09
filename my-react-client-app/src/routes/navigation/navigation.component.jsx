import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import logo from "../../bootstrap-logo.png";

const Navigation = () => {
  return (
    <Fragment>
      {/* navbar */}
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid" style={{ "justify-content": "left" }}>
          <Link class="d-inline-block align-text-top" to="/">
            <img
              src={logo}
              alt="bootstrapLogo"
              width="30"
              height="24"
              class="d-inline-block align-text-top"
            />
          </Link>
          <Link class="navbar-brand px-5" to="/">
            Profile
          </Link>
          <Link class="navbar-brand px-5" to="/addition">
            AdditonApp
          </Link>
          <Link class="navbar-brand px-5" to="/books">
           Books
          </Link>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
