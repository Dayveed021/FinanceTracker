import axios from "axios";

const TRANSAC_API = "http://localhost:8000/transactions/";
const GET_A_TRANSAC = "http://localhost:8000/transactions/1/";

const create_trans = async (transData) => {
  const user_token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.post(TRANSAC_API, transData, {
    headers: {
      Authorization: `Token ${user_token}`,
    },
  });
  return response.data;
};

const getall_trans = async () => {
  const user_token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.get(TRANSAC_API, {
    headers: {
      Authorization: `Token ${user_token}`,
    },
  });
  return response.data;
};

const geta_trans = axios.create({
  baseURL: "http://localhost:8000/",
});

const updatea_trans = async (transId, transData) => {
  const user_token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.put(`${TRANSAC_API}${transId}/`, transData, {
    headers: {
      Authorization: `Token ${user_token}`,
    },
  });
  return response.data;
};

const delete_trans = async (transId) => {
  const user_token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.delete(`${TRANSAC_API}${transId}/`, {
    headers: {
      Authorization: `Token ${user_token}`,
    },
  });
  return response.data;
};

const transactionService = {
  create_trans,
  getall_trans,
  geta_trans,
  updatea_trans,
  delete_trans,
};

export default transactionService;
