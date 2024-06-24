import axios from "axios";

const user_id = JSON.parse(localStorage.getItem("user_id"));
const user_token = JSON.parse(localStorage.getItem("token"));

const REGISTER_URL = "http://localhost:8000/users/signup";
const LOGIN_URL = "http://localhost:8000/users/login";
const UPDATE_URL = `http://localhost:8000/users/update/${user_id}`;

const register = async (userData) => {
  const response = await axios.post(REGISTER_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user_id", JSON.stringify(response.data.user.id));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user_id", JSON.stringify(response.data.user.id));
  }
  return response.data;
};

const updateUser = async (userData) => {
  const response = await axios.put(UPDATE_URL, userData, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
  updateUser,
};

export default authService;
