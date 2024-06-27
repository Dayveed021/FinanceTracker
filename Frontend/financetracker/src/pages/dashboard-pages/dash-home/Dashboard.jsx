import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector, useDispatch } from "react-redux";
import { getAllTransaction } from "../../../redux/transactions/TransactionSlice";
import TransactionModal from "../Reusables/TransactionModal";
import "./Dashboard.scss";
import TransactionTable from "../Reusables/TransactionTable";
import Charts from "../Reusables/Charts";

const Dashboard = () => {
  return (
    <div>
      <DashboardLayout content={<Content />} />
    </div>
  );
};

export default Dashboard;

const Content = () => {
  const user = useSelector((state) => state.auth.user);

  const [modal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  function handleModal() {
    setModal(!modal);
    setEditMode(false);
    setSelectedTransaction(null);
  }

  const dispatch = useDispatch();

  const data = useSelector((state) => state.transac.data) || [];

  useEffect(() => {
    dispatch(getAllTransaction());
  }, [dispatch]);

  const username = user?.user?.username
    ? user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)
    : "Guest";

  return (
    <div className="text-white relative">
      <div className="flex justify-center w-full items-start flex-col">
        <div className="flex justify-between w-full">
          <div className="flex items-start justify-center gap-2 flex-col">
            <h2>Welcome {username},</h2>
            <span className="w-[90%]">
              You can see an overview of all your expenses below:
            </span>
          </div>
          <div>
            <button
              className="bg-[#f28b40] w-fit p-2 flex items-center justify-center gap-1 font-medium rounded-md cursor-pointer text-black"
              onClick={handleModal}
            >
              <span className=" sm:block hidden">Add Transaction</span>
              <Icon
                icon="mdi:plus"
                style={{ color: "black" }}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
        <div className="w-full pt-10 flex items-center justify-center flex-col gap-10">
          <div className="w-full">
            <Charts transactions={data} />
          </div>
          <div className="w-full overflow-auto">
            <TransactionTable transactions={data} />
          </div>
        </div>
      </div>
      {modal && <div className="modal-overlay"></div>}
      <div className="fixed w-full left-0 flex items-start justify-center z-10 top-0">
        <div className="absolute w-full">
          {modal && (
            <TransactionModal
              arg={handleModal}
              editMode={editMode}
              transactionData={selectedTransaction}
            />
          )}
        </div>
      </div>
    </div>
  );
};
