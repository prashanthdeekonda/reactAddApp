import { Link } from "react-router-dom";
import { useState } from "react";
// React Notification
import { NotificationManager } from "react-notifications";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const signIn = (e) => {
    if (!username) {
      NotificationManager.error("Username shouldn't be empty", "Error !");
      return;
    } else if (!password) {
      NotificationManager.error("Password shouldn't be empty", "Error !");
      return;
    }
    e.preventDefault();
    console.log('signIn', {username, password})
    // const postURL = `${baseURL}api/inventory`;
  };

  return (
    <div>
      <div
        class="container mt-5"
        style={{
          width: "42rem",
          padding: "2rem",
          border: "2px solid lightgray",
          borderRadius: "5px",
        }}
      >
        <form noValidate>
          {/* <h1> Welcome to my React Application</h1>
          <span>You can view my profile, addition, books and inventory </span> */}
          <h3 style={{ textAlign: "center" }}>Sign In</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div> */}
          <div className="d-grid">
            <button type="button" className="btn btn-primary" onClick={signIn}>
              Submit
            </button>
          </div>
          <p className="mt-3">
            New Here&nbsp;
            <Link to="/signup">Please SignUp?</Link>
            {/* <a href="/signup"></a> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
