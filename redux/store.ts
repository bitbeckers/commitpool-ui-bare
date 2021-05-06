import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import commitmentReducer from "./commitment/commitmentSlice";
import stravaReducer from "./strava/stravaSlice";
import web3Reducer from "./web3/web3Slice";

const store = configureStore({
  reducer: {
    commitment: commitmentReducer,
    strava: stravaReducer,
    web3: web3Reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store;
