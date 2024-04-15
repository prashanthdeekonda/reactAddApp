import { Card, ListGroup } from "react-bootstrap";

const User = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <div>
      <div
        class="container mt-5"
        style={{ textAlign: "center", width: "45rem", color: "white" }}
      >
        <h5> User Information: </h5>
        <Card>
          <Card.Header> Logged in user:&nbsp;{user?.userName}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>First Name:&nbsp;{user?.firstName}</ListGroup.Item>
            <ListGroup.Item>Last Name:&nbsp;{user?.lastName}</ListGroup.Item>
            <ListGroup.Item>User Name:&nbsp;{user?.userName}</ListGroup.Item>
            <ListGroup.Item>User Emails:&nbsp;{user?.email}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default User;
