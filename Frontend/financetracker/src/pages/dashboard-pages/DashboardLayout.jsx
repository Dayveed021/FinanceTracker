import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./DashboardLayout.scss";
import { logout } from "../../redux/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardLayout = ({ content }) => {
  const [toggle, setToggle] = useState(true);

  function toggleMenu() {
    setToggle(!toggle);
  }
  useEffect(() => {
    if (window.innerWidth < 810) {
      setToggle(false);
    }
  }, []);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div className=" w-full p-3 flex items-start justify-center gap-5 flex-col">
      <header className=" w-full flex items-center justify-center sm:gap-8 gap-4">
        <div
          className="flex items-center justify-center p-3 w-fit rounded-xl shadow-[#f28b40] shadow-sm md:ml-10 bg-gray-600 cursor-pointer"
          onClick={toggleMenu}
        >
          <Icon
            icon="uil:focus-target"
            style={{ color: "#f28b40", width: "40px", height: "40px" }}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-20 sm:h-20 h-16  shadow-[#f28b40] shadow-sm rounded-xl sm:pr-10 pr-4 border-t border-t-[#f28b40] bg-gray-600">
          <p></p>
          <div className="md:w-[90%] sm:w-[50%] hidden  sm:flex items-center justify-center">
            <input
              type="text"
              placeholder="Search transactions with categories"
              className="lg:w-[45%] w-full text-[14px] tracking-[1.2px]"
            />
          </div>
          <div className="flex items-center justify-center rounded-full bg-black h-10 w-10 text-white">
            {user?.user.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>
      <div className=" w-full flex items-start justify-center gap-5 relative h-[75vh] lg:h-[84vh] overflow-hidden">
        <div
          className={` flex item-start justify-between shadow-[#f28b40] shadow-sm w-[250px] md:bg-gray-600 rounded-xl flex-col h-full ${
            toggle ? "sidebar" : " hidden"
          }`}
        >
          <ul className=" w-full pt-10 flex item-start justify-start flex-col list-none gap-4 p-3 h-full">
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
        <div className="w-full h-full lg:h-[84vh]  shadow-[#f28b40] shadow-sm rounded-xl  bg-gray-600 p-5 overflow-auto">
          {content}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
