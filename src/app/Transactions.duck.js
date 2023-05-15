import { createSlice, current } from "@reduxjs/toolkit";
import { localStorage } from "../pages/View-All-Transactions/localstorage";

const initialState = { value: [] };
export const transactionSlice = createSlice({
  name: "Transactions",
  initialState,
  reducers: {
    makeTransactions: (state, action) => {
      state.value.push(action.payload);
    },

    editTransactions : (state, action) =>{
      const {index ,  data}  = action.payload;

      const getIndex = state.value.findIndex((newindex)=>{
        return newindex.id === index
      })
      console.log("get index", getIndex);
      const newArray = [...state.value]
      newArray[getIndex] = data
      console.log("new array", newArray);
      return{
        ...state,
        value : newArray
      }
       
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
