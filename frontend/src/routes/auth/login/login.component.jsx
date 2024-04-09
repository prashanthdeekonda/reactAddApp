import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";
import Spinner from "../../../components/spinner/spinner.component";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

const Login = () => {
  const [userName, setUserName] = useState();
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
    setLoading(true);
    const loginURL = `${baseURL}api/auth/login`;
    axios
      .post(loginURL, { userName, password })
      .then((res) => {
        setLoading(false);
        const { data } = res;
        if (data?.userExists) {
          NotificationManager.error(data?.message, "Error!");
        } else if (!data?.passwordMatch) {
          NotificationManager.error(data?.message, "Error!");
        } else if (data?.passwordMatch) {
          NotificationManager.success(data?.message, "Successful!", 2000);
          const isAuthenticated = data.passwordMatch;
          sessionStorage.clear();
          sessionStorage.setItem("isAuthenticated", isAuthenticated);
          sessionStorage.setItem("user", JSON.stringify(data.user));
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
    <div style={{ width: "50rem", margin: "0 auto" }}>
      <>{spinnerContent}</>
      <Container className="my-5">
        <h2 className="fw-normal mb-5 text-center">Login</h2>
        <Row>
          <Col>
            <Form id="signUp" onSubmit={handleSignIn}>
              <FormGroup className="mb-3 d-flex col-8">
                <FormLabel htmlFor="username" class="col-3">
                  Username
                </FormLabel>
                <input
                  type="text"
                  className="form-control ms-4  col-3"
                  id="username"
                  name="username"
                  required
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="mb-3 d-flex col-8">
                <FormLabel htmlFor="password" class="col-3">
                  Password
                </FormLabel>
                <input
                  type="password"
                  className="form-control ms-4  col-3"
                  id="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <p className="mt-2 offset-md-3">
                New Here&nbsp;
                <Link style={{ color: "aliceblue" }} to="/auth/Signup">
                  Please SignUp?
                </Link>
              </p>

              <Button
                type="submit"
                className="btn-success mt-2 offset-md-3  text-center"
                id="login-btn"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
