import { Fragment } from "react";
import { Link } from "react-router-dom";

import logo from "../../../bootstrap-logo.png";

const AuthNav = () => {
  return (
    <Fragment>
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
          <h4> &nbsp;React Authentication</h4>
        </div>
      </nav>
    </Fragment>
  );
};

export default AuthNav;
