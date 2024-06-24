import { Route, Router, Routes } from "react-router-dom";
import "./App.scss";
import Register from "./pages/auth-pages/register/Register";
import Dashboard from "./pages/dashboard-pages/dash-home/Dashboard";
import DashProfile from "./pages/dashboard-pages/dash-profile/DashProfile";
import DashAccountSettings from "./pages/dashboard-pages/dash-accountSettings/DashAccountSettings";
import SignIn from "./pages/auth-pages/login/SignIn";
import ResetPass from "./pages/auth-pages/forogt-password/ResetPass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        {/* AUTH-PAGES */}

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-pass" element={<ResetPass />} />

        {/* USER-DASHBOARD */}

        <Route path="/home" element={<Dashboard />} />
        <Route path="/profile" element={<DashProfile />} />
        <Route path="/account-settings" element={<DashAccountSettings />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
