import { Col, Form, Row } from "react-bootstrap";

const User = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div>
      <div
        class="container mt-5"
        style={{ textAlign: "center", width: "40rem", color: "white" }}
      >
        <h5> User Information: </h5>

        <h6 className="mt-3">Logged in user:&nbsp;{user?.userName}</h6>
        <Form className="mt-3 text-white offset-md-4">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              First Name
            </Form.Label>
            <Col sm="5">
              <Form.Control
                className="text-white"
                plaintext
                readOnly
                defaultValue={user?.firstName}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Last Name
            </Form.Label>
            <Col sm="5">
              <Form.Control
                className="text-white"
                plaintext
                readOnly
                defaultValue={user?.lastName}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              User Name
            </Form.Label>
            <Col sm="5">
              <Form.Control
                className="text-white"
                plaintext
                readOnly
                defaultValue={user?.userName}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="5">
              <Form.Control
                className="text-white"
                plaintext
                readOnly
                defaultValue={user?.email}
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default User;
