import stack from "../../stack.jpg";

const Dashboard = () => {
  return (
    <div>
      <div
        class="container mt-5"
        style={{ textAlign: "center", width: "40rem", color: "white" }}
      >
        <h5> Dashboard</h5>
        <h6 className="mt-3">
          Welcome to my MERN (MongoDB, Express, React and Node) Application
        </h6>
        <img src={stack} alt="mern" width="800" height="300" />
      </div>
    </div>
  );
};

export default Dashboard;
