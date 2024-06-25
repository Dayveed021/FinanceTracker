import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reset, updateUser } from "../../../redux/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const DashProfile = () => {
  return (
    <div>
      <DashboardLayout content={<Content />} />
    </div>
  );
};

export default DashProfile;

const Content = () => {
  const { isLoading, isError, isUpdateSuccess, message } = useSelector(
    (state) => state.auth
  );
  const user = useSelector((state) => state.auth.user);

  const [username, setUserName] = useState(user?.user?.username || "");
  const [email, setEmail] = useState(user?.user?.email || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isUpdateSuccess) {
      toast.success("Profile Updated");
      navigate("/home");
    }
    dispatch(reset());
  }, [isError, isUpdateSuccess, message, navigate, dispatch]);

  const UpdateUser = (e) => {
    e.preventDefault();

    const userData = {
      email,
      username,
    };

    dispatch(updateUser(userData));
  };

  return (
    <div className="text-white w-full flex justify-center items-center h-full">
      <div className="shadow-lg w-[500px] p-4 pb-20 rounded-2xl bg-white">
        <div className="flex justify-center gap-4 items-center pt-4">
          <Icon
            icon="uil:focus-target"
            style={{ color: "black", width: "40px", height: "40px" }}
          />
          <h2 className="text-black">Profile</h2>
        </div>
        <div>
          <form
            action=""
            onSubmit={UpdateUser}
            className="pt-9 flex justify-center items-center gap-4 flex-col w-full text-black"
          >
            <div className="w-full flex items-start justify-center gap-1 flex-col">
              <label htmlFor="">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="auth-input"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="w-full flex items-start justify-center gap-1 flex-col">
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="bg-[#f28b40] w-fit p-2 flex items-center justify-center gap-1 font-medium rounded-md mt-4"
              type="submit"
            >
              <span>Update Profile</span>
              <Icon
                icon={isLoading ? "eos-icons:loading" : ""}
                style={{ color: "black" }}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
