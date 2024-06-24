import React from "react";
import Navbar from "../../../layouts/navbar/Navbar";
import { Icon } from "@iconify/react/dist/iconify.js";

const ResetPass = () => {
  return (
    <div>
      <Navbar />
      <div className="justify-center items-center flex pt-32">
        <div className="shadow-lg  w-[500px] p-4 pb-20 rounded-2xl">
          <div className="flex justify-center gap-4 items-center pt-4  ">
            <Icon
              icon="uil:focus-target"
              style={{ color: "black", width: "40px", height: "40px" }}
            />
            <h2>Login</h2>
          </div>
          <div>
            <form
              action=""
              className="pt-9 flex justify-center items-center gap-4 flex-col w-full"
            >
              <div className="w-full flex items-start justify-center gap-1 flex-col">
                <label htmlFor=""> Username</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="auth-input"
                />
              </div>
              <div className=" w-full flex items-start justify-center gap-1 flex-col">
                <label htmlFor=""> Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="auth-input"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
