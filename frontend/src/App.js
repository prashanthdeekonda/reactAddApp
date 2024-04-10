import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Navigation from "./routes/navigation/navigation.component";
import Footer from "./routes/auth/footer/footer.component";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIsUserAuthenticated = () => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated || isAuthenticated === "undefined") {
      setIsLoggedIn(false);
      sessionStorage.clear();
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
      <Footer />
    </>
  );
}

export default App;
