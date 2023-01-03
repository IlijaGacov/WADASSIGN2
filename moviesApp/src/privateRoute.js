import React, { useContext} from "react";
import { Route, Redirect, Navigate } from "react-router-dom";
import {AuthContext} from './contexts/authContext'

function PrivateRoute({ children }) {
  const context = useContext(AuthContext)
  // Destructure props from <privateRoute> 

  return context.isAuthenticated === true ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default PrivateRoute;