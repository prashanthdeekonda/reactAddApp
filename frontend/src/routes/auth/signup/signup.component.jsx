import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";
import Spinner from "../../../components/spinner/spinner.component";
import { Button, Col, Container, Row } from "react-bootstrap";

import Form from "react-bootstrap/Form";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

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
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      reEnteredPassword,
    } = form;

    const setErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;

    if (!firstName || firstName === "") {
      setErrors.firstName = "First name is required!";
    }

    if (!lastName || lastName === "") {
      setErrors.lastName = "Last name is required!";
    }

    if (!userName || userName === "") {
      setErrors.userName = "User name is required!";
    } else if (userName.length < 8 || userName.length > 16) {
      setErrors.userName = "Username should be between 8 and 16 chars!";
    }

    if (!email || email === "") {
      setErrors.email = "email is required!";
    } else if (!emailRegex.test(email)) {
      setErrors.email = "Invalid - Email should match the pattern";
    }

    if (!password || password === "") {
      setErrors.password = "Password is required!";
    } else if (!passwordRegex.test(password)) {
      setErrors.password =
        "Password be min of 8 chars, atleast 1 letter, number & special character!";
    }

    if (!reEnteredPassword || reEnteredPassword === "") {
      setErrors.reEnteredPassword = "Re Enter Password is required!";
    }

    if (reEnteredPassword !== password) {
      setErrors.reEnteredPassword = "Passwords should match!";
    }

    return setErrors;
  };

  const handleRegisterUser = (e) => {
    const errors = FormFieldErrors();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      e.preventDefault();
      setLoading(true);

      const { firstName, lastName, userName, email, password } = form;

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
        <h2 className="fw-normal mb-5 text-center">SignUp</h2>
        <Row>
          <Col>
            <Form id="signUp">
              <Form.Group className="mb-3 d-flex col-8">
                <Form.Label htmlFor="first-name" class="col-3">
                  First Name
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control ms-4  col-3"
                  onChange={(e) => setField("firstName", e.target.value)}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid" className="col-6">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 d-flex col-8">
                <Form.Label sm="2" htmlFor="last-name" class="col-3">
                  Lastname
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control ms-4  col-3"
                  id="last-name"
                  name="last Name"
                  onChange={(e) => setField("lastName", e.target.value)}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid" className="col-6">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

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
                <Form.Label sm="2" htmlFor="email" class="col-3">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  className="form-control ms-4  col-3"
                  id="email"
                  name="email"
                  onChange={(e) => setField("email", e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" className="col-6">
                  {errors.email}
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

              <Form.Group className="mb-3 d-flex col-8">
                <Form.Label htmlFor="password" class="col-3">
                  Re-enter Password
                </Form.Label>
                <Form.Control
                  type="password"
                  className="form-control ms-4  col-3"
                  id="re-password"
                  name="password"
                  onChange={(e) =>
                    setField("reEnteredPassword", e.target.value)
                  }
                  isInvalid={!!errors.reEnteredPassword}
                />
                <Form.Control.Feedback type="invalid" className="col-6">
                  {errors.reEnteredPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <p className="mt-2 offset-md-3">
                Registered Already &nbsp;
                <Link style={{ color: "aqua" }} to="/auth/login">
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
