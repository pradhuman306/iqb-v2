import React from "react";
import { Navigate } from "react-router";
import * as localStorage from "../common/localStorage";

function PrivateRoute({ children, auth }) {
  const token = localStorage.get("iqb_token")
    ? atob(localStorage.get("iqb_token"))
    : null;
  const logged_in_route = localStorage.get("logged_in_route")
    ? atob(localStorage.get("logged_in_route"))
    : "/signin";
  console.log("privateRoutein");
  return token ? children : <Navigate to={logged_in_route} />;
}
export default PrivateRoute;
