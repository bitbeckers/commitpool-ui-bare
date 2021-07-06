import { createSlice, Slice } from "@reduxjs/toolkit";

import { DateTime } from "luxon";

const initialState = {
  commitment: {
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
  },
  activities: [],
};

export const commitpoolSlice: Slice = createSlice({
  name: "commitpool",
  initialState,
  reducers: {
    updateCommitment: (state, action) => {
      state.commitment = action.payload;
    },
    updateCommitmentActivity: (state, action) => {
      state.commitment.activity = action.payload;
    },
    updateCommitmentDistance: (state, action) => {
      state.commitment.distance = action.payload;
    },
    updateCommitmentUnit: (state, action) => {
      state.commitment.unit = action.payload;
    },
    updateCommitmentStartDate: (state, action) => {
      state.commitment.startDate = action.payload;
    },
    updateCommitmentEndDate: (state, action) => {
      state.commitment.endDate = action.payload;
    },
    updateCommitmentStake: (state, action) => {
      state.commitment.stake = action.payload;
    },
    updateCommitmentActivitySet: (state, action) => {
      state.commitment.activitySet = action.payload;
    },
    updateCommitmentStakeSet: (state, action) => {
      state.commitment.stakeSet = action.payload;
    },
    addActivity: (state, action) => {
      state.activities.push(action.payload)
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCommitment,
  updateCommitmentActivity,
  updateCommitmentDistance,
  updateCommitmentUnit,
  updateCommitmentStartDate,
  updateCommitmentEndDate,
  updateCommitmentStake,
  updateCommitmentActivitySet,
  updateCommitmentStakeSet,
  addActivity,
} = commitpoolSlice.actions;

export default commitpoolSlice.reducer;
