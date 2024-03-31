import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";
import Spinner from "../../../components/spinner/spinner.component";

const Login = () => {
  const [userName, setuserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const host = window.location.host;
  const baseURL = host.includes("localhost")
    ? "http://localhost:5000/"
    : `http://${host}/`;

  const handleSignIn = (e) => {
    if (!userName) {
      NotificationManager.error("Username shouldn't be empty", "Error !");
      return;
    } else if (!password) {
      NotificationManager.error("Password shouldn't be empty", "Error !");
      return;
    }
    e.preventDefault();
    console.log("signIn", { userName, password });
    // const postURL = `${baseURL}api/inventory`;
    setLoading(true);
    const loginURL = `${baseURL}api/auth/login`;
    axios
      .post(loginURL, { userName, password })
      .then((res) => {
        setLoading(false);
        console.log(res);
        const { data } = res;
        console.log(data);
        if (data?.userExists) {
          NotificationManager.error(data?.message, "Error!");
        } else if (!data?.passwordMatch) {
          NotificationManager.error(data?.message, "Error!");
        } else if (data?.passwordMatch) {
          NotificationManager.success(data?.message, "Successful!", 2000);
          const isAuthenticated = data.passwordMatch;
          localStorage.clear();
          localStorage.setItem("isAuthenticated", isAuthenticated);
          localStorage.setItem("user", JSON.stringify(data.user));
          setTimeout(() => {
            navigate("/", { state: data.user });
          }, 500);
        }
      })
      .catch((err) => {
        NotificationManager.error(
          "Error logging into the application",
          "Error!"
        );
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
          {/* <h1> Welcome to my React Application</h1>
          <span>You can view my profile, addition, books and inventory </span> */}
          <h3 style={{ textAlign: "center" }}>Sign In</h3>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setuserName(e.target.value)}
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
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => handleSignIn(e)}
            >
              Submit
            </button>
          </div>
          <p className="mt-3">
            New Here&nbsp;
            <Link to="/auth/signup">Please SignUp?</Link>
            {/* <a href="/signup"></a> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
