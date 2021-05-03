import { createSlice } from "@reduxjs/toolkit";

import { DateTime } from "luxon";

export const commitmentSlice = createSlice({
  name: "commitment",
  initialState: {
    activity: "",
    distance: "0",
    unit: "km",
    startDate: DateTime.now().toSeconds(),
    endDate: DateTime.now().toSeconds(),
    stake: 0,
  },
  reducers: {
    updateActivity: (state, action) => {
      state.activity = action.payload;
    },
    updateDistance: (state, action) => {
      state.distance = action.payload;
    },
    updateUnit: (state, action) => {
      state.unit = action.payload;
    },
    updateStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    updateEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    updateStake: (state, action) => {
      state.stake = action.payload;
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
  updateStake
} = commitmentSlice.actions;

export default commitmentSlice.reducer;
