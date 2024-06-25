import React from "react";
import DashboardLayout from "../DashboardLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";

const Dashboard = () => {
  return (
    <div>
      <DashboardLayout content={<Content />} />
    </div>
  );
};

export default Dashboard;

const Content = () => {
  const user = useSelector((state) => state.auth.user);

  const username = user?.user?.username
    ? user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)
    : "Guest";

  return (
    <div className="text-white">
      <div className="flex justify-between w-full">
        <div className="flex items-start justify-center gap-2 flex-col">
          <h2>Welcome {username},</h2>
          <span>You can see an overview of all your expenses below:</span>
        </div>
        <div>
          <button className="bg-[#f28b40] w-fit p-2 flex items-center justify-center gap-1 font-medium rounded-md">
            <span>Add Transaction</span>
            <Icon icon="mdi:plus" style={{ color: "black" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
