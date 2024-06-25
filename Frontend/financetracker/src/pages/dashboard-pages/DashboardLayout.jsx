import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./DashboardLayout.scss";
import { logout } from "../../redux/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardLayout = ({ content }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div className=" w-full p-3 flex items-start justify-center gap-5 flex-col">
      <header className=" w-full flex items-center justify-center gap-8">
        <div className="flex items-center justify-center p-3 w-fit rounded-xl shadow-[#f28b40] shadow-sm ml-10 bg-gray-600">
          <Icon
            icon="uil:focus-target"
            style={{ color: "#f28b40", width: "40px", height: "40px" }}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-20 h-20  shadow-[#f28b40] shadow-sm rounded-xl pr-10 border-t border-t-[#f28b40] bg-gray-600">
          <p></p>
          <div className="md:w-[90%] sm:w-[50%] hidden  sm:flex items-center justify-center">
            <input
              type="text"
              placeholder="Search transactions"
              className="lg:w-[45%] w-full text-[14px] tracking-[1.2px]"
            />
          </div>
          <div className="flex items-center justify-center rounded-full bg-black h-10 w-10 text-white">
            {user?.user.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>
      <div className=" w-full flex items-start justify-center gap-5">
        <div className="flex item-start justify-between shadow-[#f28b40] shadow-sm w-[250px] rounded-xl h-[84vh] bg-gray-600 flex-col">
          <ul className=" w-full pt-10 flex item-start justify-start flex-col list-none gap-4 p-3">
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "not-active")}
            >
              <li className=" text-left w-full text-white  flex item-center justify-start gap-2 p-2">
                <Icon icon="iconoir:home" style={{ color: "white" }} />
                <span> Home</span>
              </li>
            </NavLink>
            <NavLink to="/profile" className="link">
              <li className=" text-left w-full text-white  flex item-center justify-start gap-2 p-2">
                <Icon icon="hugeicons:profile-02" style={{ color: "white" }} />

                <span>Profile</span>
              </li>
            </NavLink>
            <NavLink to="/account-settings" className="link">
              <li className=" text-left w-full text-white  flex item-center justify-start gap-2 p-2">
                <Icon icon="mdi:account-cash" style={{ color: "white" }} />
                <span>Account Settings</span>
              </li>
            </NavLink>
          </ul>
          <div
            className="flex items-center justify-start gap-2 pb-5 pl-3 cursor-pointer w-fit"
            onClick={logOut}
          >
            <Icon icon="solar:logout-2-bold" style={{ color: "white" }} />
            <span className="text-white">Logout</span>
          </div>
        </div>
        <div className="w-full h-[84vh]  shadow-[#f28b40] shadow-sm rounded-xl  bg-gray-600 p-5">
          {content}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
