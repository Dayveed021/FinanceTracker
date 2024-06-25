import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import Register from "./pages/auth-pages/register/Register";
import Dashboard from "./pages/dashboard-pages/dash-home/Dashboard";
import DashProfile from "./pages/dashboard-pages/dash-profile/DashProfile";
import DashAccountSettings from "./pages/dashboard-pages/dash-accountSettings/DashAccountSettings";
import SignIn from "./pages/auth-pages/login/SignIn";
import ResetPass from "./pages/auth-pages/forogt-password/ResetPass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthRedirect } from "./AuthRedirect";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        {/* AUTH-PAGES */}
        <Route
          path="/login"
          element={
            <AuthRedirect notLoggedIn>
              <SignIn />
            </AuthRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirect notLoggedIn>
              <Register />
            </AuthRedirect>
          }
        />
        <Route
          path="/reset-pass"
          element={
            <AuthRedirect notLoggedIn>
              <ResetPass />
            </AuthRedirect>
          }
        />

        {/* USER-DASHBOARD */}
        <Route
          path="/home"
          element={
            <AuthRedirect loggedIn>
              <Dashboard />
            </AuthRedirect>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthRedirect loggedIn>
              <DashProfile />
            </AuthRedirect>
          }
        />
        <Route
          path="/account-settings"
          element={
            <AuthRedirect loggedIn>
              <DashAccountSettings />
            </AuthRedirect>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
