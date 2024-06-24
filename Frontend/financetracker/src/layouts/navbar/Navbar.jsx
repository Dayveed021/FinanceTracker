import React from "react";
import "./Navbar.scss";
import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full text-black bg-gray-600">
      <div className=" flex items-center justify-between w-full p-8">
        <div className="flex items-center justify-center gap-2 ">
          <h1 className=" logo font-semibold text-[25px] text-[#f28b40]">
            FINANCE TRACKER{" "}
          </h1>
          <Icon
            icon="uil:focus-target"
            style={{ color: "#f28b40", width: "30px", height: "30px" }}
          />
        </div>
        <div>
          <ul className=" flex items-center justify-center gap-7 text-white text-[16px]">
            <Link to="/login" className=" no-underline text-white list-none">
              <li>Login</li>
            </Link>
            <Link to="/register" className=" no-underline text-white list-none">
              <li>Register</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
