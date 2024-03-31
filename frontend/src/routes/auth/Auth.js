import React from "react";
import { Outlet } from "react-router-dom";
import AuthNav from "./auth-nav/auth-nav.component";

const Auth = () => {
  return (
    <>
      <AuthNav />
      <Outlet />
    </>
  );
};

export default Auth;
