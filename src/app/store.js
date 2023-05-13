import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./Transactions.duck";

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
