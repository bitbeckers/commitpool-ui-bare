import { createSlice, Slice } from "@reduxjs/toolkit";

import { DateTime } from "luxon";

const initialState: Commitment =  {
  activity: undefined,
  distance: 0,
  unit: "mi",
  startDate: DateTime.now().toSeconds(),
  endDate: DateTime.now().toSeconds(),
  stake: 0,
  progress: 0,
  complete: false,
  exists: false,
  activitySet: false,
  stakeSet: false,
 }

export const commitmentSlice: Slice = createSlice({
  name: "commitment",
  initialState,
  reducers: {
    updateActivity: (state: Commitment, action) => {
      state.activity = action.payload;
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
    updateActivitySet: (state: Commitment, action) => {
      state.activitySet = action.payload;
    },
    updateStakeSet: (state: Commitment, action) => {
      state.stakeSet = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateActivity,
  updateDistance,
  updateUnit,
  updateStartDate,
  updateEndDate,
  updateStake,
  updateActivitySet,
  updateStakeSet
} = commitmentSlice.actions;

export default commitmentSlice.reducer;
