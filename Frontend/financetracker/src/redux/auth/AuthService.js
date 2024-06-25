import axios from "axios";

const REGISTER_URL = "http://localhost:8000/users/signup";
const LOGIN_URL = "http://localhost:8000/users/login";
const UPDATE_URL = (user_id) => `http://localhost:8000/users/update/${user_id}`;

const register = async (userData) => {
  const response = await axios.post(REGISTER_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user_id", JSON.stringify(response.data.user.id));
  }
  return { user: response.data.user, token: response.data.token };
};

const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user_id", JSON.stringify(response.data.user.id));
  }
  return { user: response.data.user, token: response.data.token };
};

const updateUser = async (userData) => {
  const user_id = JSON.parse(localStorage.getItem("user_id"));
  const user_token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.patch(UPDATE_URL(user_id), userData, {
    headers: {
      Authorization: `Token ${user_token}`,
    },
  });

  if (response.data) {
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user")),
      user: response.data,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
  return { user: response.data };
};

//logout user
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("user_id");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
  updateUser,
};

export default authService;
