import React from "react";
import DashboardLayout from "../DashboardLayout";

const DashAccountSettings = () => {
  return (
    <div>
      <DashboardLayout content={<Content />} />
    </div>
  );
};

export default DashAccountSettings;

const Content = () => {
  return (
    <div className="text-white">
      <p>Account Settings</p>
    </div>
  );
};
