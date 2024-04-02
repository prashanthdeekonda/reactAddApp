import { Col, Form, Row } from "react-bootstrap";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div
        class="container mt-5"
        style={{ textAlign: "center", width: "40rem" }}
      >
        <h5> Dashboard</h5>
        <h6 className="mt-3">
          Welcome to my MERN (MongoDB, Express, React and Node) Application
        </h6>
        <h6 className="mt-3">Logged in user:&nbsp;{user?.userName}</h6>
        <Form className="mt-3">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              First Name
            </Form.Label>
            <Col sm="5">
              <Form.Control plaintext readOnly defaultValue={user?.firstName} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Last Name
            </Form.Label>
            <Col sm="5">
              <Form.Control plaintext readOnly defaultValue={user?.lastName} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              User Name
            </Form.Label>
            <Col sm="5">
              <Form.Control plaintext readOnly defaultValue={user?.userName} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="5">
              <Form.Control plaintext readOnly defaultValue={user?.email} />
            </Col>
          </Form.Group>
        </Form>
        {/* </Container> */}
      </div>
    </div>
  );
};

export default Dashboard;
