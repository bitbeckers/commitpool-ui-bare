import { configureStore } from "@reduxjs/toolkit";
import commitmentReducer from "./commitment/commitmentSlice";
import stravaReducer from "./strava/stravaSlice";
import web3Reducer from "./web3/web3Slice";

export default configureStore({
  reducer: {
    commitment: commitmentReducer,
    strava: stravaReducer,
    web3: web3Reducer,
  },
});
