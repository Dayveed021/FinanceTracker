import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { reset, login } from "../../../redux/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [seePass, setSeePass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoginSuccess, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isLoginSuccess) {
      toast.success("Logged in Successfully");
      navigate("/home");
      dispatch(reset());
    }
    dispatch(reset());
  }, [user, isError, isLoginSuccess, message, navigate, dispatch]);

  const LogUser = (e) => {
    e.preventDefault();

    const userData = {
      username: username.toLowerCase(),
      password,
    };
    dispatch(login(userData));
  };

  function handleSeePass() {
    setSeePass(!seePass);
  }

  return (
    <div>
      <Navbar />
      <div className="justify-center items-center flex pt-16 md:pt-32">
        <div className="md:shadow-lg w-full  md:w-[500px] p-4 pb-20 rounded-2xl">
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
              method="POST"
              onSubmit={LogUser}
              className="pt-9 flex justify-center items-center gap-4 flex-col w-full"
            >
              <div className="w-full flex items-start justify-center gap-1 flex-col">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="auth-input"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className=" w-full flex items-start justify-center gap-1 flex-col">
                <label htmlFor=""> Password</label>
                <div className="auth-input flex items-center justify-between">
                  <input
                    type={seePass ? "text" : "password"}
                    placeholder="Enter your password"
                    className=" bg-transparent outline-none border-0 text-[16px] tracking-[1.5px] w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Icon
                    icon={seePass ? "fluent:eye-off-16-regular" : "iconoir:eye"}
                    style={{ color: "white", height: "24px", width: "24" }}
                    onClick={handleSeePass}
                  />
                </div>
              </div>
              <span className="w-full flex items-center justify-end mt-[-10px]">
                <Link to="/reset-pass" className="link text-[#f28b40]">
                  Forgot Password?
                </Link>
              </span>
              <button
                className="bg-[#f28b40] w-fit p-2 flex items-center justify-center gap-1 font-medium rounded-md mt-4"
                type="submit"
              >
                <span>Login</span>
                <Icon
                  icon={isLoading ? "eos-icons:loading" : ""}
                  style={{ color: "black" }}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
