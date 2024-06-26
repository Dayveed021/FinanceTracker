import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  reset,
  createTransaction,
  updateTransaction,
} from "../../../redux/transactions/TransactionSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TransactionModal = ({ arg, editMode = false, transactionData = {} }) => {
  const [amount, setAmount] = useState(
    transactionData ? transactionData.amount : ""
  );
  const [type, setType] = useState(transactionData ? transactionData.type : "");
  const [category, setCategory] = useState(
    transactionData ? transactionData.category : ""
  );
  const [description, setDescription] = useState(
    transactionData ? transactionData.description : ""
  );
  const [date, setDate] = useState(transactionData ? transactionData.date : "");

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.transac
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(editMode ? "Transaction Updated" : "Transaction Added");
      arg();
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch, arg, editMode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transData = {
      amount,
      type,
      category,
      description,
      date,
    };

    const transId = transactionData.id;

    if (editMode) {
      // Ensure the ID is included for updates
      dispatch(updateTransaction(transId, transData));
    } else {
      dispatch(createTransaction(transData));
    }
    // handleRefresh();
  };

  return (
    <div className="justify-center items-center flex pt-32">
      <div className="md:shadow-lg w-full md:w-[500px] p-4 pb-10 rounded-2xl bg-white">
        <div className="w-full flex items-center justify-between">
          <div className="flex justify-center gap-4 items-center pt-4">
            <Icon
              icon="uil:focus-target"
              style={{ color: "black", width: "40px", height: "40px" }}
            />
            <h2 className="text-black">
              {editMode ? "Edit Transaction" : "Add Transaction"}
            </h2>
          </div>
          <Icon
            icon="iconoir:cancel"
            style={{ color: "black", width: "25px", height: "25px" }}
            className="mt-5 cursor-pointer"
            onClick={arg}
          />
        </div>
        <div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="pt-9 flex justify-center items-center gap-4 flex-col w-full text-black"
          >
            <div className="w-full flex items-start justify-center gap-1 flex-col">
              <label htmlFor=""> Amount</label>
              <input
                type="text"
                placeholder="Enter amount of transaction"
                className="auth-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="w-full flex items-start justify-center gap-1 flex-col">
              <label htmlFor=""> Type</label>
              <select
                className="auth-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>
                  Select the type of transaction
                </option>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
            <div className="w-full flex items-start justify-center gap-1 flex-col">
              <label htmlFor=""> Category</label>
              <select
                className="auth-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select the type of transaction
                </option>
                <option value="Income">Income</option>
                <option value="Investment">Investment</option>
                <option value="LifeStyle">LifeStyle</option>
                <option value="Savings">Savings</option>
                <option value="Gift">Gift</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div className="w-full flex items-start justify-center gap-1 flex-col">
              <label htmlFor=""> Date</label>
              <input
                type="date"
                placeholder="Date of transaction"
                className="auth-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className=" w-full flex items-start justify-center gap-1 flex-col">
              <label htmlFor=""> Description</label>
              <input
                type="text"
                placeholder="Describe this transaction"
                className="auth-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="bg-[#f28b40] w-fit p-2 flex items-center justify-center gap-1 font-medium rounded-md mt-4"
              type="submit"
            >
              <span>
                {editMode ? "Update transaction" : "Create transaction"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
