import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: [],
};
const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    userRegister: (state, action) => {
      console.log("Register data of redux store", action.payload);
      //state.userData.push(action.payload);
      // always clone the state when you are adding the data in existing data or updating the state
      return { ...state, userData: [...state.userData, action.payload] };
    },
    userLoggedIn: (state, action) => {
      const findUser = state.userData.find((user) => {
        return user.email === action.payload.email;
      });

      if (findUser && findUser.password === action.payload.password) {
        console.log("the user is verified");
        state.isLoggedIn = true;
      } else {
        console.log("the user is not vereified");
        console.log("email is not valid please sign up");
      }
      console.log(
        "login data insde the redux",
        action.payload.email,
        "find user",
        findUser
      );
      //   console.log("number of users in state", state.userData);
    },
  },
});

export const { userRegister, userLoggedIn } = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
