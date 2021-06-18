import { createSlice, Slice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

import { DateTime } from "luxon";

const initialState: Commitment =  {
  activityKey: "",
  distance: 0,
  unit: "mi",
  startDate: DateTime.now().toSeconds(),
  endDate: DateTime.now().toSeconds(),
  stake: 0,
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
} = commitmentSlice.actions;

export default commitmentSlice.reducer;
