import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import Navbar from "../../../layouts/navbar/Navbar";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../../redux/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [seePass, setSeePass] = useState("false");
  const [seePass1, setSeePass1] = useState("false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Registered Successfully");
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  function handleSeePass() {
    setSeePass(!seePass);
  }
  function handleSeePass1() {
    setSeePass1(!seePass1);
  }

  return (
    <div>
      <Navbar />
      <div className="justify-center items-center flex pt-16">
        <div className="md:shadow-lg w-full  md:w-[500px] p-4 pb-16 rounded-2xl">
          <div className="flex justify-center gap-4 items-center pt-4  ">
            <Icon
              icon="uil:focus-target"
              style={{ color: "#f28b40", width: "40px", height: "40px" }}
            />
            <h2>Register</h2>
          </div>
          <div>
            <form
              action=""
              method="POST"
              onSubmit={registerUser}
              className="pt-9 flex justify-center items-center gap-4 flex-col w-full"
            >
              <div className="w-full flex items-start justify-center gap-1 flex-col">
                <label htmlFor=""> Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="auth-input"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="w-full flex items-start justify-center gap-1 flex-col">
                <label htmlFor=""> Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className=" w-full flex items-start justify-center gap-1 flex-col">
                <label htmlFor="">Confirm Password</label>
                <div className="auth-input flex items-center justify-between">
                  <input
                    type={seePass1 ? "text" : "password"}
                    placeholder="Confirm your password"
                    className=" bg-transparent outline-none border-0 text-[16px] tracking-[1.5px] w-full"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                  <Icon
                    icon={
                      seePass1 ? "fluent:eye-off-16-regular" : "iconoir:eye"
                    }
                    style={{ color: "white", height: "24px", width: "24" }}
                    onClick={handleSeePass1}
                  />
                </div>
              </div>
              <button
                className="bg-[#f28b40] w-fit p-2 flex items-center justify-center gap-1 font-medium rounded-md mt-4"
                type="submit"
              >
                <span>Register</span>
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

export default Register;
