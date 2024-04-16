import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";
import Spinner from "../../../components/spinner/spinner.component";

import { Button, Col, Container, Row } from "react-bootstrap";

import Form from "react-bootstrap/Form";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const origin = window.location.origin;
  const baseURL = origin.includes("localhost")
    ? "http://localhost:5000/"
    : `${origin}/`;

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // reset form controls with no errors
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const FormFieldErrors = () => {
    const { userName, password } = form;

    const setErrors = {};

    if (!userName || userName === "") {
      setErrors.userName = "Username shouldn't be empty";
    }

    if (!password || password === "") {
      setErrors.password = "Password shouldn't be empty";
    }

    return setErrors;
  };

  const handleSignIn = (e) => {
    const errors = FormFieldErrors();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      e.preventDefault();
      setLoading(true);
      const loginURL = `${baseURL}api/auth/login`;
      const { userName, password } = form;
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
    }
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
    <div style={{ width: "50rem", margin: "0 auto", color: "white" }}>
      <>{spinnerContent}</>
      <Container className="my-5">
        <h2 className="fw-normal mb-5 text-center">Login</h2>
        <Row>
          <Col>
            <Form id="signUp">
              <Form.Group className="mb-3 d-flex col-8">
                <Form.Label htmlFor="username" class="col-3">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control ms-4  col-3"
                  id="username"
                  name="username"
                  onChange={(e) => setField("userName", e.target.value)}
                  isInvalid={!!errors.userName}
                />
                <Form.Control.Feedback type="invalid" className="col-6">
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 d-flex col-8">
                <Form.Label htmlFor="password" class="col-3">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  className="form-control ms-4  col-3"
                  id="password"
                  name="password"
                  onChange={(e) => setField("password", e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid" className="col-6">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <p className="mt-2 offset-md-3">
                New Here&nbsp;
                <Link style={{ color: "aqua" }} to="/auth/Signup">
                  Please SignUp?
                </Link>
              </p>

              <Button
                type="button"
                className="btn-success mt-2 offset-md-3  text-center"
                id="login-btn"
                onClick={handleSignIn}
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
