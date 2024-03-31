import { useState } from "react";
import { Link } from "react-router-dom";
// React Notification
import { NotificationManager } from "react-notifications";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const registerUser = (e) => {
    if (!username) {
      NotificationManager.error("Username shouldn't be empty", "Error !");
      return;
    } else if (!email) {
      NotificationManager.error("Email shouldn't be empty", "Error !");
      return;
    } else if (!password) {
      NotificationManager.error("Password shouldn't be empty", "Error !");
      return;
    }
    e.preventDefault();
    // const postURL = `${baseURL}api/inventory`;
    console.log("signUp", { username, password, email });
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
          <h3 style={{ textAlign: "center" }}>Sign Up</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div> */}
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={registerUser}
            >
              Sign Up
            </button>
          </div>
          <p className="mt-2">
            Registered Already &nbsp;
            <Link to="/login">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
