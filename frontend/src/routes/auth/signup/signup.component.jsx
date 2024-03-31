import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";
import Spinner from "../../../components/spinner/spinner.component";

const SignUp = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const host = window.location.host;
  const baseURL = host.includes("localhost")
    ? "http://localhost:5000/"
    : `http://${host}/`;

  const handleRegisterUser = (e) => {
    if (!userName) {
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
    setLoading(true);
    // const postURL = `${baseURL}api/inventory`;
    console.log("signUp", { userName, password, email });

    const registerURL = `${baseURL}api/auth/register`;
    axios
      .post(registerURL, { userName, email, password })
      .then((res) => {
        setLoading(false);
        const { data } = res;
        console.log(data);
        if (data?.userExists) {
          NotificationManager.error(data?.message, "Error!");
        } else {
          NotificationManager.success(data?.message, "Successful!", 2000);
          localStorage.clear();
          setTimeout(() => {
            navigate("/auth/login");
          }, 500);
        }
      })
      .catch((err) => {
        NotificationManager.error("Error Creating a user", "Error!");
        console.log(err);
        setLoading(false);
      });
  };

  let spinnerContent;

  if (loading) {
    spinnerContent = (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <>{spinnerContent}</>
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
              onChange={(e) => setUserName(e.target.value)}
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
              onClick={(e) => handleRegisterUser(e)}
            >
              Sign Up
            </button>
          </div>
          <p className="mt-2">
            Registered Already &nbsp;
            <Link to="/auth/login">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
