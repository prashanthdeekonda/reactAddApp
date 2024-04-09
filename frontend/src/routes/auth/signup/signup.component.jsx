import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
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

    const registerURL = `${baseURL}api/auth/register`;
    axios
      .post(registerURL, { firstName, lastName, userName, email, password })
      .then((res) => {
        setLoading(false);
        const { data } = res;
        if (data?.userExists) {
          NotificationManager.error(data?.message, "Error!");
        } else {
          NotificationManager.success(data?.message, "Successful!", 2000);
          sessionStorage.clear();
          setTimeout(() => {
            navigate("/auth/login");
          }, 500);
        }
      })
      .catch((err) => {
        NotificationManager.error("Error Creating a user", "Error!");
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
        <h2 className="fw-normal mb-5 text-center">SignUp</h2>
        <Row>
          <Col>
            <Form id="signUp">
              <FormGroup className="mb-3 d-flex col-8">
                <FormLabel htmlFor="first-name" class="col-3">
                  First Name
                </FormLabel>
                <input
                  type="text"
                  className="form-control ms-4  col-3"
                  id="first-name"
                  name="firstname"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="mb-3 d-flex col-8">
                <FormLabel sm="2" htmlFor="last-name" class="col-3">
                  Lastname
                </FormLabel>
                <input
                  type="text"
                  className="form-control ms-4  col-3"
                  id="last-name"
                  name="last Name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>

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
                <FormLabel sm="2" htmlFor="email" class="col-3">
                  Email
                </FormLabel>
                <input
                  type="email"
                  className="form-control ms-4  col-3"
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
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
                Registered Already &nbsp;
                <Link style={{ color: "aliceblue" }} to="/auth/login">
                  sign in?
                </Link>
              </p>

              <Button
                type="button"
                className="btn-success mt-2 offset-md-3  text-center"
                id="login-btn"
                onClick={handleRegisterUser}
              >
                Register User
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
