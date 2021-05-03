import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: undefined,
  provider: undefined,
  wallet: undefined,
  isLoggedIn: false
};

export const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    updateProvider: (state, action) => {
      state.provider = action.payload;
    },
    updateAccount: (state, action) => {
      state.account = action.payload;
      state.isLoggedIn = true;
    },
    reset: () => initialState,
  },
});

export const { updateProvider, updateAccount, reset } = web3Slice.actions;

export default web3Slice.reducer;
