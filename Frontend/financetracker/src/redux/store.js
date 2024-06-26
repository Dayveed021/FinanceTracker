import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import transactionReducer from "./transactions/TransactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transac: transactionReducer,
  },
});
