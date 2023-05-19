import { createSlice } from "@reduxjs/toolkit";
import { localStorage } from "../pages/View-All-Transactions/localstorage";

const initialState = { value: [] };
export const transactionSlice = createSlice({
  name: "Transactions",
  initialState,
  reducers: {
    makeTransactions: (state, action) => {
      state.value.push(action.payload);
    },

    editTransactions: (state, action) => {
      const { index, data } = action.payload;
      console.log("inside the edit redux", { index }, { data });

      const getIndex = state.value.findIndex((newIndex) => {
        return newIndex.id === index;
      });

      let newObject = state.value;

      newObject[getIndex] = data;

      console.log("get index", getIndex, "data", data);

      // return {
      //   ...state,
      //   value: newObject,
      // };
    },

    deleteTransactions: (state, action) => {
      //console.log("state of delete data", current(state));
      const deleteData = state.value.filter((data) => {
        return data.id !== Number(action.payload);
      });

      state.value = deleteData;
      console.log("deleted");
    },
  },
});

export const { makeTransactions, editTransactions, deleteTransactions } =
  transactionSlice.actions;

export default transactionSlice.reducer;
