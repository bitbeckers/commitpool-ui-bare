import { combineReducers, Reducer } from 'redux';

import commitmentReducer from "./commitment/commitmentSlice";
import stravaReducer from "./strava/stravaSlice";
import web3Reducer from "./web3/web3Slice";

const rootReducer: Reducer = combineReducers({
    commitment: commitmentReducer,
    strava: stravaReducer,
    web3: web3Reducer,
  })

export default rootReducer;