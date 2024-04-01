import { Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../bootstrap-logo.png";

const Navigation = () => {
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

          <Link class="navbar-brand px-5" to="/">
            Dashboard
          </Link>
          <Link class="navbar-brand px-5" to="/profile">
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
        </div>
      </nav>
    </Fragment>
  );
};

export default Navigation;
