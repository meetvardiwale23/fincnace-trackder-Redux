import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./Transactions.duck";
import userAuthReducer from "./userAuth.Duck";

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    userRegisterAuth: userAuthReducer,
  },
});
