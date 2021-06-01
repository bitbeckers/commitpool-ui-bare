import { createSlice, Slice } from "@reduxjs/toolkit";

import { DateTime } from "luxon";

const initialState: Commitment =  {
  activityKey: "",
  distance: 0,
  unit: "km",
  startDate: DateTime.now().toSeconds(),
  endDate: DateTime.now().toSeconds(),
  stake: 0,
  currency: "DAI",
  progress: 0,
  complete: false,
 }

export const commitmentSlice: Slice = createSlice({
  name: "commitment",
  initialState,
  reducers: {
    updateActivityKey: (state: Commitment, action) => {
      state.activityKey = action.payload;
    },
    updateDistance: (state: Commitment, action) => {
      state.distance = action.payload;
    },
    updateUnit: (state: Commitment, action) => {
      state.unit = action.payload;
    },
    updateStartDate: (state: Commitment, action) => {
      state.startDate = action.payload;
    },
    updateEndDate: (state: Commitment, action) => {
      state.endDate = action.payload;
    },
    updateStake: (state: Commitment, action) => {
      state.stake = action.payload;
    },
    updateCurrency: (state: Commitment, action) => {
      state.currency = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateActivityKey,
  updateDistance,
  updateUnit,
  updateStartDate,
  updateEndDate,
  updateStake,
  updateCurrency
} = commitmentSlice.actions;

export default commitmentSlice.reducer;
