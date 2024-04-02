import React from "react";
import { Outlet } from "react-router-dom";
import AuthNav from "./auth-nav/auth-nav.component";
import Footer from "./footer/footer.component";

const Auth = () => {
  return (
    <>
      <AuthNav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Auth;
