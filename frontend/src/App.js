import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navigation from "./routes/navigation/navigation.component";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsUserAuthenticated = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated || isAuthenticated === "undefined") {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkIsUserAuthenticated();
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn && <Navigation />}
      <Outlet />
    </>
  );
}

export default App;
