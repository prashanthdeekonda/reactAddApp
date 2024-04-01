import { useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { state } = useLocation();
  const data = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(data);

  return (
    <div>
      <div class="container mt-5" style={{ textAlign: "center" }}>
        <h5>
          Dashboard- Welcome to my MERN (MongoDB, Express, React and Node)
          Application
        </h5>
        <h6>Logged In user Information</h6>
        <p>Username: {user?.userName}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
