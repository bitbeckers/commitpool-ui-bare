import { combineReducers, Reducer } from "redux";

import commitpoolReducer from "./commitpool/commitpoolSlice";
import stravaReducer from "./strava/stravaSlice";
import web3Reducer from "./web3/web3Slice";
import transactionReducer from "./transactions/transactionSlice";

const rootReducer: Reducer = combineReducers({
  commitpool: commitpoolReducer,
  strava: stravaReducer,
  web3: web3Reducer,
  transactions: transactionReducer,
});

export default rootReducer;
