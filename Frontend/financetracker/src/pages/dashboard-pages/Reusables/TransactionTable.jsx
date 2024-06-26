import { Icon } from "@iconify/react/dist/iconify.js";
import {
  reset,
  getATransaction,
  updateTransaction,
  deleteTransaction,
} from "../../../redux/transactions/TransactionSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import "../dash-home/Dashboard.scss";

const TransactionTable = ({ transactions = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactionsPerPage = 10;
  const dispatch = useDispatch();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setEditMode(true);
    setModal(true);
    console.log(modal);
  };

  const handleDelete = (transId) => {
    dispatch(deleteTransaction(transId));
    handleRefresh();
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(currentTransactions) &&
            currentTransactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {indexOfFirstTransaction + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.amount}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center justify-center gap-3">
                  <button
                    className="flex items-center justify-center bg-[#f28b40] rounded-md h-8 w-8 cursor-pointer"
                    onClick={() => handleUpdate(transaction)}
                  >
                    <Icon
                      icon="tabler:pencil"
                      style={{ color: "black", height: "20px", width: "20px" }}
                    />
                  </button>
                  <button
                    className="flex items-center justify-center bg-[#f28b40] rounded-md h-8 w-8 cursor-pointer"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Icon
                      icon="mdi:bin-outline"
                      style={{ color: "black", height: "20px", width: "20px" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {transactions.length > transactionsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#f28b40] text-white"
            }`}
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-[#f28b40] text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#f28b40] text-white"
            }`}
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}></div>
      )}
      <div className="absolute w-full flex items-end justify-center z-10">
        <div className="absolute w-full">
          {modal && (
            <TransactionModal
              arg={() => setModal(false)}
              editMode={editMode}
              transactionData={selectedTransaction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
