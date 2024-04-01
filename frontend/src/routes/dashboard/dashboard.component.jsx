
const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div class="container mt-5" style={{ textAlign: "center" }}>
        <h5> Dashboard</h5>
        <h6>
          Welcome to my MERN (MongoDB, Express, React and Node) Application
        </h6>
        <h6>Logged in user:&nbsp;{user?.userName}</h6>
        <p>Username: {user?.userName}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
