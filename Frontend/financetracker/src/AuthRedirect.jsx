import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthRedirect = ({ loggedIn, notLoggedIn, children }) => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedIn && !user) {
      toast("You're not logged in");
    } else if (notLoggedIn && user) {
      toast("You're already logged in");
    }
  }, [loggedIn, notLoggedIn, user]);

  if (loggedIn && !user) {
    return <Navigate to="/login" />;
  } else if (notLoggedIn && user) {
    return <Navigate to="/home" />;
  }
  return children;
};
